import { Router } from 'express';
import validateDataObject from '../middleware/validateDataObject';
import {
  estimateCovid19Impact,
  getRequestLogs
} from '../controllers/estimator';


const router = Router();

router.post('/', validateDataObject, (request, response) => {
  try {
    const estimate = estimateCovid19Impact(request.body);
    response.json(estimate);
  } catch ({ message }) {
    response
      .status(500)
      .json({ message });
  }
});


router.get('/logs', getRequestLogs);


export default router;