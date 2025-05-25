const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Test.hasMany(models.Question, { foreignKey: "MaBaiThi" });
      Test.hasMany(models.Result, { foreignKey: "MaBaiThi" });
    }
  }
  Test.init(
    {
      MaBaiThi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      TenBaithi: DataTypes.STRING,
      ThoiGianBatDau: DataTypes.STRING,
      ThoiGianThi: DataTypes.INTEGER,
      SoLuongCau: DataTypes.INTEGER,
      TheLoai: DataTypes.STRING,
      TrangThai: DataTypes.STRING,
      img_url: DataTypes.STRING,
    },
    {
      // options
      sequelize,
      modelName: "Test",
      tableName: "BaiThi",
      timestamps: false,
    }
  );
  Test.removeAttribute("id");

  return Test;
};
