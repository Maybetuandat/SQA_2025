const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {

        static associate(models) {
        }
    }
    Message.init(
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Content: DataTypes.STRING,
            MSV: DataTypes.STRING,
            fromAdmin: DataTypes.BOOLEAN,
            timestamp: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },

        },
        {
            // options
            sequelize,
            modelName: "Message",
            tableName: "Message",
            timestamps: false,
        }
    );

    Message.removeAttribute("id");
    return Message;
};
