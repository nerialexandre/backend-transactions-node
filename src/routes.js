const { Router } = require('express')
const controller = require('./app/controllers/transactionsController')()

const routes = new Router()

// routes controller
routes.route('/transactions')
  .get(controller.getAll)
  .post(controller.create)

routes.route('/transactions/:id')
  .get(controller.getOne)

module.exports = routes
