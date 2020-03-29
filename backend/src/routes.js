const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();
/**
 * Rota / Recurso
 * 
 * Métodos HTTP: 
 * GET: buscar uma informação do back-end
 * POST: criar uma informação no back-end
 * PUT: alterar uma informação no back-end
 * DELETE: deletar uma informação no back-end
 * 

    Tipos de parâmetros:
    Query Params: parâmetros nomeados enviados na rota após o "?" (filtros, paginação)
    Route Params: parâmetros utilizados para identificar recursos
    Request Body: corpo da requisição, utilizado para criar ou alterar recursos
 */

 /**
  * Driver: SELECT * FROM users
  * Query Builder: table('users').select('*').where()
  */
routes.post('/sessions', celebrate({
   [Segments.BODY]: Joi.object().keys({
      id: Joi.required(),
   }),
}), SessionController.create);

routes.get('/ongs', OngController.index);

/**
 * Query
 * Route
 * Body 
 */
routes.post('/ongs', celebrate({ //validação 
   [Segments.BODY]:Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
   })
}),OngController.create);

routes.get('/profile', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
   }).unknown(),
}),ProfileController.index);

routes.get('/incidents',celebrate({
   [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
   }),
}),IncidentController.index);

routes.post('/incidents', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
   }).unknown(),
   [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().min(5),
      description: Joi.string().required().min(10),
      value: Joi.number().required().positive(),
   }),
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
   [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
   }),
}),IncidentController.delete);

module.exports = routes;