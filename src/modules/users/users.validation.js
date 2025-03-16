import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[a-z A-Z]+$/)
    .required(),
  email: Joi.string()
    .email({ tlds: ["com", "org"], minDomainSegments: 2 })
    .required(),
  phone: Joi.string()
    .regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/)
    .required(),
  password: Joi.string().min(6).required(),
  cPassword: Joi.valid(Joi.ref("password")).required(),
}).unknown(false);

export const verifyEmailSchema = Joi.object({
  token: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: ["com", "org"], minDomainSegments: 2 })
    .required(),
  password: Joi.string().min(6).required(),
}).unknown(false);

export const getProfileSchema = Joi.object({
  token : Joi.string().required()
}).unknown(true)

export const updataProfileSchema = {
  headers : Joi.object({
    token : Joi.string().required()
  }).unknown(true),
  body : Joi.object({
    name : Joi.string().min(3).pattern(/^[a-z A-Z]+$/),
    phone : Joi.string().regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/),
  }).required().unknown(false).or('name', 'phone')
}
export const updatePasswordSchema = {
  headers : Joi.object({
    token : Joi.string().required()
  }).unknown(true),
  body : Joi.object({
    oldPassword : Joi.string().min(6),
    newPassword : Joi.string().min(6),
    cPassword : Joi.valid(Joi.ref('newPassword')).required()
  }).required().unknown(false)
}
export const freezeProfileSchema = Joi.object({
  token : Joi.string().required()
}).unknown(true)
export const shareProfileSchema = Joi.object({
  id : Joi.string().required()
})