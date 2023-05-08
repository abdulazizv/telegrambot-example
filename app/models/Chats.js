const { Model } = require("objection");

class Chats extends Model {

    static get tableName () {
        return 'users'
    }

    static getById (chat_id) {
        return this.query()
            .findOne({chat_id})
    }
    
    static saveUser (user) {
        let name = user.first_name + ' ' + user.last_name ? user.last_name : 'no';
        name = name.trim();
        return this.query()
            .insert({
                chat_id:user.id,
                name,
                username:user.username,
                date: new Date()
            }) 
    }

    static updateUser (chat_id,name) {
        return this.query()
            .patch({
                name,
                username
            })
            .where('chat_id',chat_id)
            .catch(_ => _)
    }

    static savePhone(chat_id,phone) {
        return this.query()
            .where('chat_id',chat_id)
            .update({
                phone
            })
    }

}

module.exports = Chats;