
const { Model } = require("objection");

class Products extends Model {
    static getTableName() {
        return "products"
    }

    static getAllProducts() {
        return this.query()
            .select('*')
    }

    static saveProduct(name,price) {
        return this.query()
            .insert({
                name:name,
                price:price
            })
    }

    static getProductByName(name) {
        return this.query()
            .findOne("name",name)
    }

    static getProductByPrice(price) {
        return this.query()
            .findOne("price",price)
    }
}

module.exports = Products;