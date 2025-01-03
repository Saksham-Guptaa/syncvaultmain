export const calculateProgressPercentage = (
    budget: number,
    remainingBudget: number
  ) => {
    if (budget === 0) return 0;
    return ((budget - remainingBudget) / budget) * 100;
  };
  