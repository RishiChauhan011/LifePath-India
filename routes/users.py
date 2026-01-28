from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException

from app.auth import get_current_user
from app.database import users_collection
from schemas.user import UserProfile
import smtplib, ssl
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)


@router.get("/profile")
async def get_profile(current_user: dict = Depends(get_current_user)):
    """Return the authenticated user's profile and basic info."""
    user = await users_collection.find_one({"_id": current_user["_id"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = user.get("profile")
    return {
        "id": str(user["_id"]),
        "email": user.get("email"),
        "full_name": user.get("full_name"),
        "profile": profile,
    }


@router.put("/profile")
async def update_profile(
    profile: UserProfile,
    current_user: dict = Depends(get_current_user)
):
    """Update the authenticated user's profile."""
    await users_collection.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"profile": profile.dict(), "updated_at": datetime.utcnow()}}
    )
    return {"message": "Profile updated successfully", "profile": profile.dict()}

@router.post("/send-suggestions")
async def send_suggestions_email(current_user: dict = Depends(get_current_user)):
    """
    Sends an email with suggestions using Gmail SMTP.
    Requires EMAIL_USER and EMAIL_PASSWORD in .env
    """
    sender_email = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASSWORD")
    receiver_email = current_user.get("email")

    if not sender_email or not password or "your_gmail_app_password" in password:
        print("❌ Email credentials incomplete. Check .env")
        return {"message": "Email configuration required", "email": receiver_email}

    # Create message container
    message = MIMEMultipart("alternative")
    message["Subject"] = "Your Parallel Life Optimization Plan 🚀"
    message["From"] = sender_email
    message["To"] = receiver_email

    # HTML Content
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-w-600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #2563eb;">Parallel Life Simulator Results</h2>
            <p>Hi {current_user.get("full_name", "Traveler")},</p>
            <p>We've successfully processed your latest simulation scenario. Here are your key optimization insights:</p>
            
            <ul style="background: #f8fafc; padding: 20px; border-radius: 8px;">
                <li><strong>Retirement Impact:</strong> Potential to retire 3 years earlier.</li>
                <li><strong>Net Worth:</strong> Projected increase of 12.5% by age 65.</li>
                <li><strong>Action Item:</strong> Consider reallocating your 401k surplus into tax-efficient index funds.</li>
            </ul>

            <p style="margin-top: 20px;">
                <a href="http://localhost:5173/dashboard" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    View Full Dashboard
                </a>
            </p>
            <p style="font-size: 12px; color: #888; margin-top: 30px;">
                This is an automated message from your Parallel Life Simulator.
            </p>
        </div>
      </body>
    </html>
    """

    part = MIMEText(html, "html")
    message.attach(part)

    # Send Email
    try:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message.as_string())
        
        print(f"✅ Email sent to {receiver_email} from {sender_email}")
        return {
            "message": "Email sent successfully",
            "email": receiver_email,
            "status": "sent"
        }
    except Exception as e:
        print(f"❌ Failed to send email: {e}")
        return {
            "message": "Failed to send email",
            "error": str(e)
        }
