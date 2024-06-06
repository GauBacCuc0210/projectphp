function getRemainingTime(endTime) {
    const now = new Date().getTime();
    return Math.max(0, endTime - now);
}

function updateCountdownDisplay(container, remainingTime) {
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);

    if (container.querySelector('[data-unit="days"]')) {
        container.querySelector('[data-unit="days"]').innerText = String(days).padStart(2, '0');
    }
    container.querySelector('[data-unit="hours"]').innerText = String(hours).padStart(2, '0');
    container.querySelector('[data-unit="minutes"]').innerText = String(minutes).padStart(2, '0');
    container.querySelector('[data-unit="seconds"]').innerText = String(seconds).padStart(2, '0');
}

function initializeCountdown(container, storageKey) {
    const initialDays = parseInt(container.querySelector('[data-unit="days"]')?.dataset.initialValue || 0, 10);
    const initialHours = parseInt(container.querySelector('[data-unit="hours"]').dataset.initialValue, 10);
    const initialMinutes = parseInt(container.querySelector('[data-unit="minutes"]').dataset.initialValue, 10);
    const initialSeconds = parseInt(container.querySelector('[data-unit="seconds"]').dataset.initialValue, 10);

    const countdownDuration = ((initialDays * 24 * 3600) + (initialHours * 3600) + (initialMinutes * 60) + initialSeconds) * 1000;
    let endTime = localStorage.getItem(storageKey);
    if (!endTime) {
        endTime = new Date().getTime() + countdownDuration;
        localStorage.setItem(storageKey, endTime);
    } else {
        endTime = parseInt(endTime, 10);
    }

    const interval = setInterval(() => {
        const remainingTime = getRemainingTime(endTime);
        updateCountdownDisplay(container, remainingTime);

        if (remainingTime <= 0) {
            clearInterval(interval);
            localStorage.removeItem(storageKey);
            alert('Countdown finished!');
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeCountdown(document.querySelector('.time-down-and-resgister .time-down'), 'endTime1');
    initializeCountdown(document.querySelector('.form-time-down'), 'endTime2');
});
