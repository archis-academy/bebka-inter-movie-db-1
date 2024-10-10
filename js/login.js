document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.form-section');
    const emailInput = document.getElementById('email-login');
    const passwordInput = document.getElementById('password-login');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginSuccess = document.getElementById('loginSuccess');
    const loginFailed = document.getElementById('loginFailed');
    const rememberCheckbox = document.getElementById('remember-login');
    const emailSuggestions = document.getElementById('email-suggestions');

    let initialEmail = "";
    let initialPassword = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    emailInput.addEventListener('input', function () {
        const inputValue = emailInput.value;
        emailSuggestions.innerHTML = '';
        emailSuggestions.style.display = 'none';

        if (inputValue) {
            const storedData = JSON.parse(localStorage.getItem('users')) || [];
            const filteredSuggestions = storedData.filter(user => user.email.startsWith(inputValue) && user.remember);

            if (filteredSuggestions.length > 0) {
                filteredSuggestions.forEach(user => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.textContent = user.email;
                    suggestionItem.onclick = function () {
                        emailInput.value = user.email;
                        passwordInput.value = user.password;
                        initialEmail = user.email;
                        initialPassword = user.password;
                        emailSuggestions.innerHTML = '';
                        emailSuggestions.style.display = 'none';
                    };
                    emailSuggestions.appendChild(suggestionItem);
                });
                emailSuggestions.style.display = 'block';
            }
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        loginSuccess.style.display = 'none';
        loginFailed.style.display = 'none';

        let valid = true;

        if (!emailRegex.test(emailInput.value)) {
            emailError.style.display = 'block';
            valid = false;
        }

        if (!passwordRegex.test(passwordInput.value)) {
            passwordError.style.display = 'block';
            valid = false;
        }

        if (valid) {
            let storedData = JSON.parse(localStorage.getItem('users')) || [];
            const foundUser = storedData.find(user => user.email === emailInput.value);

            if (foundUser) {
                if (emailInput.value !== foundUser.email) {
                    emailError.style.display = 'block';
                    valid = false;
                }

                if (passwordInput.value !== foundUser.password) {
                    passwordError.style.display = 'block';
                    valid = false;
                }

                if (valid) {
                    loginSuccess.style.display = 'block';
                    setTimeout(function() {
                        window.location.href = 'index.html';
                    }, 1000);
                    form.reset();
                } else {
                    loginFailed.style.display = 'block';
                }

                if (rememberCheckbox.checked) {
                    foundUser.remember = true;
                    localStorage.setItem('users', JSON.stringify(storedData));
                }
            } else {
                loginFailed.style.display = 'block';
            }
        }
    });
});





document.querySelector(".login-facebook").addEventListener("click", function () {
    window.location.href = "https://www.facebook.com/login";
});

document.querySelector(".login-twitter").addEventListener("click", function () {
    window.location.href = "https://twitter.com/login";
});

document.querySelector(".login-google").addEventListener("click", function () {
    window.location.href = "https://accounts.google.com/login";
});
