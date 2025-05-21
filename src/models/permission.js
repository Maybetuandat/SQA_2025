const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {

        static associate(models) {
        }
    }
    Permission.init(
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Name: DataTypes.STRING,
            Url: DataTypes.STRING
        },
        {
            // options
            sequelize,
            modelName: "Permission",
            tableName: "Permission",
            timestamps: false,
        }
    );

    Permission.removeAttribute("id");
    return Permission;
};
