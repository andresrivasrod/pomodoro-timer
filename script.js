document.addEventListener('DOMContentLoaded', function () {
    const parameters = document.getElementById('parameters');
    const workMinutesInput = document.getElementById('work-minutes');
    const restMinutesInput = document.getElementById('rest-minutes');
    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');
    const timeValue = document.getElementById('time');
    const progressBar = document.getElementById('progress-bar');
    resetButton.style.display = 'none';
   // const soundRest = document.getElementById('sound-rest');
  //  const soundWork = document.getElementById('sound-work');

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
        if (workMinutesInput.value <= 0 || restMinutesInput.value <= 0) {
            alert("Please enter a number greater than zero for the work and rest minutes.");
            return;
        }
        seconds = 0;
        minutes = 0;
        isWorking = true;
        intervalId = setInterval(startTimer, 1000);
        startTimer(); 
    });

    function startTimer() {
        parameters.style.display ='none';
        resetButton.style.display = 'initial';
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

            //if (isWorking) {
            //    soundWork.play();
            //} else {
              //  soundRest.play();
          //  }
         }

        let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
        let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
        let status = isWorking ? 'Work' : 'Rest';
        
        timeValue.innerHTML = `<span style="color: ${isWorking ? 'red' : 'green'}">${status} Time: ${minutesValue}:${secondsValue}</span>`;

        let progressPercentage = (minutes * 60 + seconds) / (totalMinutes * 60) * 98;
        progressBar.style.width = progressPercentage + '%';
        progressBar.style.backgroundColor = isWorking ? 'red' : 'green';
    }
});
