document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.form-section');
    const emailInput = document.getElementById('email-login');
    const passwordInput = document.getElementById('password-login');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginSuccess = document.getElementById('loginSuccess');
    const loginFailed = document.getElementById('loginFailed');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 8 karakter, büyük harf, küçük harf, sayı --> zorunlu kıl
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

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
            loginSuccess.style.display = 'block';
        } else {
            loginFailed.style.display = 'block';
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
