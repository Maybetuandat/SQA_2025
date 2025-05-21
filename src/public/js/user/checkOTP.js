document.querySelectorAll('.digit-group input').forEach(function (input) {
    input.setAttribute('maxlength', 1);
    input.addEventListener('keyup', function (e) {
        var parent = this.parentElement;

        if (e.keyCode === 8 || e.keyCode === 37) {
            var prev = parent.querySelector('input#' + this.getAttribute('data-previous'));

            if (prev) {
                prev.select();
            }
        } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
            var next = parent.querySelector('input#' + this.getAttribute('data-next'));

            if (next) {
                next.select();
            } else {
                if (parent.getAttribute('data-autosubmit')) {
                    parent.submit();
                }
            }
        }
    });
});
