const logoutBtn = document.querySelector("#logOut");
const loggedInAgent = document.querySelector("#usuario");

logoutBtn.addEventListener("click", () => {
  agentLoggedOut();
});

if (
  window.location.href === "http://localhost:3000/auth.html" &&
  !sessionStorage.getItem("token")
) {
  location.replace("http://localhost:3000");
} else {
  const user = sessionStorage.getItem("email");
  loggedInAgent.innerHTML += `${user}`;
}

const validateToken = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const response = await axios.get(
    `http://localhost:3000/apiV1/admin?token=${token}`
  );
  if (!response.data.is_Active) {
    agentLoggedOut();
  } else {
    return response;
  }
};

const agentLoggedOut = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("email");
  location.replace("http://localhost:3000");
};

setInterval(() => {
  validateToken();
}, 130000);
validateToken();
