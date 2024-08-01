const usernameField = document.querySelector("#usernameField");
const usernameFeedBackArea = document.querySelector(".username_invalid_feedback");
const emailField = document.querySelector("#emailField");
const emailFeedBackArea = document.querySelector(".email_invalid_feedback");
const usernameSuccessOutput = document.querySelector(".usernameSuccessOutput");
const emailSuccessOutput = document.querySelector(".emailSuccessOutput");
const passwordField = document.querySelector("#passwordField");
const showPasswordToggle = document.querySelector(".showPasswordToggle");
const submitBtn = document.querySelector(".submit-btn");

let isUsernameValid = false;
let isEmailValid = false;

const handleToggleInput = (e) => {
  if (showPasswordToggle.textContent === "SHOW") {
    showPasswordToggle.textContent = "HIDE";
    passwordField.setAttribute("type", "text");
  } else {
    showPasswordToggle.textContent = "SHOW";
    passwordField.setAttribute("type", "password");
  }
};

const checkFormValidity = () => {
  if (isUsernameValid && isEmailValid) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
};

showPasswordToggle.addEventListener("click", handleToggleInput);

emailField.addEventListener("keyup", (e) => {
  const emailVal = e.target.value;
  emailSuccessOutput.textContent = `Checking ${emailVal}...`;

  emailField.classList.remove("is-invalid");
  emailFeedBackArea.style.display = "none";

  if (emailVal.length > 0) {
    fetch("/authentication/validate-email", {
      body: JSON.stringify({ email: emailVal }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        emailSuccessOutput.style.display = "none";
        if (data.email_error) {
          isEmailValid = false;
          emailField.classList.add("is-invalid");
          emailFeedBackArea.style.display = "block";
          emailFeedBackArea.innerHTML = `<p>${data.email_error}</p>`;
        } else {
          isEmailValid = true;
          emailField.classList.remove("is-invalid");
          emailFeedBackArea.style.display = "none";
        }
        checkFormValidity();
      });
  } else {
    isEmailValid = false;
    checkFormValidity();
  }
});

usernameField.addEventListener("keyup", (e) => {
  const usernameVal = e.target.value;
  usernameSuccessOutput.textContent = `Checking ${usernameVal}...`;

  usernameField.classList.remove("is-invalid");
  usernameFeedBackArea.style.display = "none";

  if (usernameVal.length > 0) {
    fetch("/authentication/validate-username", {
      body: JSON.stringify({ username: usernameVal }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        usernameSuccessOutput.style.display = "none";
        if (data.username_error) {
          isUsernameValid = false;
          usernameField.classList.add("is-invalid");
          usernameFeedBackArea.style.display = "block";
          usernameFeedBackArea.innerHTML = `<p>${data.username_error}</p>`;
        } else {
          isUsernameValid = true;
          usernameField.classList.remove("is-invalid");
          usernameFeedBackArea.style.display = "none";
        }
        checkFormValidity();
      });
  } else {
    isUsernameValid = false;
    checkFormValidity();
  }
});
