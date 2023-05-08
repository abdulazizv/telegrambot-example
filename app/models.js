const ChatsModel = require("./models/Chats");
const Knex = require('knex')
const knex = Knex(require('../knexfile'))

const models = [
    ChatsModel
]

models.forEach(model => model.knex(knex))

module.exports = {
    ChatsModel
}