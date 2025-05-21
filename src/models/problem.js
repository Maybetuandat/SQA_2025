const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Problem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // console.log(models.Test)

        }
    }
    Problem.init(
        {
            MaVanDe: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            TenVanDe: {
                type: DataTypes.STRING,
            },
            ThoiGianTao: DataTypes.DATE,
        },
        {
            // options
            sequelize,
            modelName: 'Problem',
            tableName: 'Problem',
            timestamps: false,

        },
    );

    Problem.removeAttribute('id');
    return Problem;
};