module.exports = (req, res) => {
    res.render("404", {
        title: "Eastagram 404",
        css: "404"
    })
}