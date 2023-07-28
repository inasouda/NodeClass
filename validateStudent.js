const joi = require("joi");

const validateCreateSudent = (student) => {
  const schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    class: joi.string().required(),
  });
  return schema.validate(student);
};

const validateUpdateSudent = (student) => {
  const schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    class: joi.string().required(),
  });
  return schema.validate(student);
};
module.exports = { validateCreateSudent, validateUpdateSudent };
