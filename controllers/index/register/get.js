module.exports = (req, res) => {
    return res.render("index/register", {
        title: "Eastagram register",
        page: "register",
        includes: {
            external: ["css", "js"]
        }
    })
}