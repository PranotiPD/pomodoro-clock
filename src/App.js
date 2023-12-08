import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState('SESSION');
  const [timeLeft, setTimeLeft] = useState(1500)

  const title = timingType === "SESSION" ? 'Session' : 'Break';

    
  const timeout = (setTimeout(() => {
      console.log('hello');
      if(timeLeft && play) {
        setTimeout(timeLeft - 1)
      }
    }, 1000))
  
  const handleBreakIncrease = () => {
    if(breakLength < 60 && !play){
      setBreakLength(breakLength + 1);
    }
  }

  const handleBreakDecrease = () => {
    if(breakLength > 1 && !play){
      setBreakLength(breakLength - 1);
    }
  }

  const handleSessionIncrease = () => {
    if(sessionLength < 60 && !play){
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1)*60)
    }
  }

  const handleSessionDecrease = () => {
    if(sessionLength > 1 && !play){
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1)*60)
    }
  }

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`
  }

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play)
  }

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "SESSION"){
      setTimeLeft(breakLength*60);
      setTimingType('BREAK');
      audio.play()
    } 
    if(!timeLeft && timingType === 'BREAK'){
      setTimeLeft(sessionLength*60);
      setTimingType('SESSION')
      audio.pause();
      audio.currentTime = 0;
    }
  }

  const clock = () => {
    if(play){
      setTimeout(() => {
        console.log('hello');
        if (timeLeft > 0 && play) {
          setTimeLeft((prevTime) => prevTime - 1);
        }
      }, 1000);
      resetTimer()
    }else {
      clearTimeout(timeout)
    }
  }
  

  const handleReset = () => {
    clearTimeout(timeout)
    setPlay(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25*60);
    setTimingType("SESSION")
  }

  useEffect(() => {
    clock()
  }, [play, timeLeft, timeout,title])

  return (
    <div className="App">
      <div className="wrapper">
      <h2>25 + 5 Clock</h2>
      <div className="break-session-length">
        <div>
          <h3 id="break-label">Break Length</h3>
          <div className="second-section">
            <button onClick={handleBreakIncrease} id="break-increment">Increase</button>
              <strong id="break-length">{breakLength}</strong>
            <button onClick={handleBreakDecrease} id="break-decrement">Decrease</button>
          </div>
         </div>
         <div>
           <h3 id="session-label">Session Length</h3>
           <div className="second-section">
            <button onClick={handleSessionIncrease} id="session-increment">Increase</button>
              <strong id="session-length">{sessionLength}</strong>
            <button onClick={handleSessionDecrease} id="session-decrement">Decrease</button>
          </div>
         </div>
      </div>
      <div className="timer-wrapper">
        <div className="timer">
           <h3 id="timer-label">{title}</h3>
           <h3 id="time-left">{timeFormatter()}</h3>
        </div>
        <button onClick={handlePlay} id="start_stop">Start/Stop</button>
        <button onClick={handleReset} id="reset">Reset</button>
      </div>
    </div>
    <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>
  );
}

export default App;
