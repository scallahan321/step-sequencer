import './App.css';
import React, { useState } from 'react';
import Pizzicato from 'pizzicato';
import snare from './sounds/snare.mp3';
import kick from './sounds/kick.mp3';
import hihat from './sounds/hihat.mp3';
import useInterval from './use_interval';
import Button from 'react-bootstrap/Button';

function Piz() {

    const snareDrum = new Pizzicato.Sound(snare)
    const kickDrum = new Pizzicato.Sound(kick)
    const hiHat = new Pizzicato.Sound(hihat)
    const rest = new Pizzicato.Sound({source: 'file', options:{path: hihat,volume:0}})
    const [delay, setDelay] = useState(250)
    const [isRunning, setIsRunning] = useState(false);
    const [count, setCount] = useState(0)
    const [snareSteps, setSnareSteps] = useState([false, false, false, false, false, false, false, false])
    const [kickSteps, setKickSteps] = useState([false, false, false, false, false, false, false, false])
    const [hatSteps, setHatSteps] = useState([false, false, false, false, false, false, false, false])
    

    useInterval(() => {

        const initial_group = new Pizzicato.Group([rest])
        const group = setGroup(count, initial_group)
        // group.addEffect(reverb)
        group.play()
        // Your custom logic here
        if (count===15) {
            setCount(0)
        }
        else {
            setCount(count+1)
        }

        
        // const placeholder = new Pizzicato.Group([rest])
        // const group = setGroup(count, placeholder)
        // // group.addEffect(reverb)
        // group.play()
        
    }, isRunning ? delay : null);


    function setGroup(step, initial_group) {
        const snare = snareSteps[step]
        const kick = kickSteps[step]
        const hat = hatSteps[step]
        const group = initial_group
        if (snare) {
            group.addSound(snareDrum)
        } 
        if (kick) {
            group.addSound(kickDrum)
        }
        if (hat) {
            group.addSound(hiHat)
        }
        return group
    }


    function handleSnareClick(e) {
        const step = e.target.value
        const snares = [...snareSteps]
        if (snares[step]) {
            snares[step] = false
            setSnareSteps(snares)
            
        }
        else {
            snares[step] = true
            setSnareSteps(snares)
        }
       
    }

    function handleKickClick(e) {
        const step = e.target.value
        const kicks = [...kickSteps]
        if (kicks[step]) {
            kicks[step] = false
            setKickSteps(kicks)
        }
        else {
            kicks[step] = true
            setKickSteps(kicks)
        }
    }

    function handleHatClick(e) {
        const step = e.target.value
        const hats = [...hatSteps]
        if (hats[step]) {
            hats[step] = false
            setHatSteps(hats)
        }
        else {
            hats[step] = true
            setHatSteps(hats)
        }
    }



    function handleDelayChange(e) {
        setDelay(Number(e.target.value));
    }

    function play() {
        setIsRunning(true)
    }

    function stop() {
        setIsRunning(false);
    }

    function clear() {
        setSnareSteps([false, false, false, false, false, false, false, false])
        setKickSteps([false, false, false, false, false, false, false, false])
        setHatSteps([false, false, false, false, false, false, false, false])
    }

    var reverb = new Pizzicato.Effects.Reverb({
        time: .7,
        decay: 0.6,
        reverse: false,
        mix: 0.6
    });

    

  return (
      <div>
      <div>
        <button onClick={play}>play</button>
        <button onClick={stop}>stop</button>
        <button onClick={clear}>clear</button>
      </div>
      <div id = "snare">
        <p style={{display:'block'}}>snare</p>
        <Button variant='primary' value= '0' onClick={ e => handleSnareClick(e)}> 1</Button>
        <Button variant='primary' value='1'  onClick={ e => handleSnareClick(e)}> 2 </Button>
        <Button variant='primary' value='2' onClick={ e => handleSnareClick(e)}> 3 </Button>
        <Button variant='primary' value='3' onClick={ e => handleSnareClick(e)}> 4 </Button>
        <Button variant='primary' value='4' onClick={ e => handleSnareClick(e)}> 5 </Button>
        <Button variant='primary' value= '5' onClick={ e => handleSnareClick(e)}> 6</Button>
        <Button variant='primary' value='6'  onClick={ e => handleSnareClick(e)}> 7 </Button>
        <Button variant='primary' value='7' onClick={ e => handleSnareClick(e)}> 8 </Button>
        <Button variant='primary' value='8' onClick={ e => handleSnareClick(e)}> 9 </Button>
        <Button variant='primary' value='9' onClick={ e => handleSnareClick(e)}> 10 </Button>
        <Button variant='primary' value= '10' onClick={ e => handleSnareClick(e)}> 11 </Button>
        <Button variant='primary' value='11'  onClick={ e => handleSnareClick(e)}> 12 </Button>
        <Button variant='primary' value='12' onClick={ e => handleSnareClick(e)}> 13 </Button>
        <Button variant='primary' value='13' onClick={ e => handleSnareClick(e)}> 14 </Button>
        <Button variant='primary' value='14' onClick={ e => handleSnareClick(e)}> 15 </Button>
        <Button variant='primary' value='15' onClick={ e => handleSnareClick(e)}> 16 </Button>
      </div>
      <div id = "kick">
        <p style={{display:'block'}}>kick</p>
        <Button variant='primary' value='0' onClick={ e => handleKickClick(e)}> 1 </Button>
        <Button variant='primary' value='1' onClick={ e => handleKickClick(e)}> 2 </Button>
        <Button variant='primary' value='2' onClick={ e => handleKickClick(e)}> 3 </Button>
        <Button variant='primary' value='3' onClick={ e => handleKickClick(e)}> 4 </Button>
        <Button variant='primary' value='4' onClick={ e => handleKickClick(e)}> 5 </Button>
        <Button variant='primary' value='5' onClick={ e => handleKickClick(e)}> 6 </Button>
        <Button variant='primary' value='6' onClick={ e => handleKickClick(e)}> 7 </Button>
        <Button variant='primary' value='7' onClick={ e => handleKickClick(e)}> 8 </Button>
        <Button variant='primary' value='8' onClick={ e => handleKickClick(e)}> 9 </Button>
        <Button variant='primary' value='9' onClick={ e => handleKickClick(e)}> 10 </Button>
        <Button variant='primary' value='10' onClick={ e => handleKickClick(e)}> 11 </Button>
        <Button variant='primary' value='11' onClick={ e => handleKickClick(e)}> 12 </Button>
        <Button variant='primary' value='12' onClick={ e => handleKickClick(e)}> 13 </Button>
        <Button variant='primary' value='13' onClick={ e => handleKickClick(e)}> 14 </Button>
        <Button variant='primary' value='14' onClick={ e => handleKickClick(e)}> 15 </Button>
        <Button variant='primary' value='15' onClick={ e => handleKickClick(e)}> 16 </Button>
      </div>
      <div>
        <p style={{display:'block'}}>hat</p>
        <Button variant='primary' value='0' onClick={ e => handleHatClick(e)}> 1 </Button>
        <Button variant='primary' value='1' onClick={ e => handleHatClick(e)}> 2 </Button>
        <Button variant='primary' value='2' onClick={ e => handleHatClick(e)}> 3 </Button>
        <Button variant='primary' value='3' onClick={ e => handleHatClick(e)}> 4 </Button>
        <Button variant='primary' value='4' onClick={ e => handleHatClick(e)}> 5 </Button>
        <Button variant='primary' value='5' onClick={ e => handleHatClick(e)}> 6 </Button>
        <Button variant='primary' value='6' onClick={ e => handleHatClick(e)}> 7 </Button>
        <Button variant='primary' value='7' onClick={ e => handleHatClick(e)}> 8 </Button>
        <Button variant='primary' value='8' onClick={ e => handleHatClick(e)}> 9 </Button>
        <Button variant='primary' value='9' onClick={ e => handleHatClick(e)}> 10 </Button>
        <Button variant='primary' value='10' onClick={ e => handleHatClick(e)}> 11 </Button>
        <Button variant='primary' value='11' onClick={ e => handleHatClick(e)}> 12 </Button>
        <Button variant='primary' value='12' onClick={ e => handleHatClick(e)}> 13 </Button>
        <Button variant='primary' value='13' onClick={ e => handleHatClick(e)}> 14 </Button>
        <Button variant='primary' value='14' onClick={ e => handleHatClick(e)}> 15 </Button>
        <Button variant='primary' value='15' onClick={ e => handleHatClick(e)}> 16 </Button>
      </div>
      </div>
  );
}

export default Piz