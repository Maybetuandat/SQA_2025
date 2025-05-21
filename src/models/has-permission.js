const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class HasPermission extends Model {

        static associate(models) {
        }
    }
    HasPermission.init(
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Role_id: DataTypes.INTEGER,
            Permission_id: DataTypes.INTEGER
        },
        {
            // options
            sequelize,
            modelName: "HasPermission",
            tableName: "HasPermission",
            timestamps: false,
        }
    );

    HasPermission.removeAttribute("id");
    return HasPermission;
};
