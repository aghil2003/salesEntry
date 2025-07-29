import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class HeaderTable extends Model {
    static associate(models) {
      // HeaderTable hasMany DetailTable
      HeaderTable.hasMany(models.DetailTable, {
        foreignKey: 'vr_no',
        sourceKey: 'vr_no'
      });
    }
  }

  HeaderTable.init(
    {
      vr_no: {
      type: DataTypes.STRING(10), // Previously: INTEGER
      allowNull: false,
      primaryKey: true, // If it's a unique identifier
      },
      vr_date: DataTypes.DATE,
      ac_name: DataTypes.STRING(200),
      ac_amt: DataTypes.DECIMAL(18, 2),
      status: DataTypes.STRING(1),
    },
    {
      sequelize,
      modelName: 'HeaderTable',
      tableName: 'header_table',
      timestamps: true,
    }
  );

  return HeaderTable;
};
