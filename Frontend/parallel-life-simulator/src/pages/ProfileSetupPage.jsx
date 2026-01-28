import MultiStepForm from '../components/profile/MultiStepForm';

const ProfileSetupPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 bg-app-bg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
           <div className="inline-block px-3 py-1 rounded-full bg-primary-blue/10 text-primary-blue text-xs font-semibold tracking-wider mb-4 border border-primary-blue/20">
             ONBOARDING
           </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Build Your Financial Profile
          </h1>
          <p className="text-text-secondary">
             Let's calibrate your baseline to generate accurate parallel scenarios.
          </p>
        </div>
        <MultiStepForm />
      </div>
    </div>
  );
};

export default ProfileSetupPage;
