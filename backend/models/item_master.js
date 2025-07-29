import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ItemMaster extends Model {}

  ItemMaster.init(
    {
      item_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      item_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ItemMaster',
      tableName: 'item_master',
      timestamps: true,
    }
  );

  return ItemMaster;
};

