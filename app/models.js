const ChatsModel = require("./models/Chats");
const OrdersModel = require("./models/Orders");
const Knex = require('knex')
const knex = Knex(require('../knexfile'))

const models = [
    ChatsModel,
    OrdersModel
]

models.forEach(model => model.knex(knex))

module.exports = {
    ChatsModel,
    OrdersModel
}