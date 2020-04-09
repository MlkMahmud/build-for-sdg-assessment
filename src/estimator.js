import {
  computeCurrentInfections,
  computeInfectionsByTime
} from './helpers';


const covid19ImpactEstimator = (data) => {
  const currentInfections = computeCurrentInfections(data);
  return computeInfectionsByTime(currentInfections);
};

export default covid19ImpactEstimator;
