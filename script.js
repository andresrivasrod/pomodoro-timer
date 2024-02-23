document.addEventListener('DOMContentLoaded', function () {
    const workMinutesInput = document.getElementById('work-minutes');
    const restMinutesInput = document.getElementById('rest-minutes');
    const startButton = document.getElementById('start');
    const timeValue = document.getElementById('time');
    const resetButton = document.getElementById('reste');

    let seconds = 0;
    let minutes = 0;
    let isWorking = true;
    let intervalId;

    resetButton.addEventListener('click', function(){
        window.location.href = 'index.html';
    });

    startButton.addEventListener('click', function(event){
        event.preventDefault(); 
        if (intervalId) {
            clearInterval(intervalId);
        }
        seconds = 0;
        minutes = 0;
        isWorking = true;
        intervalId = setInterval(startTimer, 1000);
        startTimer(); 
    });

    function startTimer() {
        let totalMinutes = isWorking ? parseInt(workMinutesInput.value) : parseInt(restMinutesInput.value);

        seconds += 1;
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        if (minutes >= totalMinutes){
            minutes = 0;
            seconds = 0;
            isWorking = !isWorking;
        }

        let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
        let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
        let status = isWorking ? 'Work' : 'Rest';
        
        timeValue.innerHTML = `<span>${status} Time:</span> ${minutesValue}:${secondsValue}`;
    }
});
