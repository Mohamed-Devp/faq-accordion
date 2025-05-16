const toggleButtons = document.querySelectorAll('.plus');
const card = document.querySelector('main');

let cur = -1;
let prev;

function toggle(button, show = true) {
    button.src = show
        ? './assets/images/icon-minus.svg'
        : './assets/images/icon-plus.svg';

    const faq = button.closest('.faq');
    const answer = faq.querySelector('.answer');
    answer.style.display = show ? 'block' : 'none';

    button.classList.toggle('plus', !show);
    button.classList.toggle('minus', show);
}

function onMouseDown(button) {
    const isToggled = button.classList.contains('minus');
    toggle(button, !isToggled);

    if (prev && prev != button) {
        toggle(prev, false);
    }

    prev = button;
}

function onKeyDown(event) {
    const step = event.key === 'ArrowUp' ? -1 : 1;
    cur = cur == -1 && step == -1
        ? 3
        : cur = Math.min(toggleButtons.length - 1, Math.max(0, cur + step));


    toggle(toggleButtons[cur], true);

    if (step == 1 && cur > 0) {
        toggle(toggleButtons[cur - 1], false);

    } else if (step == -1 && cur < 3) {
        toggle(toggleButtons[cur + 1], false);
    }
}

function onMount() {
    toggleButtons.forEach(button => {
        if (button instanceof HTMLElement) {
            button.addEventListener('click', () => onMouseDown(button));
        }
    });
}

document.addEventListener('DOMContentLoaded', onMount);
document.addEventListener('keydown', onKeyDown);