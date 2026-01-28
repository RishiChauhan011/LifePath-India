# Parallel Life Simulator (WealthSim Pro)

Analyze, simulate, and optimize your future life paths with AI-driven insights. This application allows users to project their wealth, career, and lifestyle based on current decisions and compare them against optimized scenarios.

## 🚀 Features

- **Interactive Dashboard**: Visualize net worth, monthly cash flow, and success probabilities.
- **Scenario Builder**: Customize input variables like savings, risk tolerance, and retirement age.
- **AI-Powered Insights**: Get "Smart Speaker" style voice suggestions and optimization tips.
- **Visual Comparisons**: Compare your current trajectory (Scenario A) vs. an optimized path (Scenario B).
- **Email Reports**: Receive detailed optimization plans directly to your inbox.
- **Voice Assistant**: Integrated voice commands for navigation and summaries.

## 🛠️ Technology Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Framer Motion (Animations)
- Recharts (Data Visualization)
- Lucide React (Icons)

**Backend:**
- FastAPI (Python)
- MongoDB (Database)
- Scikit-learn (ML Predictions)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- MongoDB (Local or Atlas)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Coding_Nerds_2026
```

### 2. Backend Setup
 Navigate to the root directory.
```bash
# Install Python dependencies
pip install -r requirements.txt

# Create .env file
# Copy the example below and update with your credentials
```

**`.env` Configuration:**
```env
MONGODB_URI=mongodb://localhost:27017/
DATABASE_NAME=parallel_life_db
SECRET_KEY=your_secret_key
ACCESS_TOKEN_EXPIRE_MINUTES=60
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

**Run the Backend Server:**
```bash
uvicorn main:app --reload
# Server runs at http://localhost:8000
```

### 3. Frontend Setup
Navigate to the frontend directory.
```bash
cd Frontend/parallel-life-simulator

# Install dependencies
npm install

# Run the Development Server
npm run dev
# App runs at http://localhost:5173
```

## 📧 Email Configuration
To enable email notifications:
1. Use a Gmail account.
2. Go to **Google Account > Security > App Passwords**.
3. Generate a new password and paste it into the `.env` file as `EMAIL_PASSWORD`.

## 🧪 Usage
1. **Register/Login**: Create an account to save your simulations.
2. **Build Scenario**: Adjust sliders for savings, risk, and timeline.
3. **Run Simulation**: View the detailed impact analysis.
4. **Apply Suggestions**: Click "Apply All Suggestions" to get an email report.

## 🤝 Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
