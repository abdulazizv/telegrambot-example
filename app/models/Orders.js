const { Model } = require("objection");

class Orders extends Model{

    static getTableName() {
        return "orders"
    }

    static saveOrder(name,price,user_id) {
        const order_date = new Date();
        return this.query()
            .insert({
                name:name,
                price:price,
                order_date: order_date,
                user_id:user_id,
            })
    }

    static getAllByChatId(chat_id) {
        return this.query()
            .select('*')
            .where('user_id',chat_id)
    }

    static getAllOrders() {
        return this.query()
            .select('*')
    }
}

module.exports = Orders;