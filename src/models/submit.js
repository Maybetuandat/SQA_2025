const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Submit extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // console.log(models.Test)

            Submit.belongsTo(models.Student, { foreignKey: 'MSV' });

        }
    }
    Submit.init(
        {
            MaSubmit: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            MSV: {
                type: DataTypes.STRING,
            },
            TenVanDe: DataTypes.STRING,
            TrangThai: DataTypes.STRING,
            Source: DataTypes.STRING
        },
        {
            // options
            sequelize,
            modelName: 'Submit',
            tableName: 'Submit',
            timestamps: false,

        },
    );

    Submit.removeAttribute('id');
    return Submit;
};