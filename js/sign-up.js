document.querySelector(".form-section").addEventListener("submit",
    function(event){
        event.preventDefault();


        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const passwordConfirmation = document.getElementById("repeat-password").value.trim();
        const errorMessageMail = document.getElementById("error-message-mail");
        const errorMessagePassword = document.getElementById("error-message-password");


       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    
       function validateEmail(email) {
        return emailRegex.test(email);
      }

        function validatePassword(password) {
        return passwordRegex.test(password);
      }




        if (!name || !email || !password || !passwordConfirmation) {
            alert("Name, Email, Password fields cannot be empty!");
            return;  
        }

        const newUserData = {
            name: name,
            email: email,
            password: password,
        }

        if (!validateEmail(email) || !validatePassword(password)) {
            errorMessageMail.style.display = 'block';
            errorMessagePassword.style.display = 'block';
            errorMessagePassword.textContent = "Password must contain at least 8 characters, including uppercase, lowercase, and a number.";
            errorMessageMail.textContent = "Please enter a valid email.";
            return;
        } else {
            errorMessageMail.style.display = 'none';
            errorMessagePassword.style.display = 'none';
        }
        
        if(password !== passwordConfirmation){
            errorMessagePassword.textContent = "Password do not match";
            errorMessagePassword.style.display = "block";
            return;
        }else if(password === passwordConfirmation){
            errorMessagePassword.style.display = "none";
        }
    

        let users =  JSON.parse(localStorage.getItem("users")) || [];

        const isEmailExist = users.some(user => user.email === newUserData.email);
        const isUsernameExist = users.some(user => user.name === newUserData.name);

        if(isEmailExist){
            console.error("User already exists")
            alert("Please Change Your Email, E-mail Already Exists");
        } else if (isUsernameExist ){
            console.error("Username already exists")
            alert("Please Change Your Username, Username Already Exists");
        }else{
          users.push(newUserData);


          localStorage.setItem("users", JSON.stringify(users));

          window.location.href = "index.html";
        }
    }
)

const storedData = JSON.parse(localStorage.getItem("users") || []);


if(storedData.length > 0){ 
    console.log("Local Storage'daki kullanıcılar: ", storedData);
}else{
    console.log("Kayıtlı kullanıcı yok");
}




