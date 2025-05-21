const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // //console.log(models.Test)


        }
    }
    Student.init(
        {
            MSV: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            Ten: DataTypes.STRING,
            Lop: DataTypes.STRING,
            Email: DataTypes.STRING,
            TaiKhoan: DataTypes.STRING,
            MatKhau: DataTypes.STRING,
            ThoiGian: DataTypes.DATE,

        },
        {
            // options
            sequelize,
            modelName: 'Student',
            tableName: 'SinhVien',
            timestamps: false,

        },
    );

    Student.removeAttribute('id');
    return Student;
};