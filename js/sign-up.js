document.querySelector(".form-section").addEventListener("submit",
    function(event){
        event.preventDefault();


        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passwordConfirmation = document.getElementById("repeat-password").value;
        const errorMessage = document.getElementById("error-message");

        if (!name || !email || !password || !passwordConfirmation) {
            alert("Name, Email, Password fields cannot be empty!");
            return;  
        }

        const newUserData = {
            name: name,
            email: email,
            password: password,
        }
        
        if(password !== passwordConfirmation){
            errorMessage.textContent = "Password do not match";
            errorMessage.style.display = "block";
            return;
        }else if(password === passwordConfirmation){
            errorMessage.style.display = "none";
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
        }
    }
)

const storedData = JSON.parse(localStorage.getItem("users") || []);


if(storedData.length > 0){ 
    console.log("Local Storage'daki kullanıcılar: ", storedData);
}else{
    console.log("Kayıtlı kullanıcı yok");
}




