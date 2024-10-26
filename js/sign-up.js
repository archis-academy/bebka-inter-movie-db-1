document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-section");
    const errorMessage = document.getElementById("error-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passwordConfirmation = document.getElementById("repeat-password").value;

        if (!name || !email || !password || !passwordConfirmation) {
            alert("Name, Email, Password fields cannot be empty!");
            return;
        }

        const newUserData = {
            name: name,
            email: email,
            password: password,
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        let valid = true;
        errorMessage.style.display = 'none';

        if (!emailRegex.test(email)) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = "Please enter a valid email.";
            valid = false;
        }

        if (!passwordRegex.test(password)) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = "Password must contain at least 8 characters, including uppercase, lowercase, and a number.";
            valid = false;
        }

        if (password !== passwordConfirmation) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Passwords do not match.";
            valid = false;
        }

        if (valid) {
            let users = JSON.parse(localStorage.getItem("users")) || [];

            const isEmailExist = users.some(user => user.email === newUserData.email);

            if (isEmailExist) {
                console.error("User already exists");
                alert("Please Change Your Email, E-mail Already Exists");
            } else {
                users.push(newUserData);
                localStorage.setItem("users", JSON.stringify(users));
                alert("Registration successful!");

                form.reset();

                window.location.href = "login.html";
            }
        }
    });

    const storedData = JSON.parse(localStorage.getItem("users")) || [];
    if (storedData.length > 0) {
        console.log("Users in Local Storage: ", storedData);
    } else {
        console.log("No registered users");
    }
});
