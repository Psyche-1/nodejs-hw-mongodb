import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(req.params);

  if (!isValidObjectId(contactId)) {
    return next(createHttpError(400, `${contactId} not valid id`));
  }
  next();
};
