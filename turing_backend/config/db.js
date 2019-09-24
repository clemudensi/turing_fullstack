const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
const ProductModel = require('../lib/models/products/Products');
const DepartmentModel = require('../lib/models/department/Department');
const CategoryModel = require('../lib/models/category/Category');
const AttributeModel = require('../lib/models/attributes/Attributes');
const CustomerModel = require('../lib/models/customer/Customer');
const ProductCategoryModel = require('../lib/models/product_category/ProductCategory');
const AttributeValueModel = require('../lib/models/attribute_value/AttributeValue');
const ProductAttributeModel = require('../lib/models/product_attribute/ProductAttribute');
const ProductReviewModel = require('../lib/models/product_review/ProductReview');
const ReviewModel = require('../lib/models/review/Review');
const OrderModel = require('../lib/models/order/Order');
const ShoppingCartModel = require('../lib/models/shopping_cart/ShoppingCart');
const ShippingModel = require('../lib/models/shipping/Shipping');
const ShippingRegionModel = require('../lib/models/shipping_region/ShippingRegion');
const ProductRequestModel = require('../lib/models/product_request/ProductRequest');
const TaxModel = require('../lib/models/tax/Tax');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  dialectModule: mysql2,
  host: process.env.DB_HOST,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true,
    underscored: true
  },
  dialectOptions: { decimalNumbers: true }
});

/* Import models*/
const Product = ProductModel(sequelize, Sequelize);
const Department = DepartmentModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const Attribute = AttributeModel(sequelize, Sequelize);
const Customer = CustomerModel(sequelize, Sequelize);
const AttributeValue = AttributeValueModel(sequelize, Sequelize);
const ProductCategory = ProductCategoryModel(sequelize, Sequelize);
const ProductAttribute = ProductAttributeModel(sequelize, Sequelize);
const ProductReview = ProductReviewModel(sequelize, Sequelize);
const Review = ReviewModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
const ShoppingCart = ShoppingCartModel(sequelize, Sequelize);
const Shipping = ShippingModel(sequelize, Sequelize);
const ShippingRegion = ShippingRegionModel(sequelize, Sequelize);
const ProductRequest = ProductRequestModel(sequelize, Sequelize);
const Tax = TaxModel(sequelize, Sequelize);

const Models = {
  Product,
  Department,
  Attribute,
  Customer,
  Category,
  AttributeValue,
  ProductCategory,
  ProductAttribute,
  ProductRequest,
  Review,
  Order,
  ShoppingCart,
  Shipping,
  ShippingRegion,
  ProductReview,
  Tax
};
const connection = {};

/* Create associations between tables */
Product.belongsToMany(Category, {through: 'product_category', foreignKey: 'product_id'});
Product.belongsToMany(AttributeValue, {through: 'product_attribute', foreignKey: 'product_id'});
Category.belongsToMany(Product, { through: 'product_category', foreignKey: 'category_id' });
AttributeValue.belongsToMany(Product, {through: 'product_attribute', foreignKey: 'attribute_value_id'});


/* Create database connection*/
module.exports.connectToDatabase = async () => {
  if (connection.isConnected) {
    console.log('=> Using existing connection.');
    return Models
  }
  const syncDB = await sequelize.sync();
  setTimeout(() => (syncDB), 3600);
  await sequelize.authenticate();
  connection.isConnected = true;
  console.log('=> Created a new connection.');
  return Models
};

module.exports.sequelize = sequelize;