module.exports = (req, res) => {
    res.render("index", {
        title: "Eastagram login",
        css: "login"
    })
}