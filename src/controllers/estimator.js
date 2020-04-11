import { readFile } from 'fs';
import { join } from 'path';
import covid19ImpactEstimator from '../estimator';


export const estimateCovid19Impact = (data) => (covid19ImpactEstimator(data));


export const getRequestLogs = (req, res) => {
  const logFile = join(__dirname, '../../requests.log');
  readFile(logFile, (error, data) => {
    if (error) {
      return res
        .status(500)
        .json({ message: error.message });
    }
    return res
      .type('text/plain')
      .send(data);
  });
};
