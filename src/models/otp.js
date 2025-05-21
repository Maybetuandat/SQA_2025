const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Otp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Otp.init(
        {
            email: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            start_time: {
                type: DataTypes.DATE,

                allowNull: false
            },
            end_time: {
                type: DataTypes.DATE,
                allowNull: false
            },
            otp_code: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            // options
            sequelize,
            modelName: 'otp',
            tableName: 'otp',
            timestamps: false,

        },
    );
    Otp.removeAttribute('id');
    return Otp;
};