const { raw } = require("mysql2");
const db = require("../models/index");
const { where, Op } = require("sequelize");
const { default: Transaction } = require("sequelize/lib/transaction");

const getAllRole = async () => {
    var data = { status: null, data: null };
    try {
        const roles = await db.Role.findAll({ raw: true });
        if (roles.length > 0) {
            data.status = 200;
            data.data = roles;
        } else {
            data.status = 404;
        }
        return data;
    } catch (error) {
        //console.log(error);
        data.status = 500;
        return data;
    }
}

const getAllPermissions = async () => {
    var data = { status: null, data: null };
    try {
        const permissions = await db.Permission.findAll({ raw: true });
        if (permissions.length > 0) {
            data.status = 200;
            data.data = permissions;
        } else {
            data.status = 404;
        }
        return data;
    } catch (error) {
        data.status = 500;
        return data;
    }
}

const getHasPermission = async (role_id, permission_id) => {
    try {
        var status = await db.HasPermission.findAll({
            where: {
                Role_id: role_id,
                Permission_id: permission_id
            }
        });
        // //console.log(status)
        if (status.length > 0) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {

    }
}

const setPermission = async (role_id, permission_id) => {
    try {
        await db.HasPermission.create({
            Role_id: role_id,
            Permission_id: permission_id
        });
        return true;
    } catch (error) {
        return false;
    }
}

const deletePermission = async (role_id, permission_id) => {
    try {
        await db.HasPermission.destroy({
            where: {
                Role_id: role_id,
                Permission_id: permission_id
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

const getAllAdminList = async () => {
    var data = { status: null, data: null };
    try {
        const admins = await db.Admin.findAll({ raw: true });
        const roles = await db.Role.findAll({ raw: true });
        if (admins.length > 0) {
            data.status = 200;
            data.data = admins;
            for (var i = 0; i < data.data.length; i++) {
                for (var j = 0; j < roles.length; j++) {
                    if (data.data[i].Role_id == roles[j].Id) {
                        data.data[i].Role_name = roles[j].Name;
                    }
                }
            }

            // //console.log(data.data)

            return data
        } else {
            data.status = 404;
        }
        return data;
    } catch (error) {
        data.status = 500;
        return data;
    }

}

const updateAdminById = async (body) => {
    var { UserName, Pass, Role } = body;

    var Role_id = parseInt(Role);
    // var roles = await db.Role.findOne(
    //     { where: { Name: Role } },
    //     { raw: true });

    // if (roles) {
    //     Role_id = roles.Id;
    // }
    // else {
    //     return { status: 500, message: "error" };
    // }
    // //console.log(roles)
    try {
        const result = await db.Admin.update(
            {
                Pass: Pass,
                Role_id: Role_id
            },
            { where: { UserName: UserName } }
        );



        if (result[0] > 0) {
            return { status: 200, message: "ok" };
        } else {
            return { status: 404, message: "ok" };
        }


    } catch (error) {
        return { status: 500, message: "error" };
    }

}


const getAdminWithFindObject = async (find) => {
    const data = { status: null, data: null };
    try {
        const admins = await db.Admin.findAll({
            where: find,
            raw: true,
        });
        if (admins.length > 0) {

            data.status = 200;
            data.data = admins;

            const roles = await db.Role.findAll({ raw: true });
            for (var i = 0; i < data.data.length; i++) {
                for (var j = 0; j < roles.length; j++) {
                    if (data.data[i].Role_id == roles[j].Id) {
                        data.data[i].Role_name = roles[j].Name;
                    }
                }
            }
            return data

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

const getAdminById = async (id) => {
    var data = { status: null, data: null };
    try {
        const admins = await db.Admin.findOne({ where: { UserName: id } }, { raw: true });
        const roles = await db.Role.findAll({ raw: true });
        if (admins) {
            data.status = 200;
            data.data = admins;
            for (var j = 0; j < roles.length; j++) {
                if (data.data.Role_id == roles[j].Id) {
                    data.data.Role_name = roles[j].Name;
                }
            }
            return data
        } else {
            data.status = 404;
        }
        return data;
    } catch (error) {
        data.status = 500;
        return data;
    }

}

const checkPermission = async (permissionUrl, role) => {
    try {
        // //console.log(role)
        const permission = await db.Permission.findOne({
            where: {
                Url: permissionUrl
            }
        }, { raw: true })
        // //console.log(permission)
        const status = await db.HasPermission.findAll({
            where: {
                Role_id: role,
                Permission_id: permission.Id
            }
        });
        if (status.length > 0) {
            return { status: 200, message: "Ok" };
        } else {
            return { status: 404, message: "Not Found" };
        }
    } catch (error) {
        return { status: 500, message: "Error" };
    }
}

module.exports = {
    getAllRole,
    getAllPermissions,
    getHasPermission,
    setPermission,
    deletePermission,
    getAllAdminList,
    getAdminWithFindObject,
    updateAdminById,
    getAdminById,
    checkPermission,
}
