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

    //const [tempo, setTempo] = useState(props.tempo)
    //const [interval, setInterval] = useState((props.interval))
    const [isRunning, setIsRunning] = useState(false);
    const [count, setCount] = useState(0)
    const [snareSteps, setSnareSteps] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const [kickSteps, setKickSteps] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const [hatSteps, setHatSteps] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const [cymbalSteps, setCymbalSteps] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const [boolArray, setBoolArray] = useState([])
    //const [reverbOn, setReverbOn] = useState(false)
    const [buttonVariant, setButtonVariant] = useState(['outline-secondary', 'outline-secondary', 'outline-secondary', 'outline-secondary'])

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
   

    function setStepButtonVariant(step) {
        var variant = step ? 'primary' : 'outline-primary';
        return variant
    }

    var distortion = new Pizzicato.Effects.Distortion({
        gain: 0.3
    });

    useInterval(() => {
        const current = boolArray[count]
        if (current!=="false,false,false,false") {
            const sound = groups.get(current)
            //if (reverbOn) {
            //    sound.addEffect(reverb)
            //}
            sound.addEffect(distortion)
            sound.play();
        }
     
        if (count===15) {
            setCount(0)
        }
        else {
            setCount(count+1)
        }
        
    }, isRunning ? props.interval : null);


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
        var variants = [...buttonVariant]
        variants[0] = "secondary"
        variants[1] = "outline-secondary"
        setButtonVariant(variants)
    }

    function stop() {
        setIsRunning(false);
        setCount(0)
        var variants = [...buttonVariant]
        variants[0] = "outline-secondary"
        variants[1] = "secondary"
        setButtonVariant(variants)
    }


    function clear() {
        setSnareSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
        setKickSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
        setHatSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
        setCymbalSteps([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
        setBoolArray([])
    }

    

  return (
      <div style={{height:'100%', width:'100%'}}>
      {/* <div>
        <Button variant={buttonVariant[0]} size= "lg" onClick={play}>play</Button>
        <Button variant={buttonVariant[1]} size= "lg"  onClick={stop}>stop</Button>
        <Button variant={buttonVariant[2]} size= "lg"  onClick={clear}>clear</Button>
        {/* <Button variant={buttonVariant[3]} size= "lg"  onClick={toggleReverb}>reverb</Button> </div>  */}

       
     
      {/* <div id = "snare">
        <p style={{display:'block'}}>snare</p>
        <Button variant={setStepButtonVariant(snareSteps[0])} value='0' onClick={ e => handleSnareClick(e)}> 1</Button>
        <Button variant={setStepButtonVariant(snareSteps[1])} value='1'  onClick={ e => handleSnareClick(e)}> 2 </Button>
        <Button variant={setStepButtonVariant(snareSteps[2])} value='2' onClick={ e => handleSnareClick(e)}> 3 </Button>
        <Button variant={setStepButtonVariant(snareSteps[3])} value='3' onClick={ e => handleSnareClick(e)}> 4 </Button>
        <Button variant={setStepButtonVariant(snareSteps[4])} value='4' onClick={ e => handleSnareClick(e)}> 5 </Button>
        <Button variant={setStepButtonVariant(snareSteps[5])} value= '5' onClick={ e => handleSnareClick(e)}> 6</Button>
        <Button variant={setStepButtonVariant(snareSteps[6])} value='6'  onClick={ e => handleSnareClick(e)}> 7 </Button>
        <Button variant={setStepButtonVariant(snareSteps[7])} value='7' onClick={ e => handleSnareClick(e)}> 8 </Button>
        <Button variant={setStepButtonVariant(snareSteps[8])} value='8' onClick={ e => handleSnareClick(e)}> 9 </Button>
        <Button variant={setStepButtonVariant(snareSteps[9])} value='9' onClick={ e => handleSnareClick(e)}> 10 </Button>
        <Button variant={setStepButtonVariant(snareSteps[10])} value= '10' onClick={ e => handleSnareClick(e)}> 11 </Button>
        <Button variant={setStepButtonVariant(snareSteps[11])} value='11'  onClick={ e => handleSnareClick(e)}> 12 </Button>
        <Button variant={setStepButtonVariant(snareSteps[12])} value='12' onClick={ e => handleSnareClick(e)}> 13 </Button>
        <Button variant={setStepButtonVariant(snareSteps[13])} value='13' onClick={ e => handleSnareClick(e)}> 14 </Button>
        <Button variant={setStepButtonVariant(snareSteps[14])} value='14' onClick={ e => handleSnareClick(e)}> 15 </Button>
        <Button variant={setStepButtonVariant(snareSteps[15])} value='15' onClick={ e => handleSnareClick(e)}> 16 </Button>
      </div>
      <div id = "kick">
        <p style={{display:'block'}}>kick</p>
        <Button variant={setStepButtonVariant(kickSteps[0])} value='0' onClick={ e => handleKickClick(e)}> 1 </Button>
        <Button variant={setStepButtonVariant(kickSteps[1])} value='1' onClick={ e => handleKickClick(e)}> 2 </Button>
        <Button variant={setStepButtonVariant(kickSteps[2])} value='2' onClick={ e => handleKickClick(e)}> 3 </Button>
        <Button variant={setStepButtonVariant(kickSteps[3])} value='3' onClick={ e => handleKickClick(e)}> 4 </Button>
        <Button variant={setStepButtonVariant(kickSteps[4])} value='4' onClick={ e => handleKickClick(e)}> 5 </Button>
        <Button variant={setStepButtonVariant(kickSteps[5])} value='5' onClick={ e => handleKickClick(e)}> 6 </Button>
        <Button variant={setStepButtonVariant(kickSteps[6])} value='6' onClick={ e => handleKickClick(e)}> 7 </Button>
        <Button variant={setStepButtonVariant(kickSteps[7])} value='7' onClick={ e => handleKickClick(e)}> 8 </Button>
        <Button variant={setStepButtonVariant(kickSteps[8])} value='8' onClick={ e => handleKickClick(e)}> 9 </Button>
        <Button variant={setStepButtonVariant(kickSteps[9])} value='9' onClick={ e => handleKickClick(e)}> 10 </Button>
        <Button variant={setStepButtonVariant(kickSteps[10])} value='10' onClick={ e => handleKickClick(e)}> 11 </Button>
        <Button variant={setStepButtonVariant(kickSteps[11])} value='11' onClick={ e => handleKickClick(e)}> 12 </Button>
        <Button variant={setStepButtonVariant(kickSteps[12])} value='12' onClick={ e => handleKickClick(e)}> 13 </Button>
        <Button variant={setStepButtonVariant(kickSteps[13])} value='13' onClick={ e => handleKickClick(e)}> 14 </Button>
        <Button variant={setStepButtonVariant(kickSteps[14])} value='14' onClick={ e => handleKickClick(e)}> 15 </Button>
        <Button variant={setStepButtonVariant(kickSteps[15])} value='15' onClick={ e => handleKickClick(e)}> 16 </Button>
      </div>
      <div id="hat">
        <p style={{display:'block'}}>hat</p>
        <Button variant={setStepButtonVariant(hatSteps[0])} value='0' onClick={ e => handleHatClick(e)}> 1 </Button>
        <Button variant={setStepButtonVariant(hatSteps[1])} value='1' onClick={ e => handleHatClick(e)}> 2 </Button>
        <Button variant={setStepButtonVariant(hatSteps[2])} value='2' onClick={ e => handleHatClick(e)}> 3 </Button>
        <Button variant={setStepButtonVariant(hatSteps[3])} value='3' onClick={ e => handleHatClick(e)}> 4 </Button>
        <Button variant={setStepButtonVariant(hatSteps[4])} value='4' onClick={ e => handleHatClick(e)}> 5 </Button>
        <Button variant={setStepButtonVariant(hatSteps[5])} value='5' onClick={ e => handleHatClick(e)}> 6 </Button>
        <Button variant={setStepButtonVariant(hatSteps[6])} value='6' onClick={ e => handleHatClick(e)}> 7 </Button>
        <Button variant={setStepButtonVariant(hatSteps[7])} value='7' onClick={ e => handleHatClick(e)}> 8 </Button>
        <Button variant={setStepButtonVariant(hatSteps[8])} value='8' onClick={ e => handleHatClick(e)}> 9 </Button>
        <Button variant={setStepButtonVariant(hatSteps[9])} value='9' onClick={ e => handleHatClick(e)}> 10 </Button>
        <Button variant={setStepButtonVariant(hatSteps[10])} value='10' onClick={ e => handleHatClick(e)}> 11 </Button>
        <Button variant={setStepButtonVariant(hatSteps[11])} value='11' onClick={ e => handleHatClick(e)}> 12 </Button>
        <Button variant={setStepButtonVariant(hatSteps[12])} value='12' onClick={ e => handleHatClick(e)}> 13 </Button>
        <Button variant={setStepButtonVariant(hatSteps[13])} value='13' onClick={ e => handleHatClick(e)}> 14 </Button>
        <Button variant={setStepButtonVariant(hatSteps[14])} value='14' onClick={ e => handleHatClick(e)}> 15 </Button>
        <Button variant={setStepButtonVariant(hatSteps[15])} value='15' onClick={ e => handleHatClick(e)}> 16 </Button>
      </div>
      <div id="cymbal">
        <p style={{display:'block'}}>cymbal</p>
        <Button variant={setStepButtonVariant(cymbalSteps[0])} value='0' onClick={ e => handleCymbalClick(e)}> 1 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[1])} value='1' onClick={ e => handleCymbalClick(e)}> 2 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[2])} value='2' onClick={ e => handleCymbalClick(e)}> 3 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[3])} value='3' onClick={ e => handleCymbalClick(e)}> 4 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[4])} value='4' onClick={ e => handleCymbalClick(e)}> 5 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[5])} value='5' onClick={ e => handleCymbalClick(e)}> 6 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[6])} value='6' onClick={ e => handleCymbalClick(e)}> 7 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[7])} value='7' onClick={ e => handleCymbalClick(e)}> 8 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[8])} value='8' onClick={ e => handleCymbalClick(e)}> 9 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[9])} value='9' onClick={ e => handleCymbalClick(e)}> 10 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[10])} value='10' onClick={ e => handleCymbalClick(e)}> 11 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[11])} value='11' onClick={ e => handleCymbalClick(e)}> 12 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[12])} value='12' onClick={ e => handleCymbalClick(e)}> 13 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[13])} value='13' onClick={ e => handleCymbalClick(e)}> 14 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[14])} value='14' onClick={ e => handleCymbalClick(e)}> 15 </Button>
        <Button variant={setStepButtonVariant(cymbalSteps[15])} value='15' onClick={ e => handleCymbalClick(e)}> 16 </Button>
      </div>
       */}
        <DrumMachine 
        setStepButtonVariant={setStepButtonVariant}
        snareSteps={snareSteps}
        handleSnareClick={handleSnareClick}  
        kickSteps={kickSteps}
        handleKickClick={handleKickClick}
        hatSteps={hatSteps}
        handleHatClick={handleHatClick}
        cymbalSteps={cymbalSteps}
        handleCymbalClick={handleCymbalClick}
        />
      </div>
  );
}

export default Beat