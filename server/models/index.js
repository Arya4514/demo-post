const dbConfig = require("../environments");
const Sequelize = require("sequelize");
console.log("dbConfig", dbConfig)
const sequelize = new Sequelize(dbConfig.DB.database, dbConfig.DB.username, dbConfig.DB.password, {
    host: dbConfig.DB.host,
    dialect: dbConfig.DB.dialect,
    logging: false
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.user = require("./user")(sequelize, Sequelize);
db.post = require("./post")(sequelize, Sequelize);

module.exports = db;