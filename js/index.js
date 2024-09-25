document.getElementById('hamburger').addEventListener('click', function() {
    let mobile_header = document.getElementById('mobile-header')
    mobile_header.style.display = 'block'
});
  
document.addEventListener('click', function(event) {
  var section = document.getElementById('mobile-header');
  var hamburger = document.getElementById('hamburger');

  if (!hamburger.contains(event.target) && !section.contains(event.target)) {
    let mobile_header = document.getElementById('mobile-header')
      mobile_header.style.display = 'none'
  }
});