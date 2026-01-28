import Card from '../common/Card';

const ScenarioSummary = ({ title, income, probability, risk, isRecommended }) => {
  const riskColor = {
    Low: 'text-success bg-success/10',
    Medium: 'text-warning bg-warning/10',
    High: 'text-error bg-error/10'
  };

  return (
    <Card className={`relative ${isRecommended ? 'border-primary-blue ring-2 ring-primary-blue/20' : ''}`}>
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-blue text-white text-xs px-3 py-1 rounded-full font-medium">
          ⭐ Recommended
        </div>
      )}
      
      <h3 className="font-semibold text-lg mb-4 text-center">{title}</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-secondary-gray text-sm">5-Year Income</span>
          <span className="font-bold text-dark">{income}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-secondary-gray text-sm">Success Prob.</span>
          <span className="font-bold text-dark">{probability}%</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-secondary-gray text-sm">Risk Profile</span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${riskColor[risk]}`}>
            {risk}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ScenarioSummary;
