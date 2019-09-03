const navLinks = document.querySelectorAll('span.nav_block:not(.selected');

navLinks.forEach(span => {
    span.addEventListener('click', function() {
        let target = this.innerText;
        if (target == 'Home') {
            target = 'index';
        }
        document.location.href = `./${target.toLowerCase()}.html`;
    });
});