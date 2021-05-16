const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
// sequelize looks for heroku's access path over jawsdb and if it fails then checks our own .env file
if (process.env.JAWSDB_URL) {
  //y5svr1t2r5xudqeq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com
  //process.env.JAWSDB_URL
  sequelize = new Sequelize(y5svr1t2r5xudqeq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
  
}

module.exports = sequelize;