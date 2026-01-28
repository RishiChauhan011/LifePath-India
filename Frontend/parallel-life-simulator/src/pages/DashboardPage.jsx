import Card from '../components/common/Card';
import { Plus } from 'lucide-react';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-64px)] p-8 bg-app-bg">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <Button onClick={() => navigate('/profile-setup')} className="flex items-center gap-2">
                        <Plus size={20} /> New Simulation
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="text-center py-12 flex flex-col items-center justify-center border-dashed border-2 border-slate-700 bg-transparent hover:border-primary-blue/50 hover:bg-card-bg/50 cursor-pointer transition-all"
                         onClick={() => navigate('/profile-setup')}
                    >
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
                            <Plus size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Create New Scenario</h3>
                        <p className="text-text-secondary">Start a new parallel life simulation</p>
                    </Card>

                    {/* Example Past Simulation */}
                    <Card className="hover:border-primary-blue transition-colors cursor-pointer" onClick={() => navigate('/results/Sim-Example')}>
                         <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-white text-lg">Retirement 2050</h3>
                            <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-xs font-bold">COMPLETED</span>
                         </div>
                         <div className="text-3xl font-bold text-white mb-2">₹3.2M</div>
                         <p className="text-sm text-text-secondary mb-6">Net Worth Projection</p>
                         <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                             <div className="h-full w-[80%] bg-primary-green" />
                         </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
