const { celebrate, Joi, Segments } = require("celebrate");

const signupValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const signinValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const createCardValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().max(120).required(),
    mime: Joi.string().valid("image/jpeg", "application/pdf").required(),
    dataUrl: Joi.string().required(),
  }),
});

const idParamValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  signupValidator,
  signinValidator,
  createCardValidator,
  idParamValidator,
};
