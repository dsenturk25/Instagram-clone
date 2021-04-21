module.exports = (req, res) => {
    return res.render("index/index", {
        title: "Eastagram login",
        page: "login",
        includes: {
            external: ["css", "js"]
        }
    })
}