
  const startBtn   = document.getElementById('startButton');
  const stopBtn    = document.getElementById('stopButton');
  const resetBtn   = document.getElementById('resetButton');
  const display    = document.getElementById('timerDisplay');
  const msDisplay  = document.getElementById('msDisplay');
  const progressBar= document.getElementById('progressBar');
  const statusDot  = document.getElementById('statusDot');
  const lapSection = document.getElementById('lapSection');

  let timerId = null;
  let ms = 0, s = 0, min = 0;
  let lapCount = 0;
  let lastLapTime = 0;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function updateDisplay() {
    display.textContent = `${pad(min)}:${pad(s)}`;
    msDisplay.textContent = `· ${pad(ms)} ms ·`;
    // progress bar: animates through seconds (0–60 cycle)
    progressBar.style.width = ((s % 60) / 59 * 100) + '%';
  }

  function tick() {
    ms++;
    if (ms === 100) { ms = 0; s++; }
    if (s === 60)   { s = 0; min++; }
    updateDisplay();
  }

  function setRunning(on) {
    display.classList.toggle('running', on);
    msDisplay.classList.toggle('running', on);
    statusDot.classList.toggle('running', on);
    startBtn.textContent = '';
    startBtn.innerHTML = on
      ? '<span class="btn-icon">▶</span>Running'
      : '<span class="btn-icon">▶</span>Start';
  }

  startBtn.addEventListener('click', () => {
    if (!timerId) {
      timerId = setInterval(tick, 10);
      setRunning(true);
    }
  });

  stopBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      setRunning(false);

      // Record lap
      const total = min * 6000 + s * 100 + ms;
      const lapTime = total - lastLapTime;
      lastLapTime = total;
      lapCount++;

      const lm = Math.floor(lapTime / 6000);
      const ls = Math.floor((lapTime % 6000) / 100);
      const lms = lapTime % 100;

      const item = document.createElement('div');
      item.className = 'lap-item';
      item.innerHTML = `<span class="lap-num">LAP ${pad(lapCount)}</span><span>${pad(lm)}:${pad(ls)}.${pad(lms)}</span>`;
      lapSection.prepend(item);
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    ms = s = min = lapCount = lastLapTime = 0;
    display.textContent = '00:00';
    msDisplay.textContent = '· 00 ms ·';
    progressBar.style.width = '0%';
    lapSection.innerHTML = '';
    setRunning(false);
  });
