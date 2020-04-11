import { Router } from 'express';
import validateDataObject from '../middleware/validateDataObject';
import {
  estimateCovid19Impact,
  getRequestLogs
} from '../controllers/estimator';


const router = Router();

router.post('/', validateDataObject, estimateCovid19Impact);


router.get('/logs', getRequestLogs);


export default router;
