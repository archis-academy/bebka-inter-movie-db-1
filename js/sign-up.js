document.querySelector(".form-section").addEventListener("submit",
    function(event){
        event.preventDefault();


        const name = document.querySelector("input[placeholder='Name']").value;
        const email = document.querySelector("input[placeholder='Email']").value;
        const password = document.querySelector("input[placeholder='Password*']").value;
        const passwordConfirmation = document.querySelector("input[placeholder='Repeat Password*']").value;
        const errorMessage = document.querySelector("#error-message");

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




