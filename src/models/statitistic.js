//tạo một model dành cho bảng có tên là thongke, với các trường dữ liệu như sau : idthongke, LuotXem, TaiKhoanMoi, BaiThiMoi, SoLanLamBaiTheoThang tất cả đều có kiểu dữ liệu là int, ThangNam sẽ có kiểu dữ liệu là datetime
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class thongke extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    thongke.init(
        {
            idthongke: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            LuotXem: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            TaiKhoanMoi: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            BaiThiMoi: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            SoLanLamBaiTheoThang: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ThangNam: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            // options
            sequelize,
            modelName: 'thongke',
            tableName: 'thongke',
            timestamps: false,

        },
    );
    thongke.removeAttribute('id');
    return thongke;
};