const errorMessage = document.getElementById("messageError");
const errorMensaje = document.getElementById("msjError");

const authenticateSession = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  if (!token) {
    let errorRequest = await axios.get("http://localhost:3000/apiV1/notFound");

    errorMensaje.innerHTML += `${errorRequest.data.error.message}`;
    errorMessage.innerHTML += `${errorRequest.data.message}`;
  }
};
authenticateSession();
