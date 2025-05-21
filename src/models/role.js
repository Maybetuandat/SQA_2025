const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {

        static associate(models) {
        }
    }
    Role.init(
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Name: DataTypes.STRING
        },
        {
            // options
            sequelize,
            modelName: "Role",
            tableName: "Role",
            timestamps: false,
        }
    );

    Role.removeAttribute("id");
    return Role;
};
