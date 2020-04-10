import { validateDataObject } from '../helpers';


const validator = (req, res, next) => {
  const { valid, error } = validateDataObject(req.body);
  if (valid) {
    next();
  } else {
    res.status(400).json({ message: error });
  }
};


export default validator;
