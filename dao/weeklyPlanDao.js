const weeklyPlans = []; // jednoduchá simulace databáze

exports.create = (weeklyPlan) => {
  weeklyPlans.push(weeklyPlan);
};

exports.getAll = () => {
  return weeklyPlans;
};

exports.getById = (id) => {
  return weeklyPlans.find(plan => plan.id === id);
};

exports.update = (updatedPlan) => {
  const index = weeklyPlans.findIndex(plan => plan.id === updatedPlan.id);
  if (index !== -1) {
    weeklyPlans[index] = updatedPlan;
  }
};

exports.delete = (id) => {
  const index = weeklyPlans.findIndex(plan => plan.id === id);
  if (index !== -1) {
    weeklyPlans.splice(index, 1);
  }
};
