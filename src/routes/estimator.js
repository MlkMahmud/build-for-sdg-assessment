import { Router } from 'express';
import validateDataObject from '../middleware/validateDataObject';
import {
  estimateCovid19Impact,
  getRequestLogs
} from '../controllers/estimator';


const router = Router();


router.get('/logs', getRequestLogs);


router.post('/:format?', validateDataObject, estimateCovid19Impact);


export default router;
