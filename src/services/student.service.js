const { raw } = require("mysql2");
const db = require("../models/index");
const { where, Op } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const getAllStudent = async () => {
  var data = { status: null, data: null };

  try {
    const students = await db.Student.findAll({
      raw: true,
    });
    if (students.length > 0) {
      data.status = 200;
      data.data = students;
    } else {
      data.status = 404;
    }
    return data;
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    data.status = 500;
    return data;
  }
};

const getStudentById = async (id) => {
  var data = { status: null, data: null };
  try {
    const students = await db.Student.findAll({
      raw: true,
      where: { MSV: id },
    });

    // console.log(students)
    if (students.length > 0) {
      data.status = 200;
      data.data = students;
    } else {
      data.status = 404;
    }
    return data;
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    data.status = 500;
    return data;
  }
};

const getStudentByEmail = async (email) => {
  var data = { status: null, data: null };
  try {
    const students = await db.Student.findAll({
      raw: true,
      where: { Email: email },
    });
    if (students.length > 0) {
      data.status = 200;
      data.data = students;
    } else {
      data.status = 404;
    }
    return data;
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    data.status = 500;
    return data;
  }
};
const updatePassword = async (email, newPassword) => {
  try {
    const result = await db.Student.update(
      { MatKhau: newPassword },
      { where: { Email: email } }
    );

    if (result[0] > 0) {
      // Nếu có ít nhất một hàng bị ảnh hưởng (được cập nhật)
      return { status: 200, message: "Cập nhật mật khẩu thành công." };
    } else {
      // Nếu không có hàng nào bị ảnh hưởng (không tìm thấy sinh viên)
      return { status: 404, message: "Không tìm thấy sinh viên." };
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật mật khẩu:", error);
    return { status: 500, message: "Đã xảy ra lỗi khi cập nhật mật khẩu." };
  }
};
const createNewStudent = async (student) => {
  try {
    studentData = await db.Student.findAll({
      where: { MSV: student.msv },
    });

    if (studentData.length > 0) {
      return -1;
    }
    let hashPassword = await bcrypt.hash(student.password, 10);
    await db.Student.create({
      MSV: student.msv,
      Ten: student.name,
      Lop: student.class,
      Email: student.email,
      TaiKhoan: student.msv,
      MatKhau: hashPassword,
      ThoiGian: new Date(),
    });

    return 1;
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    return 0;
  }
};

const deleteStudentById = async (data) => {
  // console.log(id)
  try {
    const result = await db.Student.destroy({
      where: {
        MSV: data.id,
      },
    });

    if (result > 0) {
      // If result is greater than 0, then a row was deleted
      return true;
    } else {
      // If result is 0, then no rows were deleted
      return false;
    }
  } catch (error) {
    console.log(error)
    return false;
  }
};

const updateStudentById = async (id, data) => {
  var student = await db.Student.findByPk(id);
  var existStudent = await db.Student.findByPk(data.msv);

  // //console.log(id)
  if (existStudent) {
    return -1;
  }
  try {
    student.Ten = data.name;
    student.Lop = data.class;
    student.Email = data.email;
    student.TaiKhoan = data.account;
    student.MatKhau = data.password;

    //console.log(student.MSV);
    student.save();
    //console.log(student.MSV);

    return 1;
  } catch (err) {
    //console.log(err);
    return 0;
  }
};

const updateStudentById2 = async (id, data) => {
  try {
    var student = await db.Student.findByPk(id);
    if (!student) {
      console.log("Student not found");
      return 0;
    }

    var existStudent = await db.Student.findByPk(data.MSV);
    if (existStudent) {
      console.log("Student with the same MSV already exists");
    }

    student.Ten = data.Ten;
    student.Lop = data.Lop;
    student.Email = data.Email;
    student.TaiKhoan = data.TaiKhoan;
    student.MatKhau = student.MatKhau
    await student.save();
    console.log("Student updated successfully");
    return 1;
  } catch (err) {
    console.error("Error updating student:", err);
    return 0;
  }
};

const getStudentCondition = async (condition, keyword) => {
  const data = { status: null, data: null };
  switch (condition) {
    case "id": {
      try {
        const students = await db.Student.findAll({
          raw: true,
          where: {
            MSV: {
              [Op.like]: `%${keyword}%`,
            },
          },
        });
        if (students.length > 0) {
          data.status = 200;
          data.data = students;
        } else {
          data.status = 404;
        }
        return data;
      } catch (e) {
        //console.log(e);
        data.status = 500;
        return data;
      }
      break;
    }
    case "name": {
      //console.log("name");
      try {
        const students = await db.Student.findAll({
          raw: true,
          where: {
            Ten: {
              [Op.like]: `%${keyword}%`,
            },
          },
        });
        if (students.length > 0) {
          data.status = 200;
          data.data = students;
          return data;
        } else {
          data.status = 404;
          return data;
        }
      } catch (e) {
        //console.log(e);
        data.status = 500;
        return data;
      }
    }
  }
};
const getStudentWithFindObject = async (find, pagination) => {
  const data = { status: null, data: null };
  //console.log(pagination.limit, pagination.offset);
  //console.log(find);
  try {
    const students = await db.Student.findAll({
      where: find,
      limit: pagination.limitedItem,
      offset: pagination.limitedItem * (pagination.currentPage - 1),
      raw: true,
    });
    if (students.length > 0) {
      data.status = 200;
      data.data = students;
    } else {
      data.status = 404;
    }
    return data;
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    data.status = 500;
    return data;
  }
};
const getCountStudentWithFindObject = async (find) => {
  const data = { status: null, data: null };
  try {
    const students = await db.Student.findAll({
      raw: true,
      where: find,
    });
    if (students.length > 0) {
      data.status = 200;
      data.data = students;
    } else {
      data.status = 404;
    }
    return data;
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    data.status = 500;
    return data;
  }
};

module.exports = {
  getAllStudent,
  getStudentById,
  createNewStudent,
  deleteStudentById,
  updateStudentById,
  updateStudentById2,
  getStudentCondition,
  getStudentWithFindObject,
  getCountStudentWithFindObject,
  getStudentByEmail,
  updatePassword,
};
