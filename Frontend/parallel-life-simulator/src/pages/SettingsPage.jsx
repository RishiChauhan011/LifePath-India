import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Save } from 'lucide-react';

const SettingsPage = () => {
    return (
        <div className="min-h-screen bg-app-bg p-8 flex justify-center">
            <div className="w-full max-w-2xl space-y-8">
                <h1 className="text-3xl font-bold text-white">Platform Settings</h1>

                <Card className="bg-card-bg border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-700 pb-4">General Configuration</h3>
                    
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-white font-medium">Dark Mode</h4>
                                <p className="text-xs text-text-secondary">Use system theme preference</p>
                            </div>
                            <div className="w-12 h-6 bg-primary-blue rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 bottom-1 w-4 bg-white rounded-full" />
                            </div>
                        </div>

                         <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-white font-medium">Currency Display</h4>
                                <p className="text-xs text-text-secondary">Default currency for simulations</p>
                            </div>
                            <select className="bg-slate-800 border border-slate-600 text-white rounded px-3 py-1">
                                <option>USD ($)</option>
                                <option>EUR (€)</option>
                                <option>GBP (£)</option>
                            </select>
                        </div>
                    </div>
                </Card>

                 <Card className="bg-card-bg border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-700 pb-4">API Configurations</h3>
                     <div className="space-y-4">
                        <Input label="Market Data API Key" type="password" value="************************" readOnly />
                        <Input label="Webhook URL" placeholder="https://..." />
                        <Button className="flex items-center gap-2 w-full justify-center mt-4">
                            <Save size={16} /> Save Changes
                        </Button>
                     </div>
                 </Card>
            </div>
        </div>
    );
};

export default SettingsPage;
