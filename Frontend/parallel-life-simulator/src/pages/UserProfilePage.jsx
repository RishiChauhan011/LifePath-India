import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { User, Shield, Key } from 'lucide-react';

const UserProfilePage = () => {
    return (
        <div className="min-h-screen bg-app-bg p-8">
             <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* Sidebar */}
                 <div className="space-y-6">
                    <Card className="bg-card-bg border-slate-700 text-center p-8">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary-blue to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white shadow-glow">
                            JD
                        </div>
                        <h2 className="text-xl font-bold text-white">John Doe</h2>
                        <p className="text-sm text-text-secondary">Premium Member</p>
                    </Card>

                    <nav className="space-y-2">
                        <div className="p-3 bg-primary-blue/10 text-primary-blue rounded-lg text-sm font-medium flex items-center gap-3 cursor-pointer">
                            <User size={18} /> Account Details
                        </div>
                        <div className="p-3 text-text-secondary hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium flex items-center gap-3 cursor-pointer transition-colors">
                            <Shield size={18} /> Privacy & Security
                        </div>
                         <div className="p-3 text-text-secondary hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium flex items-center gap-3 cursor-pointer transition-colors">
                            <Key size={18} /> API Access
                        </div>
                    </nav>
                 </div>

                 {/* Main Content */}
                 <div className="md:col-span-2 space-y-6">
                     <Card className="bg-card-bg border-slate-700">
                         <h3 className="text-lg font-bold text-white mb-6">Personal Information</h3>
                         <div className="grid grid-cols-2 gap-4">
                             <Input label="First Name" defaultValue="John" />
                             <Input label="Last Name" defaultValue="Doe" />
                             <div className="col-span-2">
                                <Input label="Email Address" defaultValue="john.doe@example.com" />
                             </div>
                             <Input label="Phone" defaultValue="+1 (555) 123-4567" />
                             <Input label="Location" defaultValue="San Francisco, CA" />
                         </div>
                         <div className="mt-6 flex justify-end">
                             <Button onClick={() => alert("Profile functionality coming soon!")}>Update Profile</Button>
                         </div>
                     </Card>
                 </div>
             </div>
        </div>
    );
};

export default UserProfilePage;
