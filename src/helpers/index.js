import Schema from 'validate';


const WEEK_LENGTH = 7;
const MONTH_LENGTH = 30;


export const estimateCurrentInfections = (input) => {
  const { reportedCases } = input;

  return {
    data: input,
    impact: {
      currentlyInfected: reportedCases * 10
    },
    severeImpact: {
      currentlyInfected: reportedCases * 50
    }
  };
};


const convertDurationToDays = ({ periodType, timeToElapse } = {}) => {
  switch (periodType) {
    case 'days':
      return timeToElapse;
    case 'weeks':
      return timeToElapse * WEEK_LENGTH;
    case 'months':
      return timeToElapse * MONTH_LENGTH;
    default:
      throw new Error('periodType must be one of [days, weeks, months]');
  }
};


export const estimateInfectionsOverTime = ({ data, impact, severeImpact } = {}) => {
  const days = convertDurationToDays(data);
  const factor = 2 ** Math.trunc(days / 3);

  impact.infectionsByRequestedTime = impact.currentlyInfected * factor;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factor;

  return {
    data,
    impact,
    severeImpact
  };
};


export const estimateSevereCasesOverTime = ({ data, impact, severeImpact } = {}) => {
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;

  return {
    data,
    impact,
    severeImpact
  };
};


export const estimateAvailableHospitalBeds = ({ data, impact, severeImpact } = {}) => {
  const { totalHospitalBeds } = data;
  const availableBeds = totalHospitalBeds * 0.35;
  const key = 'hospitalBedsByRequestedTime';

  impact[key] = Math.trunc(availableBeds - impact.severeCasesByRequestedTime);
  severeImpact[key] = Math.trunc(availableBeds - severeImpact.severeCasesByRequestedTime);

  return {
    data,
    impact,
    severeImpact
  };
};


export const estimateCasesForICU = ({ data, impact, severeImpact } = {}) => {
  const key = 'casesForICUByRequestedTime';
  impact[key] = Math.trunc(impact.infectionsByRequestedTime * 0.05);
  severeImpact[key] = Math.trunc(severeImpact.infectionsByRequestedTime * 0.05);

  return {
    data,
    impact,
    severeImpact
  };
};


export const estimateCasesForVentilators = ({ data, impact, severeImpact }) => {
  const key = 'casesForVentilatorsByRequestedTime';
  impact[key] = Math.trunc(impact.infectionsByRequestedTime * 0.02);
  severeImpact[key] = Math.trunc(severeImpact.infectionsByRequestedTime * 0.02);

  return {
    data,
    impact,
    severeImpact
  };
};


const calculateLostIncomeOverTime = (income, population, duration, estimate) => {
  const { infectionsByRequestedTime } = estimate;
  const lostIncome = (infectionsByRequestedTime * income * population) / duration;
  return Math.trunc(lostIncome);
};


export const estimateDollarsInFlight = ({ data, impact, severeImpact } = {}) => {
  const key = 'dollarsInFlight';
  const days = convertDurationToDays(data);
  const {
    avgDailyIncomeInUSD: income,
    avgDailyIncomePopulation: population
  } = data.region;

  impact[key] = calculateLostIncomeOverTime(income, population, days, impact);
  severeImpact[key] = calculateLostIncomeOverTime(income, population, days, severeImpact);

  return {
    data,
    impact,
    severeImpact
  };
};


const dataSchema = new Schema({
  region: {
    name: { type: String, required: true },
    avgAge: { type: Number, required: true },
    avgDailyIncomeInUSD: { type: Number, required: true },
    avgDailyIncomePopulation: { type: Number, required: true }
  },

  periodType: {
    type: String,
    enum: ['days', 'weeks', 'months'],
    required: true
  },
  timeToElapse: { type: Number, required: true },
  reportedCases: { type: Number, required: true },
  population: { type: Number, required: true },
  totalHospitalBeds: { type: Number, required: true }
});


export const validateDataObject = (data) => {
  const [error] = dataSchema.validate(data);

  if (error) {
    return {
      valid: false,
      error: error.message
    };
  }

  return {
    valid: true,
    error: null
  };
};
