
const { Model } = require("objection");

class Products extends Model {
    static getTableName() {
        return "products"
    }

    static getAllProducts() {
        return this.query()
            .select('*')
    }

    static saveProduct()
}