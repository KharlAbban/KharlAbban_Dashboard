function handleRegisterErrors(err) {
  // Create errors obj to return
  let errorsFound = {
    fullname: "",
    email: "",
    password: "",
  };

  // Handle duplicate email error
  if (err.code === 11000) {
    errorsFound.email = "Email already registered to a user!";
    return errorsFound;
  }

  //See if error var includes user alidation failed
  //Object.values(object) takes an object and returns an array w/ values of the different keys inside
  //cycle thru array to retrieve the values needed
  //Destructure error to get properties
  if (err._message.includes("USER validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      // Set values of items in errorsfound object
      errorsFound[properties.path] = properties.message;
    });
  }
  // Return errorsFound
  return errorsFound;
}

function handleLoginErrors(err) {
  // Create errors obj to return
  let errorsFound = {
    email: "",
    password: "",
  };

  // Set Error Values
  if (err.message === "Incorrect Email Address!") {
    errorsFound.email = "Incorrect Email Address!";
  }
  if (err.message === "Incorrect Password!") {
    errorsFound.email = "Incorrect Password!";
  }
  // Return errorsFound
  return errorsFound;
}

module.exports = {
    handleRegisterErrors,
    handleLoginErrors
}