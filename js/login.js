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

    // Email input alanına yazı girildiğinde öneriler göster
    emailInput.addEventListener('input', function () {
        const inputValue = emailInput.value;
        emailSuggestions.innerHTML = ''; // Önceki önerileri temizle
        emailSuggestions.style.display = 'none';

        if (inputValue) {
            const storedData = JSON.parse(localStorage.getItem('users')) || [];
            const filteredSuggestions = storedData.filter(user => user.email.startsWith(inputValue));

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

    // Form submit edildiğinde hataları kontrol etme ve localStorage işlemleri
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        loginSuccess.style.display = 'none';
        loginFailed.style.display = 'none';

        let valid = true;

        // Email ve şifre regex kontrolleri
        if (!emailRegex.test(emailInput.value)) {
            emailError.style.display = 'block';
            valid = false;
        }

        if (!passwordRegex.test(passwordInput.value)) {
            passwordError.style.display = 'block';
            valid = false;
        }

        if (valid) {
            if (emailInput.value !== initialEmail) {
                emailError.style.display = 'block';
                valid = false;
                return;
            }

            if (passwordInput.value !== initialPassword) {
                passwordError.style.display = 'block';
                valid = false;
                return;
            }

            if (valid) {
                loginSuccess.style.display = 'block';

                // Eğer kullanıcı "Beni hatırla" işaretlediyse email ve şifreyi kaydet
                if (rememberCheckbox.checked) {
                    localStorage.setItem('email', emailInput.value);
                    localStorage.setItem('password', passwordInput.value);
                    localStorage.setItem('remember', true);
                } else {
                    // Beni hatırla işaretli değilse, localStorage'a kaydetme
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                    localStorage.removeItem('remember');
                }

                form.reset();
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
