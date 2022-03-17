import * as Joi from 'joi';

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(7),
}).strict();

export default schemaLogin;
