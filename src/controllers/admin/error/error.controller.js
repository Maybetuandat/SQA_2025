const errorRedirect = async (req, res) => {
    res.render("pageError/404.pug", {
        titlePage: "không có quyền admin"
    });
}

module.exports = {
    errorRedirect
}