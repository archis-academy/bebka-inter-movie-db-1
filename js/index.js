// Büşra - Header responsiveness - Hamburger menu control - START
document.getElementById('hamburger').addEventListener('click', function() {
    let mobile_header = document.getElementById('mobile-header')
    let login_register_btns = document.querySelectorAll('.btn-main')
    let logo = document.querySelector('.logo')
    let settings_icon = document.querySelector('.ic-settings')

    mobile_header.style.display = 'block'
    this.style.visibility = 'hidden'
    logo.style.visibility = 'hidden'
    settings_icon.style.visibility = 'hidden'
    login_register_btns.forEach(function(login_register_btn){
      login_register_btn.style.visibility = 'hidden'
    })
  });
  
document.addEventListener('click', function(event) {
  let section = document.getElementById('mobile-header');
  let hamburger = document.getElementById('hamburger');
  let login_register_btns = document.querySelectorAll('.btn-main')
  let logo = document.querySelector('.logo')
  let settings_icon = document.querySelector('.ic-settings')
  
  if (!hamburger.contains(event.target) && !section.contains(event.target)) {
    let mobile_header = document.getElementById('mobile-header')
      mobile_header.style.display = 'none'
      hamburger.style.visibility = 'visible'

      
    login_register_btns.forEach(function(login_register_btn){
    login_register_btn.style.visibility = 'visible'
    })

      logo.style.visibility = 'visible'
      settings_icon.style.visibility = 'visible'
  }
});

// Büşra - Header responsiveness - Hamburger menu control - END