export interface ActionableStep {
  category: 'Problem/Solution Fit' | 'Audience' | 'MVP Features' | 'Monetization' | 'Distribution' | 'Validation' | 'Pivot Consideration';
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'Low' | 'Medium' | 'High';
}

export interface ImprovementPlan {
  summary: string;
  keyAreasForImprovement: string[];
  actionableSteps: ActionableStep[];
  potentialPivots: string[];
  estimatedScoreIncrease: string;
  warning?: string;
}