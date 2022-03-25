import './App.css';
import React, { useState, useEffect } from 'react';
import Pizzicato from 'pizzicato';
import snare from './sounds/snare.mp3';
import kick from './sounds/kick.mp3';
import hihat from './sounds/hihat.mp3';
import BassSynth from './bass_synth';
import useInterval from './use_interval';
import Button from 'react-bootstrap/Button';
import { useHotkeys, isHotkeyPressed } from 'react-hotkeys-hook';

function Beat() {

    const snare1 = new Pizzicato.Sound(snare)
    const snare2 = new Pizzicato.Sound(snare)
    const snare3 = new Pizzicato.Sound(snare)
    const snare4 = new Pizzicato.Sound(snare)
    const kick1 = new Pizzicato.Sound(kick)
    const kick2 = new Pizzicato.Sound(kick)
    const kick3 = new Pizzicato.Sound(kick)
    const kick4 = new Pizzicato.Sound(kick)
    const hat1 = new Pizzicato.Sound(hihat)
    const hat2 = new Pizzicato.Sound(hihat)
    const hat3 = new Pizzicato.Sound(hihat)
    const hat4 = new Pizzicato.Sound(hihat)
    const [delay, setDelay] = useState(260)
    const [isRunning, setIsRunning] = useState(false);
    const [count, setCount] = useState(0)
    const [snareSteps, setSnareSteps] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const [kickSteps, setKickSteps] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const [hatSteps, setHatSteps] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const [boolArray, setBoolArray] = useState([])
    const [reverbOn, setReverbOn] = useState(false)

    const snareKick = new Pizzicato.Group([snare2, kick2])
    const snareHat = new Pizzicato.Group([snare3, hat2])
    const kickHat = new Pizzicato.Group([kick3, hat3])
    const snareKickHat = new Pizzicato.Group([snare4, kick4, hat4])


    // can clone sound objects with sound.clone();

    var flanger = new Pizzicato.Effects.Flanger({
        time: 0.45,
        speed: 0.2,
        depth: 0.2,
        feedback: 0.1,
        mix: 0.3
    });

    var quadrafuzz = new Pizzicato.Effects.Quadrafuzz({
        lowGain: 1,
        midLowGain: 1,
        midHighGain: 0.3,
        highGain: 0.3,
    });

    var dubDelay = new Pizzicato.Effects.DubDelay({
        feedback: 0.3,
        time: 0.7,
        mix: 0.3,
        cutoff: 700
    });

    var distortion = new Pizzicato.Effects.Distortion({
        gain: 0.2
    });

   
    useEffect(() => {
        var new_bool_array = []
        for (var i = 0; i <16; i++) {
            const step = [snareSteps[i], kickSteps[i], hatSteps[i]]
            new_bool_array.push(step.toString())
        }
        setBoolArray(new_bool_array)
    }, [snareSteps, kickSteps, hatSteps])
    
    const groups = new Map([
        // order of boolean array will be [snare, kick, hat]
        [[true, false, false].toString(), snare1],
        [[false, true, false].toString(), kick1],
        [[false, false, true].toString(), hat1],
        [[true, true, false].toString(), snareKick],
        [[true, false, true].toString(), snareHat],
        [[false, true, true].toString(), kickHat],
        [[true, true, true].toString(), snareKickHat]
      ]);
   

    function setButtonVariant(step) {
        var variant = step ? 'primary' : 'outline-primary';
        return variant
    }

    useInterval(() => {
        const current = boolArray[count]
        if (current!=="false,false,false") {
            const sound = groups.get(current)
            if (reverbOn) {
                sound.addEffect(reverb)
            }
            sound.play();
        }
     
        if (count===15) {
            setCount(0)
        }
        else {
            setCount(count+1)
        }
        
    }, isRunning ? delay : null);


    function handleSnareClick(e) {
        const step = e.target.value
        const snares = [...snareSteps]
        if (snares[step]) {
            snares[step] = false
            setSnareSteps(snares)
            // setBoolArray(createBoolArray())
            return      
        }
        else {
            snares[step] = true
            setSnareSteps(snares)
            //setBoolArray(createBoolArray())
            return
        }
    }

    function handleKickClick(e) {
        const step = e.target.value
        const kicks = [...kickSteps]
        if (kicks[step]) {
            kicks[step] = false
            setKickSteps(kicks)
            //setBoolArray(createBoolArray())
            return
        }
        else {
            kicks[step] = true
            setKickSteps(kicks)
            //setBoolArray(createBoolArray())
            return
        }

    }

    function handleHatClick(e) {
        const step = e.target.value
        const hats = [...hatSteps]
        if (hats[step]) {
            hats[step] = false
            setHatSteps(hats)
            //setBoolArray(createBoolArray())
            return
        }
        else {
            hats[step] = true
            setHatSteps(hats)
            //setBoolArray(createBoolArray())
            return
        }
    }



    function handleDelayChange(e) {
        setDelay(Number(e.target.value));
    }

    function play() {
        //setBoolArray(createBoolArray())
        setIsRunning(true)
    }

    function stop() {
        setIsRunning(false);
        setCount(0)
    }


    function clear() {
        setSnareSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
        setKickSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
        setHatSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
        setBoolArray([])
    }

    function toggleReverb() {
        if (!reverbOn) {
            setReverbOn(true)
        }
        else {
            setReverbOn(false)
        }
    }

    var reverb = new Pizzicato.Effects.Reverb({
        time: .5,
        decay: .5,
        reverse: false,
        mix: 0.5
    });

    


    

  return (
      <div>
      <div>
        <button onClick={play}>play</button>
        <button onClick={stop}>stop</button>
        <button onClick={clear}>clear</button>
        <button onClick={toggleReverb}>reverb</button>
       
      </div>
      <div id = "snare">
        <p style={{display:'block'}}>snare</p>
        <Button variant={setButtonVariant(snareSteps[0])} value='0' onClick={ e => handleSnareClick(e)}> 1</Button>
        <Button variant={setButtonVariant(snareSteps[1])} value='1'  onClick={ e => handleSnareClick(e)}> 2 </Button>
        <Button variant={setButtonVariant(snareSteps[2])} value='2' onClick={ e => handleSnareClick(e)}> 3 </Button>
        <Button variant={setButtonVariant(snareSteps[3])} value='3' onClick={ e => handleSnareClick(e)}> 4 </Button>
        <Button variant={setButtonVariant(snareSteps[4])} value='4' onClick={ e => handleSnareClick(e)}> 5 </Button>
        <Button variant={setButtonVariant(snareSteps[5])} value= '5' onClick={ e => handleSnareClick(e)}> 6</Button>
        <Button variant={setButtonVariant(snareSteps[6])} value='6'  onClick={ e => handleSnareClick(e)}> 7 </Button>
        <Button variant={setButtonVariant(snareSteps[7])} value='7' onClick={ e => handleSnareClick(e)}> 8 </Button>
        <Button variant={setButtonVariant(snareSteps[8])} value='8' onClick={ e => handleSnareClick(e)}> 9 </Button>
        <Button variant={setButtonVariant(snareSteps[9])} value='9' onClick={ e => handleSnareClick(e)}> 10 </Button>
        <Button variant={setButtonVariant(snareSteps[10])} value= '10' onClick={ e => handleSnareClick(e)}> 11 </Button>
        <Button variant={setButtonVariant(snareSteps[11])} value='11'  onClick={ e => handleSnareClick(e)}> 12 </Button>
        <Button variant={setButtonVariant(snareSteps[12])} value='12' onClick={ e => handleSnareClick(e)}> 13 </Button>
        <Button variant={setButtonVariant(snareSteps[13])} value='13' onClick={ e => handleSnareClick(e)}> 14 </Button>
        <Button variant={setButtonVariant(snareSteps[14])} value='14' onClick={ e => handleSnareClick(e)}> 15 </Button>
        <Button variant={setButtonVariant(snareSteps[15])} value='15' onClick={ e => handleSnareClick(e)}> 16 </Button>
      </div>
      <div id = "kick">
        <p style={{display:'block'}}>kick</p>
        <Button variant={setButtonVariant(kickSteps[0])} value='0' onClick={ e => handleKickClick(e)}> 1 </Button>
        <Button variant={setButtonVariant(kickSteps[1])} value='1' onClick={ e => handleKickClick(e)}> 2 </Button>
        <Button variant={setButtonVariant(kickSteps[2])} value='2' onClick={ e => handleKickClick(e)}> 3 </Button>
        <Button variant={setButtonVariant(kickSteps[3])} value='3' onClick={ e => handleKickClick(e)}> 4 </Button>
        <Button variant={setButtonVariant(kickSteps[4])} value='4' onClick={ e => handleKickClick(e)}> 5 </Button>
        <Button variant={setButtonVariant(kickSteps[5])} value='5' onClick={ e => handleKickClick(e)}> 6 </Button>
        <Button variant={setButtonVariant(kickSteps[6])} value='6' onClick={ e => handleKickClick(e)}> 7 </Button>
        <Button variant={setButtonVariant(kickSteps[7])} value='7' onClick={ e => handleKickClick(e)}> 8 </Button>
        <Button variant={setButtonVariant(kickSteps[8])} value='8' onClick={ e => handleKickClick(e)}> 9 </Button>
        <Button variant={setButtonVariant(kickSteps[9])} value='9' onClick={ e => handleKickClick(e)}> 10 </Button>
        <Button variant={setButtonVariant(kickSteps[10])} value='10' onClick={ e => handleKickClick(e)}> 11 </Button>
        <Button variant={setButtonVariant(kickSteps[11])} value='11' onClick={ e => handleKickClick(e)}> 12 </Button>
        <Button variant={setButtonVariant(kickSteps[12])} value='12' onClick={ e => handleKickClick(e)}> 13 </Button>
        <Button variant={setButtonVariant(kickSteps[13])} value='13' onClick={ e => handleKickClick(e)}> 14 </Button>
        <Button variant={setButtonVariant(kickSteps[14])} value='14' onClick={ e => handleKickClick(e)}> 15 </Button>
        <Button variant={setButtonVariant(kickSteps[15])} value='15' onClick={ e => handleKickClick(e)}> 16 </Button>
      </div>
      <div>
        <p style={{display:'block'}}>hat</p>
        <Button variant={setButtonVariant(hatSteps[0])} value='0' onClick={ e => handleHatClick(e)}> 1 </Button>
        <Button variant={setButtonVariant(hatSteps[1])} value='1' onClick={ e => handleHatClick(e)}> 2 </Button>
        <Button variant={setButtonVariant(hatSteps[2])} value='2' onClick={ e => handleHatClick(e)}> 3 </Button>
        <Button variant={setButtonVariant(hatSteps[3])} value='3' onClick={ e => handleHatClick(e)}> 4 </Button>
        <Button variant={setButtonVariant(hatSteps[4])} value='4' onClick={ e => handleHatClick(e)}> 5 </Button>
        <Button variant={setButtonVariant(hatSteps[5])} value='5' onClick={ e => handleHatClick(e)}> 6 </Button>
        <Button variant={setButtonVariant(hatSteps[6])} value='6' onClick={ e => handleHatClick(e)}> 7 </Button>
        <Button variant={setButtonVariant(hatSteps[7])} value='7' onClick={ e => handleHatClick(e)}> 8 </Button>
        <Button variant={setButtonVariant(hatSteps[8])} value='8' onClick={ e => handleHatClick(e)}> 9 </Button>
        <Button variant={setButtonVariant(hatSteps[9])} value='9' onClick={ e => handleHatClick(e)}> 10 </Button>
        <Button variant={setButtonVariant(hatSteps[10])} value='10' onClick={ e => handleHatClick(e)}> 11 </Button>
        <Button variant={setButtonVariant(hatSteps[11])} value='11' onClick={ e => handleHatClick(e)}> 12 </Button>
        <Button variant={setButtonVariant(hatSteps[12])} value='12' onClick={ e => handleHatClick(e)}> 13 </Button>
        <Button variant={setButtonVariant(hatSteps[13])} value='13' onClick={ e => handleHatClick(e)}> 14 </Button>
        <Button variant={setButtonVariant(hatSteps[14])} value='14' onClick={ e => handleHatClick(e)}> 15 </Button>
        <Button variant={setButtonVariant(hatSteps[15])} value='15' onClick={ e => handleHatClick(e)}> 16 </Button>
      </div>
      <BassSynth />
      </div>
  );
}

export default Beat