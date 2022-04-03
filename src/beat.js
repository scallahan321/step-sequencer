import './App.css';
import React, { useState, useEffect } from 'react';
import Pizzicato from 'pizzicato';
import snare from './sounds/snare.mp3';
import kick from './sounds/kick.mp3';
import hihat from './sounds/hihat.mp3';
import crash from './sounds/crash.mp3'
import useInterval from './use_interval';
import Button from 'react-bootstrap/Button';
import DrumMachine from './drum_machine.js'


function Beat(props) {

   
    const [isRunning, setIsRunning] = useState(false);
    const [count, setCount] = useState(0)
    const [snareSteps, setSnareSteps] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const [kickSteps, setKickSteps] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const [hatSteps, setHatSteps] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const [cymbalSteps, setCymbalSteps] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const [boolArray, setBoolArray] = useState([])
    const [playButtonClass, setPlayButtonClass] = useState('drum-button-off')
    const [stopButtonClass, setStopButtonClass] = useState('drum-button-off')
    const [cleared, setCleared] = useState(false)

    const snare1 = new Pizzicato.Sound(snare)
    const snare2 = new Pizzicato.Sound(snare)
    const snare3 = new Pizzicato.Sound(snare)
    const snare4 = new Pizzicato.Sound(snare)
    const snare5 = new Pizzicato.Sound(snare)
    const snare6 = new Pizzicato.Sound(snare)
    const snare7 = new Pizzicato.Sound(snare)
    const snare8 = new Pizzicato.Sound(snare)
    const kick1 = new Pizzicato.Sound(kick)
    const kick2 = new Pizzicato.Sound(kick)
    const kick3 = new Pizzicato.Sound(kick)
    const kick4 = new Pizzicato.Sound(kick)
    const kick5 = new Pizzicato.Sound(kick)
    const kick6 = new Pizzicato.Sound(kick)
    const kick7 = new Pizzicato.Sound(kick)
    const kick8 = new Pizzicato.Sound(kick)
    const hat1 = new Pizzicato.Sound(hihat)
    const hat2 = new Pizzicato.Sound(hihat)
    const hat3 = new Pizzicato.Sound(hihat)
    const hat4 = new Pizzicato.Sound(hihat)
    const hat5 = new Pizzicato.Sound(hihat)
    const hat6 = new Pizzicato.Sound(hihat)
    const hat7 = new Pizzicato.Sound(hihat)
    const hat8 = new Pizzicato.Sound(hihat)
    const cymbal1 = new Pizzicato.Sound(crash)
    const cymbal2 = new Pizzicato.Sound(crash)
    const cymbal3 = new Pizzicato.Sound(crash)
    const cymbal4 = new Pizzicato.Sound(crash)
    const cymbal5 = new Pizzicato.Sound(crash)
    const cymbal6 = new Pizzicato.Sound(crash)
    const cymbal7 = new Pizzicato.Sound(crash)
    const cymbal8 = new Pizzicato.Sound(crash)

    const snareCymbal = new Pizzicato.Group([snare2, cymbal2])
    const snareKick = new Pizzicato.Group([snare3, kick2])
    const snareHat = new Pizzicato.Group([snare4, hat2])
    const snareKickCymbal = new Pizzicato.Group([snare5, kick3, cymbal3])
    const snareKickHat = new Pizzicato.Group([snare6, kick4, hat3])
    const snareHatCymbal = new Pizzicato.Group([snare7, hat4, cymbal4])
    const kickHat = new Pizzicato.Group([kick5, hat5])
    const kickCymbal = new Pizzicato.Group([kick6, cymbal5])
    const kickHatCymbal = new Pizzicato.Group([kick7, hat6, cymbal6])
    const hatCymbal = new Pizzicato.Group([hat7, cymbal7])
    const kickHatSnareCymbal = new Pizzicato.Group([kick8, hat8, snare8, cymbal8])

    const [stepClass, setStepClass] = useState([
        'step-button','step-button','step-button','step-button','step-button','step-button','step-button','step-button','step-button','step-button',
        'step-button','step-button', 'step-button', 'step-button', 'step-button', 'step-button'])


 
    useEffect(() => {
        var new_bool_array = []
        for (var i = 0; i <16; i++) {
            const step = [snareSteps[i], kickSteps[i], hatSteps[i], cymbalSteps[i]]
            new_bool_array.push(step.toString())
        }
        setBoolArray(new_bool_array)
    }, [snareSteps, kickSteps, hatSteps, cymbalSteps])
    
    const groups = new Map([
        // order of boolean array will be [snare, kick, hat]
        [[true, false, false, false].toString(), snare1],
        [[false, true, false, false].toString(), kick1],
        [[false, false, true, false].toString(), hat1],
        [[false, false, false, true].toString(), cymbal1],
        [[true, false, false, true].toString(), snareCymbal],
        [[true, true, false, false].toString(), snareKick],
        [[true, false, true, false].toString(), snareHat],
        [[true, true, false, true].toString(), snareKickCymbal],
        [[true, true, true, false].toString(), snareKickHat],
        [[true, false, true, true].toString(), snareHatCymbal],
        [[false, true, true, false].toString(), kickHat],
        [[false, true, false, true].toString(), kickCymbal],
        [[false, true, true, true].toString(), kickHatCymbal],
        [[false, false, true, true].toString(), hatCymbal],
        [[true, true, true, true].toString(), kickHatSnareCymbal] 
      ]);
   

    var distortion = new Pizzicato.Effects.Distortion({
        gain: 0.3
    });

    useInterval(() => {
        var step_class = [...stepClass]
        if (count % 2 ===0) {
            step_class[count] = 'step-button-highlighted'
            setStepClass(step_class)
        }
        const current = boolArray[count]
        if (current!=="false,false,false,false") {
            const sound = groups.get(current)
            sound.addEffect(distortion)
            sound.play();
        }

        if (count===15) {
            setCount(0)
        }
        else {
            setCount(count+1)
        }

        step_class[count] = 'step-button'
        setStepClass(step_class)
        
    }, isRunning ? props.interval : null);


    function handleSnareClick(e) {
        if (cleared) {
            setCleared(false)
        }
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
        if (cleared) {
            setCleared(false)
        }
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
        if (cleared) {
            setCleared(false)
        }
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

    function handleCymbalClick(e) {
        const step = e.target.value
        const cymbals = [...cymbalSteps]
        if (cymbals[step]) {
            cymbals[step] = false
            setCymbalSteps(cymbals)
            return
        }
        else {
            cymbals[step] = true
            setCymbalSteps(cymbals)
            return
        }
    }


    function play() {
        setIsRunning(true)
        var current_class = playButtonClass
        if (current_class==="drum-button-off") {
            current_class = "drum-button-on"
            setStopButtonClass("drum-button-off")
        }
        else {
            current_class = "drum-button-off"
        }
        setPlayButtonClass(current_class)
    }

    function stop() {
        setIsRunning(false);
        setCount(0)
        var current_class = stopButtonClass
        if (current_class==="drum-button-off") {
            current_class = "drum-button-on"
            setPlayButtonClass("drum-button-off")
        }
        else {
            current_class = "drum-button-off"
        }
        setStopButtonClass(current_class)
    }


    function clear() {
        setSnareSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
        setKickSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
        setHatSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
        setCymbalSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
        setBoolArray([])
        setCleared(true)
    }

    

  return (
    <div style={{height:'100%', width:'100%'}}>
        <div style={{display:'block', height:'14%', width:'100%', paddingBottom:'3%', paddingTop:'1%', borderBottom:'1px solid white'}}>
            <div style={{display:'inline-block', height:'100%', width:'30%'}}>
                <h2 className="drum-title">Drum Machine</h2>
            </div>
            <div style={{display:'inline-block', height:'100%', width:'50%', marginLeft:'15%'}}>
                <button className={playButtonClass} onClick={play}>play</button>
                <button className={stopButtonClass} onClick={stop}>stop</button>
                <button className= "drum-button-off" onClick={clear}>clear</button>
            </div>

        </div>


        

       <div style={{height:'86%', paddingTop:'1%'}}>
       <DrumMachine 
        snareSteps={snareSteps}
        handleSnareClick={handleSnareClick}  
        kickSteps={kickSteps}
        handleKickClick={handleKickClick}
        hatSteps={hatSteps}
        handleHatClick={handleHatClick}
        cymbalSteps={cymbalSteps}
        handleCymbalClick={handleCymbalClick}
        cleared={cleared}
        stepClass={stepClass}
        />
       </div>
       
      </div>
  );
}

export default Beat