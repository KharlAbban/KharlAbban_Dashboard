// const form = document.querySelector("form");
// const fullnameError = document.querySelector(".fullname.error");
// const emailError = document.querySelector(".email.error");
// const passwordError = document.querySelector(".password.error");

// form.addEventListener("submit", async (Event) => {
//     Event.preventDefault();

//     // Reset Error Divs
//     fullnameError.textContent = "";
//     emailError.textContent = "";
//     passwordError.textContent = "";

//     // Get input values
//     const fullname = form.fullname.value;
//     const email = form.email.value;
//     const password = form.password.value;
    
//     // Send form via POST fetch
//     try {
//         const res = await fetch("/register", {
//             method: "POST",
//             body: JSON.stringify({fullname, email, password}),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//         const data = await res.json();
//         // /Control Logging
//         console.log(data);
//         if (data.errorsFound) {
//             fullnameError.textContent = data.errorsFound.fullname;
//             emailError.textContent = data.errorsFound.email;
//             passwordError.textContent = data.errorsFound.password;
//         }
//         if (data.user) {
//             location.assign("/login");
//         }

//     } catch (err) {
//         console.log(err);
//     }
// });