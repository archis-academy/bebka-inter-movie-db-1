
//Melek/BE-20/Implement the FAQ section/JavaScript/Start 
const akordiyon = document.getElementsByClassName("content-box")

for (var i=0 ; i<akordiyon.length; i++) {
    akordiyon[i].addEventListener("click", function (){
        this.classList.toggle("active");
    });
}

//Melek/BE-20/Implement the FAQ section/JavaScript/End 

// Büşra - Header responsiveness - Hamburger menu control - START
$(document).ready(function(){
	$('#nav-icon1').click(function(){
    let nav_icon = $(this)
    if(nav_icon.hasClass('open')) {
      nav_icon.removeClass('left-400')
      nav_icon.removeClass('top--30')
      nav_icon.removeClass('open')

      $('.nav').css('display', 'flex')
      $('.mobile-header').css('display', 'none')
      $('.mobile-header').css('transition','2s ease-in-out')

    } else {
      nav_icon.addClass('left-400')
      nav_icon.addClass('top--30')
      nav_icon.addClass('open')

      $('.mobile-header').css('display', 'block')
    }
    
	});

  $(window).resize(function() {
    let width = $(window).width();
    if(width > 1270) {
      $('#nav-icon1').removeClass('left-400')
      $('#nav-icon1').removeClass('top--30')
      $('#nav-icon1').removeClass('open')

      $('.nav').css('display', 'flex')
      $('.mobile-header').css('display', 'none')
      $('.mobile-header').css('transition','2s ease-in-out')
    }
  });
});

// Büşra - Header responsiveness - Hamburger menu control - END