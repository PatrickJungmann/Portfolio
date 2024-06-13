const btn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')

const linkInput = document.getElementById('link-input')
const linkForm = document.getElementById('link-form')
const errMsg = document.getElementById('err-msg')

btn.addEventListener('click', navToggle)
linkForm.addEventListener('submit', formSubmit)

// Toggle Mobile Menu
function navToggle() {
    btn.classList.toggle('open')
    menu.classList.toggle('flex')
    menu.classList.toggle('hidden')
}

// Validate a URL
function validURL(str) {
    var pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
        'i'
    )
    return !!pattern.test(str)
}

function formSubmit(event) {
    event.preventDefault();

    if (linkInput.value === '') {
        errMsg.innerHTML = 'Bitte Link einfügen';
        linkInput.classList.add('border', 'border-red-500');
    } else if (!validURL(linkInput.value)) {
        errMsg.innerHTML = 'Ungültiger Link';
        linkInput.classList.add('border', 'border-red-500');
    } else {
        errMsg.innerHTML = '';
        linkInput.classList.remove('border', 'border-red-500');
        alert('Hat funktioniert');
    }
}