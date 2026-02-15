// Study Planning and Timer System

// Constants for timer
const TIMER_INTERVAL = 1000; // Timer updates every second
const LOCK_MODE_KEY = 'lockMode';
const STUDY_DATA_KEY = 'studyData';

// DOM Elements
const timerDisplay = document.getElementById('timerDisplay');
const studyForm = document.getElementById('studyForm');
const studyInput = document.getElementById('studyInput');
const startButton = document.getElementById('startButton');
const lockButton = document.getElementById('lockButton');

let countdown;
let studyTime = 0;
let isLocked = false;

// Load data from localStorage
function loadStudyData() {
    const studyData = JSON.parse(localStorage.getItem(STUDY_DATA_KEY));
    if (studyData) {
        studySettingLoad(studyData);
    }
}

function studySettingLoad(data) {
    studyTime = data.studyTime;
    isLocked = data.isLocked;
    updateTimerDisplay();
}

// Save data to localStorage
function saveStudyData() {
    const studyData = { studyTime, isLocked };
    localStorage.setItem(STUDY_DATA_KEY, JSON.stringify(studyData));
}

// Countdown function
function startCountdown() {
    if (!isLocked) {
        countdown = setInterval(() => {
            if (studyTime > 0) {
                studyTime--;
                updateTimerDisplay();
            } else {
                clearInterval(countdown);
                alert('Time is up!');
            }
            saveStudyData();
        }, TIMER_INTERVAL);
    }
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(studyTime / 60);
    const seconds = studyTime % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Lock and unlock the timer
function toggleLockMode() {
    isLocked = !isLocked;
    lockButton.textContent = isLocked ? 'Unlock Timer' : 'Lock Timer';
    saveStudyData();
}

// Event listeners
studyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    studyTime = parseInt(studyInput.value);
    updateTimerDisplay();
    startCountdown();
});

lockButton.addEventListener('click', toggleLockMode);

// Initialize
loadStudyData();
