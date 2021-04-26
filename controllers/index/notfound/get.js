module.exports = (req, res) => {
    return res.render("index/404", {
        title: "Eastagram 404",
        page: "404",
        includes: {
            external: ["css", "js"]
        }
    });
}