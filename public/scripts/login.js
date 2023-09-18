const colContainer = document.querySelector('.col-container');
const loginBtn = document.querySelector('.login-btn');
const eyeWrapper = document.querySelector("#eye-wrapper");
var transY = -100;
var state = false;

loginBtn.addEventListener('click', () => {
  document.body.classList.toggle('login');
  colContainer.style.transform = `translate(0, ${transY}vmin`;
  document.body.classList.contains("login") ? (transY = 0) : (transY = -100);
  document.body.classList.contains("login") ? (loginBtn.textContent = "<< Rewind") : (loginBtn.textContent = "LogIn >>");
});
eyeWrapper.addEventListener("click", toggle);

function toggle(){
  const width = document.querySelector("#useWidth").clientWidth;
  if(state){
      document.getElementById("password").setAttribute("type","password");
      document.getElementById("eye-wrapper").style.boxShadow = '0 0 0 0 #ffffff';
      document.getElementById("open").style.display = "none";
      document.getElementById("close").style.display = "block";
      document.getElementById("password").style.color = "white";

      state = false;
  }
  else{
      document.getElementById("password").setAttribute("type","text");
      document.getElementById("eye-wrapper").style.boxShadow = `0 0 0 ${width}px #ffffff`;
      document.getElementById("open").style.display = "block";
      document.getElementById("close").style.display = "none";
      document.getElementById("password").style.color = "black";

      state = true;
  }
}