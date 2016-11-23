function validate() {
  var login = document.getElementById("login"),
      password = document.getElementById("password"),
      error = document.getElementById("system-message");

  error.style.visibility = "hidden";

  if (!login.value) {
    error.firstElementChild.innerHTML = "Логин или пароль указаны неверно. Попробуйте еще раз.";
    error.style.visibility = "visible";
    return false;
  }

  if (!password.value) {
    error.firstElementChild.innerHTML = "Логин или пароль указаны неверно. Попробуйте еще раз.";
    error.style.visibility = "visible";
    return false;
  }

  return true;
}