
let startTime;
let running = false;
let interval;
const display = document.getElementById('display');
const laps = document.getElementById('laps');
let lapNumber = 1;

document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);

function start() {
    if (!running) {
        running = true;
        startTime = Date.now() - (startTime || 0);
        interval = setInterval(updateTime, 10);
        document.getElementById('start').textContent = 'Pause';
    } else {
        running = false;
        clearInterval(interval);
        document.getElementById('start').textContent = 'Resume';
    }
}

function stop() {
    if (running) {
        running = false;
        clearInterval(interval);
        document.getElementById('start').textContent = 'Resume';
    }
}

function reset() {
    if (running) {
        clearInterval(interval);
    }
    running = false;
    startTime = null;
    lapNumber = 1;
    display.textContent = '00.00:00.00';
    laps.innerHTML = '';
    document.getElementById('start').textContent = 'Start';
}

function lap() {
    if (running) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
        laps.appendChild(lapItem);
        lapNumber++;
    }
}

function updateTime() {
    const currentTime = Date.now() - startTime;
    display.textContent = formatTime(currentTime);
}

function formatTime(time) {
    const date = new Date(time);
	const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = Math.floor(time % 1000 / 10);
    return `${String(hours).padStart(2,0)}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}
