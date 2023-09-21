function signOutUser (req, res) {
  res.cookie("jwt","", {maxAge: 1});
  res.redirect("/login");
}

module.exports = {
  signOutUser
}