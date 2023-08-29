const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.warehouse = require("./warehouse.model");
db.user = require("./user.model");
db.role = require("./role.model");
db.unit = require("./unit.model");
db.supplier = require("./supplier.model");
db.storageProduct = require("./storageProduct.model");
db.storage = require("./storage.model");
db.status = require("./status.model");
db.purchaseOrder = require("./purchaseOrder.model");
db.product = require("./product.model");
db.order = require("./order.model");
db.customer = require("./customer.model");
db.area = require("./area.model");



db.ROLES = ["user", "admin", "supplier"];

module.exports = db;
