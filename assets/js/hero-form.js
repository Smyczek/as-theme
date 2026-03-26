/**
 * Hero Form — redirects email to contact form
 */
function handleHeroForm(e) {
    e.preventDefault();
    var email = document.getElementById('heroEmail');
    var femail = document.getElementById('femail');
    if (email && femail) {
        femail.value = email.value;
    }
    var contact = document.querySelector('#contact');
    if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' });
        setTimeout(function () {
            var fname = document.getElementById('fname');
            if (fname) fname.focus();
        }, 600);
    }
    return false;
}
