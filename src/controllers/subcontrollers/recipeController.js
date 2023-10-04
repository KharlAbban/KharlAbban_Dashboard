function showHomepage(req, res) {
    res.render("subviews/recipeViews/recipeHomepage", {
        title: "KharlEats - Homepage",
        stylesheet: "/styles/recipeStyles/recipeHomepage.css"
    });
}

module.exports = {
    showHomepage
}