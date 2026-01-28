import Card from '../components/common/Card';
import { Bell, Info, AlertTriangle } from 'lucide-react';

const NotificationsPage = () => {
    return (
        <div className="min-h-screen bg-app-bg p-8 flex justify-center">
             <div className="w-full max-w-2xl">
                <div className="flex justify-between items-center mb-8">
                     <h1 className="text-3xl font-bold text-white">Notifications</h1>
                     <button className="text-sm text-primary-blue hover:text-white" onClick={() => alert("All notifications marked as read.")}>Mark all as read</button>
                </div>

                <div className="space-y-4">
                    <NotificationItem 
                        icon={Bell} 
                        color="text-primary-blue"
                        title="Simulation Complete" 
                        desc="Your 'Retirement 2050' scenario has finished processing."
                        time="2 mins ago"
                    />
                    <NotificationItem 
                        icon={AlertTriangle} 
                        color="text-warning"
                        title="Market Volatility Alert" 
                        desc="Projected inflation adjusted from 2.4% to 3.1% based on new data."
                        time="1 hour ago"
                    />
                     <NotificationItem 
                        icon={Info} 
                        color="text-text-secondary"
                        title="System Update" 
                        desc="WealthSim Pro v2.1 is now live with improved tax harvesting logic."
                        time="1 day ago"
                    />
                </div>
             </div>
        </div>
    );
};

const NotificationItem = ({ icon: Icon, color, title, desc, time }) => (
    <Card 
        className="bg-card-bg border-slate-700 p-4 flex gap-4 items-start hover:bg-slate-800/50 transition-colors cursor-pointer"
        onClick={() => alert(`Opened notification: ${title}`)}
    >
        <div className={`mt-1 p-2 rounded-lg bg-slate-800 ${color}`}>
            <Icon size={20} />
        </div>
        <div className="flex-1">
            <h4 className="text-white font-medium text-sm">{title}</h4>
            <p className="text-xs text-text-secondary mt-1">{desc}</p>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">{time}</span>
    </Card>
);

export default NotificationsPage;
