var logain = document.getElementById("logain");
var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");
var login = document.getElementById("login");
var error = document.getElementById("error");
var sign1 = document.getElementById("sign1");
var sign2 = document.getElementById("sign2");
var row1 = document.getElementById("row1");
var row2 = document.getElementById("row2");
var row3 = document.getElementById("row3");
var newName = document.getElementById("newName");
var newEmail = document.getElementById("newEmail");
var newPassword = document.getElementById("newPassword");
var welcome = document.getElementById("welcome");
var required = document.getElementById("required");
var logout = document.getElementById('logout')


var signUpArray = [];
if (localStorage.getItem("users") == null) {
  signUpArray = [];
} else {
  signUpArray = JSON.parse(localStorage.getItem("users"));
}

//for check inputs is empty or not
function isEmpty() {
  if (newName.value == "" || newEmail.value == "" || newPassword.value == "") {
    return false;
  } else {
    return true;
  }
}
// for check email is exist
function isEmailExist() {
  for (var i = 0; i < signUpArray.length; i++) {
    if (signUpArray[i].email.toLowerCase() == newEmail.value.toLowerCase()) {
      return false;
    }
  }
}
// for empty inputs
function emptyInp() {
  newName.value = "";
  newEmail.value = "";
  newPassword.value = "";
}

// for signup
function signUp() {
  if (isEmpty() == false) {
    required.innerHTML = "all inputs is required";
  } else {
    // to store all value as object
    var signUp = {
      name: newName.value,
      email: newEmail.value,
      password: newPassword.value,
    };
    if (isEmailExist() == false) {
      required.innerHTML = "email already exists";
    } else {
      signUpArray.push(signUp);
      localStorage.setItem("users", JSON.stringify(signUpArray));
      required.innerHTML = '<span class="text-success m-3">Success</span>';
    }
    emptyInp();
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////
var loginArr = [];
if (localStorage.getItem("login") != null) {
  loginArr = JSON.parse(localStorage.getItem("login"));
}
function loginSite() {
  if (validateEmail() && validatePass() == true) {
    var email = userEmail.value;
    var password = userPassword.value;
    
    for (var i = 0; i < signUpArray.length; i++) {
      if (
        signUpArray[i].email.toLowerCase() == email.toLowerCase() &&
        signUpArray[i].password.toLowerCase() == password.toLowerCase()
      ) {
        localStorage.setItem("sessionUsername", signUpArray[i].name);
        userEmail.classList.remove("is-valid");
        userPassword.classList.remove("is-valid");
        row1.classList.add("d-none");
        row3.classList.remove("d-none");
      } else {
        error.innerHTML =
        '<span class="p-2 text-danger">incorrect email or password</span>';
      }
      welcome.innerHTML = ` welcome ${signUpArray[i].name}`
    }
  }
  
}

login.addEventListener("click", function () {
  if (userEmail.value == "" || userPassword.value == "") {
    error.classList.replace("d-none", "d-block");
  }
  loginSite();
  empty();
});

function empty(){
  userEmail.value = '';
  userPassword.value = '';
}
/// for log Out
logout.addEventListener('click' , function(){
  console.log(welcome);
  row3.classList.add("d-none");
  row1.classList.remove("d-none");
  
})
function validateEmail() {
  var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/;
  if (regex.test(userEmail.value)) {
    userEmail.classList.add("is-valid");
    userEmail.classList.remove("is-invalid");
    return true;
  } else {
    userEmail.classList.add("is-invalid");
    userEmail.classList.remove("is-valid");
  }
}
function validatePass() {
  var regex = /\w{7,}/;
  if (regex.test(userPassword.value)) {
    userPassword.classList.add("is-valid");
    userPassword.classList.remove("is-invalid");
    return true;
  } else {
    userPassword.classList.add("is-invalid");
    userPassword.classList.remove("is-valid");
  }
}
userEmail.addEventListener("input", validateEmail);
userPassword.addEventListener("input", validatePass);

sign1.addEventListener("click", function () {
  row2.classList.replace("d-none", "d-block");
  row1.classList.add("d-none");
});
sign2.addEventListener("click", function () {
  row2.classList.replace("d-block", "d-none");
  row1.classList.remove("d-none");
});
