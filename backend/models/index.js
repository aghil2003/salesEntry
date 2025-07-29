import { Sequelize } from 'sequelize';
import HeaderTableModel from './header_table.js';
import DetailTableModel from './detail_table.js';
import ItemMasterModel from './item_master.js';
import dotenv from 'dotenv';
dotenv.config();
const DB=process.env.DB_NAME;
const DB_USER=process.env.DB_USER;
const DB_PASSWORD=process.env.DB_PASSWORD

const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

const db = {};

db.sequelize = sequelize;

db.HeaderTable = HeaderTableModel(sequelize, Sequelize.DataTypes);
db.DetailTable = DetailTableModel(sequelize, Sequelize.DataTypes);
db.ItemMaster = ItemMasterModel(sequelize, Sequelize.DataTypes);

// Apply associations if they exist
if (db.HeaderTable.associate) db.HeaderTable.associate(db);
if (db.DetailTable.associate) db.DetailTable.associate(db);
if (db.ItemMaster.associate) db.ItemMaster.associate(db);

//  Export each model correctly
export const HeaderTable = db.HeaderTable;
export const DetailTable = db.DetailTable;
export const ItemMaster = db.ItemMaster;
export const sequelizeInstance = sequelize; 
export default db;
