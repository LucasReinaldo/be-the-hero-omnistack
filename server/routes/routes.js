const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require('../controllers/OngController');
const IncidentController = require('../controllers/IncidentController');
const ProfileController = require('../controllers/ProfileController');
const SessionController = require('../controllers/SessionController');

const routes = Router();

// SESSION
routes.post('/session', SessionController.create);

// ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(12),
        city: Joi.string().required(),
        uf: Joi.string().required(),
    })
}), OngController.store);

// INCIDENTS
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.put('/incidents/update/:id', IncidentController.update);
routes.delete('/incidents/delete/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

// PROFILE / LIST ALL BY ID
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()})
        .unknown()
}), ProfileController.listAllById);

module.exports = routes;