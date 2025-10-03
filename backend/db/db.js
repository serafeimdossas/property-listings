const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false,
  define: { timestamps: false },
  pool: { max: 5, min: 0, idle: 10000 },
});

const Property = sequelize.define(
  "Property",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING(155), allowNull: false },
    type: {
      type: DataTypes.ENUM("Rent", "Buy", "Exchange", "Donation"),
      allowNull: false,
    },
    area_id: { type: DataTypes.STRING(255), allowNull: false },
    area: { type: DataTypes.STRING(255), allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    list_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { tableName: "property" }
);

module.exports = {
  sequelize,
  Property,
};
