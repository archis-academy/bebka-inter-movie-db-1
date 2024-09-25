
//Melek/BE-20/Implement the FAQ section/JavaScript/Start 
const akordiyon = document.getElementsByClassName("content-box")

for (var i=0 ; i<akordiyon.length; i++) {
    akordiyon[i].addEventListener("click", function (){
        this.classList.toggle("active");
    });
}

//Melek/BE-20/Implement the FAQ section/JavaScript/End 