import { readFile } from 'fs';
import { join } from 'path';
import xml from 'xml2js';
import covid19ImpactEstimator from '../estimator';


export const estimateCovid19Impact = (req, res) => {
  try {
    const { format } = req.params;
    const data = covid19ImpactEstimator(req.body);
    const builder = new xml.Builder({ headless: true });
    const xmlData = builder.buildObject(data);

    switch (format) {
      case undefined:
      case 'json':
        return res.json(data);
      case 'xml':
        return res
          .type('application/xml')
          .send(xmlData);
      default:
        return res
          .status(400)
          .json({ message: 'Invalid response format' });
    }
  } catch ({ message }) {
    return res
      .status(500)
      .json({ message });
  }
};


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
