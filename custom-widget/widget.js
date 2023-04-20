function widgetInit(rootElement, widthFr, heightFr, editMode, showLoading) {
  var timeInterval;

  loadFile('https://presentboard.app/assets/test.js');

  function loadFile(url) {
    if (!document.body.contains(rootElement)) {
      clearInterval(timeInterval);
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.addEventListener('load', function() {
      const date = window.updatedAt;
      const seconds = window.periodSeconds;
      const msPassedDifference = new Date().getTime() - new Date(date).getTime();
      // console.log('loaded', 'periodSeconds: ', periodSeconds, 'updatedAt: ', updatedAt, 'left s: ', msPassedDifference);
      clearInterval(timeInterval);
      timeInterval = startCountdown(Math.round((seconds*1000 - msPassedDifference)/1000));
    });
    document.head.appendChild(script);
    setTimeout(() => loadFile(url), 60*1000);
  }

  function startCountdown(seconds) {
    const countdownTimer = rootElement.querySelector(".dynamic");
    return setInterval(function() {
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds - (hours * 3600)) / 60);
      let remainingSeconds = seconds % 60;
      countdownTimer.innerHTML = (hours < 10 ? "0" : "") + hours + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + remainingSeconds).slice(-2);
      seconds --;
      if (seconds < 0) {
        clearInterval(timeInterval);
        countdownTimer.innerHTML = "00:00:00";
        rootElement.querySelector('.dynamic').classList.add("red");
        rootElement.querySelector('.dynamic').classList.add("blink");
      } else if (hours <= 0 && minutes < 10 && seconds % 60 === 0) {
        // console.log('red!', rootElement.querySelector('.dynamic'));
        rootElement.querySelector('.dynamic').classList.add("red");
      }
    }, 1000);
  }

}
