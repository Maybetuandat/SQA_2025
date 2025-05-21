const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class DetectionHistory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // //console.log(models.Test)
        }
    }
    DetectionHistory.init(
        {
            DetectionId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            SignId: DataTypes.STRING,
            Time: DataTypes.STRING,
            UserId: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "DetectionHistory",
            tableName: "DetectionHistory",
            timestamps: false,
        }
    );

    DetectionHistory.removeAttribute("id");
    return DetectionHistory;
};
