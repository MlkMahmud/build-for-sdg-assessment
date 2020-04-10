import {
  estimateCurrentInfections,
  estimateInfectionsOverTime,
  estimateSevereCasesOverTime,
  estimateAvailableHospitalBeds,
  estimateCasesForICU,
  estimateCasesForVentilators,
  estimateDollarsInFlight
} from './helpers';


const covid19ImpactEstimator = (data) => {
  const currentInfections = estimateCurrentInfections(data);
  const InfectionsOverTime = estimateInfectionsOverTime(currentInfections);
  const severeCases = estimateSevereCasesOverTime(InfectionsOverTime);
  const availableBeds = estimateAvailableHospitalBeds(severeCases);
  const casesForICU = estimateCasesForICU(availableBeds);
  const casesForVentilators = estimateCasesForVentilators(casesForICU);
  return estimateDollarsInFlight(casesForVentilators);
};

export default covid19ImpactEstimator;
