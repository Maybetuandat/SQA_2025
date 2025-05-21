const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // //console.log(models.Test)
      Detail.hasOne(models.Test, {
        foreignKey: "MaBaiThi",
        targetKey: "MaBaiThi",
      });
      Detail.hasOne(models.Result, {
        foreignKey: "MaKetQua",
        targetKey: "MaKetQua",
      });
      Detail.hasOne(models.Question, {
        foreignKey: "MaCauHoi",
        targetKey: "MaCauHoi",
      });
      Detail.hasOne(models.Option, {
        foreignKey: "MaLuaChon",
        targetKey: "MaLuaChon",
      });
    }
  }
  Detail.init(
    {
      MaChiTiet: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      MaKetQua: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      MaBaiThi: {
        type: DataTypes.STRING,
      },
      MaCauHoi: {
        type: DataTypes.STRING,
      },
      MaLuaChon: {
        type: DataTypes.STRING,
      },
      Dung: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      // options
      sequelize,
      modelName: "Detail",
      tableName: "KetQuaTungCau",
      timestamps: false,
    }
  );

  Detail.removeAttribute("id");
  return Detail;
};
