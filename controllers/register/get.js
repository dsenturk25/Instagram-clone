module.exports = (req, res) => {
    return res.render("register", {
        title: "Eastagram register",
        page: "register",
        includes: {
            external: ["css", "js"]
        }
    })
}