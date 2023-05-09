
const { Model } = require("objection");

class Products extends Model {
    static getTableName() {
        return "products"
    }
}