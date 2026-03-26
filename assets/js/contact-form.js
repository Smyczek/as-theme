/**
 * Contact Form — AJAX submission via WP REST API
 */
(function () {
    var form = document.getElementById('contactForm');
    if (!form || typeof as-themeContact === 'undefined') return;

    var submitBtn = form.querySelector('.form-submit');
    var originalText = submitBtn ? submitBtn.textContent : 'Send';

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Disable button
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        var data = {
            name: form.querySelector('[name="name"]').value,
            email: form.querySelector('[name="email"]').value,
            budget: form.querySelector('[name="budget"]') ? form.querySelector('[name="budget"]').value : '',
            message: form.querySelector('[name="message"]').value,
            website_url: form.querySelector('[name="website_url"]') ? form.querySelector('[name="website_url"]').value : '',
        };

        fetch(as-themeContact.restUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': as-themeContact.nonce,
            },
            body: JSON.stringify(data),
        })
        .then(function (response) {
            return response.json().then(function (json) {
                return { ok: response.ok, data: json };
            });
        })
        .then(function (result) {
            if (result.ok && result.data.success) {
                form.style.display = 'none';
                var success = document.getElementById('formSuccess');
                if (success) success.classList.add('show');
            } else {
                var msg = result.data.message || 'Something went wrong. Please try again.';
                alert(msg);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        })
        .catch(function () {
            alert('Network error. Please check your connection and try again.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    });
})();
