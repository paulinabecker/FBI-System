const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const logInButton = document.getElementById("logIn");
const restrictedRoute = document.getElementById("restringida");
const welcomeMessage = document.getElementById("bienvenida");
const errorMessage = document.getElementById("errorMsj");

logInButton.addEventListener("click", async () => {
  if (userEmail.value === "" || userPassword.value === "") {
    errorMessage.innerHTML += `<p>Ingresa un usuario y/o contraseña</p>`;
    setTimeout(() => {
      clearErrorMessage(errorMessage);
    }, 3000);
    return;
  }
  let { data } = await login(userEmail.value, userPassword.value);
  if (!data.is_Active) {
    location.replace("http://localhost:3000/error.html");
  } else {
    sessionStorage.setItem("token", JSON.stringify(data.token));
    sessionStorage.setItem("email", `${data.loggedUser.email}`);
    let logged = await getToken();
    welcomeMessage.innerHTML += `Bienvenido agente ${data.loggedUser.email}`;
  }
});

const login = async (email, password) => {
  const response = await axios.get(
    `http://localhost:3000/apiV1/SignIn?email=${email}&password=${password}`
  );
  return response;
};

const getToken = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const response = await axios.get(
    `http://localhost:3000/apiV1/Logged?token=${token}`
  );
  if (response.data.is_Active === true) {
    restrictedRoute.classList.remove("d-none");
    welcomeMessage.classList.remove("d-none");
  } else {
    return response.data.error;
  }
};

const clearErrorMessage = (htmlTag) => {
  while (htmlTag.firstChild) {
    htmlTag.removeChild(htmlTag.firstChild);
  }
};
