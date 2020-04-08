const WEEK_LENGTH = 7;
const MONTH_LENGTH = 30;


export const computeCurrentInfections = (input) => {
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


const convertDurationToDays = ({ data }) => {
  const { periodType, timeToElapse } = data;

  switch (periodType) {
    case 'days':
      return timeToElapse;
    case 'weeks':
      return timeToElapse * WEEK_LENGTH;
    case 'months':
      return timeToElapse * MONTH_LENGTH;
    default:
      return null;
  }
};


export const computeInfectionsByTime = (input) => {
  const days = convertDurationToDays(input);
  const { data, impact, severeImpact } = input;
  const factor = 2 ** Math.floor(days / 3);

  impact.infectionsByRequestedTime = impact.currentlyInfected * factor;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factor;

  return {
    data,
    impact,
    severeImpact
  };
};
