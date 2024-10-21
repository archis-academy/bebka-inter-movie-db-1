$(document).ready(function () {
    var darkMode = localStorage.getItem('darkMode');

    function applyDarkMode() {
        $('body').removeClass('dark-mode')
        $('#darkModeToggle').empty()
        $('#darkModeToggle').append(`<i class="fa-solid fa-moon fa-xl" style="color: #ffffff;"></i>`)
    }

    function removeDarkMode() {
        $('body').addClass('dark-mode')                 
        $('#darkModeToggle').empty()
        $('#darkModeToggle').append(`<i class="fa-solid fa-sun fa-xl" style="color: #ffffff;"></i>`)
    }

    if (darkMode === 'enabled') {
        applyDarkMode();
    } else {
        removeDarkMode();
    }

    $('#darkModeToggle').click(function() {
        var darkMode = localStorage.getItem('darkMode');
        if (darkMode !== 'enabled') {
            applyDarkMode();

        localStorage.setItem('darkMode', 'enabled');
        } else {
            removeDarkMode();
            localStorage.setItem('darkMode', 'disabled'); 
        }
    });
})