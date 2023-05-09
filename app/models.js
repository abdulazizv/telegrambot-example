const ChatsModel = require("./models/Chats");
const ProductsModel = require("./models/Products");
const Knex = require('knex')
const knex = Knex(require('../knexfile'))

const models = [
    ChatsModel,
    ProductsModel
    
]

models.forEach(model => model.knex(knex))

module.exports = {
    ChatsModel,
    ProductsModel
}