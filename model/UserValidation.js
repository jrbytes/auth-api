//Validation
const Joi = require('@hapi/joi')

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.base': `"Nome" deve ser texto.`,
        'string.min': `"Nome" deve conter no mínimo 6 caracteres.`,
        'any.required': `É necessário cadastrar um nome.`
      }),
    email: Joi.string()
      .required()
      .email()
      .messages({
        'string.base': `"E-mail" deve ser texto.`,
        'string.email': `Deve ser um e-mail válido.`,
        'any.required': `É necessário cadastrar um e-mail.`
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': `"Senha" deve conter no mínimo 6 caracteres.`,
        'any.required': `É necessário cadastrar uma senha.`
      })
  })
  return schema.validate(data)
}

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email()
      .messages({
        'string.email': `Deve ser um e-mail válido.`,
        'any.required': `É necessário ter um e-mail para logar.`
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': `"Senha" deve conter no mínimo 6 caracteres.`,
        'any.required': `É necessário a senha para autenticar.`
      })
  })
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation