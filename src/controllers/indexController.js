function showDashboard(req, res) {
  console.log(req.cookies);
  res.render("index");
}

module.exports = {
  showDashboard,
};