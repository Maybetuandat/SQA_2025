const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Option extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            Option.belongsTo(models.Question, { foreignKey: 'MaCauHoi', targetKey: 'MaCauHoi', as: 'LuaChon' });

        }
    }
    Option.init(
        {
            MaCauHoi: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            MaLuaChon: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            MaBaiThi: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            Dung: DataTypes.INTEGER,
            NoiDung: DataTypes.STRING,

        },
        {
            // options
            sequelize,
            modelName: 'Option',
            tableName: 'LuaChon',
            timestamps: false,

        },
    );
    Option.removeAttribute('id');
    return Option;
};