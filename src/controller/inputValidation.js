const Joi = require('joi');


function userValidatation(user) {
    return Joi.object({
        name: Joi.string().min(3).max(50),
        email: Joi.string().min(5).max(100).email(),
        posts: Joi.object()
    }).validate(user);
}

module.exports = {
    userValidatation
}