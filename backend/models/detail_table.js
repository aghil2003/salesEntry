'use strict';
import { Sequelize, Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DetailTable extends Model {
    static associate(models) {
      // You can define associations here later, e.g.:
      // DetailTable.belongsTo(models.HeaderTable, { foreignKey: 'vr_no' });
    }
  }

  DetailTable.init({
    vr_no: {
       type: DataTypes.STRING(10), // Must match the header_table type
  allowNull: false,
  references: {
    model: 'header_table',
    key: 'vr_no',
  }
},
    sr_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    item_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    item_name: {
      type: DataTypes.STRING(200),
    },
    description: {
      type: DataTypes.STRING(3000),
    },
    qty: {
      type: DataTypes.DECIMAL(18, 3),
    },
    rate: {
      type: DataTypes.DECIMAL(18, 2),
    }
  }, {
    sequelize,
    modelName: 'DetailTable', // ✅ Use PascalCase for modelName
    tableName: 'detail_table', // ✅ Optional: explicit table name in DB
    timestamps: true // ✅ Optional: disable createdAt/updatedAt
  });

  return DetailTable;
};
