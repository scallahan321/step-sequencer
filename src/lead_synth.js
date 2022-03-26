import './App.css';
import React, { useState } from 'react';
import Pizzicato from 'pizzicato';
import Button from 'react-bootstrap/Button';

import LeadKeyboard from './lead_keyboard';
import Form from 'react-bootstrap/Form'


//test form

function LeadSynth(props) {

    //roughly 1.059
    const semitone_up = 261.63/246.94
    //roughly .943
    const semitone_down = 246.94/261.63
    //261 is middle c
    const c_freq = [261.64, 293.68, 329.64, 349.24, 392, 440, 493.88, 523.24, 587.32, 659.24, 698.44, 784, 880, 987.76, 1046.52]
    const default_tones = []  

    var defaultLowPass = new Pizzicato.Effects.LowPassFilter({
        frequency: 500,
        peak: 10
    })
    var defaultCompressor = new Pizzicato.Effects.Compressor({
        threshold: -20,
        knee: 22,
        attack: 0.05,
        release: 0.05,
        ratio: 10
    })
    for (const element of c_freq) {
        default_tones.push(new Pizzicato.Sound({ 
            source: 'wave',
            options: { type: 'sawtooth', frequency: element , release: 0.2, attack: 0.7, volume: .01}
        }))
    }
    for (const tone of default_tones) {
        tone.addEffect(defaultLowPass)
        tone.addEffect(defaultCompressor)   
    }


    const [tones, setTones] = useState(default_tones)
    const [frequencies, setFrequencies] = useState(c_freq)
    const [delayOn, setDelayOn] = useState(false)
    const [delayDivision, setDelayDivision] = useState("eighth")
    //const [delayTempo, setDelayTempo] = useState(300)
    const [reverbOn, setReverbOn] = useState(false)
    const [toggleDelayVariant, setToggleDelayVariant] = useState('outline-secondary')
    const [toggleReverbVariant, setToggleReverbVariant] = useState('outline-secondary')
    const [key, setKey] = useState("c")
    const [keyFormDisabled, setKeyFormDisabled] = useState(false)
    const [keySubmitButtonVariant, setKeySubmitButtonVariant] = useState('outline-secondary')
    const [delayDivisionVariant, setDelayDivisionVariant] = useState('outline-secondary')
    const [delayFormDisabled, setDelayFormDisabled] = useState(false)
 

    

    const multipliers = {
        "c": 1,
        "c_sharp": semitone_up,
        "d": Math.pow(semitone_up, 2),
        "e_flat": Math.pow(semitone_up, 3),
        "e": Math.pow(semitone_up, 4),
        "f": Math.pow(semitone_up, 5),
        "f_sharp": Math.pow(semitone_up, 6),
        "g": Math.pow(semitone_up, 7),
        "b": semitone_down,
        "b_flat": Math.pow(semitone_down, 2),
        "a": Math.pow(semitone_down, 3),
        "a_flat": Math.pow(semitone_down, 4),
    }

    const dropdownValues = [
        {'label': 'C Major', 'value': 'c' },
        {'label': 'C# Major', 'value': 'c_sharp' },
        {'label': 'D Major', 'value': 'd' },
        {'label': 'Eb Major', 'value': 'e_flat' },
        {'label': 'E Major', 'value': 'e' },
        {'label': 'F Major', 'value': 'f' },
        {'label': 'F# Major', 'value': 'f_sharp' },
        {'label': 'G Major', 'value': 'g' },
        {'label': 'B Major', 'value': 'b' },
        {'label': 'Bb Major', 'value': 'b_flat' },
        {'label': 'A Major', 'value': 'a' },
        {'label': 'Ab Major', 'value': 'a_flat' }
    ]

    var lowPassFilter = new Pizzicato.Effects.LowPassFilter({
        frequency: 500,
        peak: 10
    });

    var compressor = new Pizzicato.Effects.Compressor({
        threshold: -20,
        knee: 22,
        attack: 0.05,
        release: 0.05,
        ratio: 10
    });

    // var delay = new Pizzicato.Effects.Delay({
    //     feedback: 0.2,
    //     // time: 0.520,
    //     time: delayTempo,
    //     mix: 0.1
    // });

    var reverb = new Pizzicato.Effects.Reverb({
        time: .7,
        decay: .8,
        reverse: false,
        mix: 0.4
    });

   

   

    function toggleDelay() {
        for (const tone of tones) {
            tone.stop()
        }
        var isOn = delayOn
        if (!delayOn) {
            const notes = createWaves(frequencies, true, delayDivision, reverbOn)
            setTones(notes)
            setToggleDelayVariant('secondary')
            isOn = true
        }
        else {
            const notes = createWaves(frequencies, false, delayDivision, reverbOn)
            setTones(notes)
            setToggleDelayVariant('outline-secondary')
            isOn = false
        }
        setDelayOn(isOn)
    }

    function toggleReverb() {
        for (const tone of tones) {
            tone.stop()
        }
        var isOn = reverbOn
        if (!reverbOn) {
            const notes = createWaves(frequencies, delayOn, delayDivision, true)
            setTones(notes)
            setToggleReverbVariant('secondary')
            isOn = true
        }
        else {
            const notes = createWaves(frequencies, delayOn, delayDivision, false)
            setTones(notes)
            setToggleReverbVariant('outline-secondary')
            isOn = false
        }
        setReverbOn(isOn)
    }


    

    function createWaves(scale, delayBool, division, reverbBool) {
        var tones = []  
        for (const element of scale) {
            tones.push(new Pizzicato.Sound({ 
                source: 'wave',
                options: { type: 'sawtooth', frequency: element , release: 0.2, attack: 0.7, volume: .01}
            }))
        }
        for (const tone of tones) {
            tone.addEffect(lowPassFilter)
            
            if (delayBool) {
                if (division==="eighth") {
                    var delay_eighth = new Pizzicato.Effects.Delay({
                        feedback: 0.3,
                        time: (props.interval/1000),
                        mix: 0.2
                    })
                    //setDelayDivision(division)
                    tone.addEffect(delay_eighth)
                }
                else if (division==="quarter") {
                    var delay_quarter = new Pizzicato.Effects.Delay({
                        feedback: 0.3,
                        time: (props.interval/500),
                        mix: 0.2
                    })
                    //setDelayDivision(division)
                    tone.addEffect(delay_quarter)
                }
                else if (division==="sixteenth") {
                    var delay_sixteenth = new Pizzicato.Effects.Delay({
                        feedback: 0.3,
                        time: (props.interval / 2000),
                        mix: 0.2
                    })
                    //setDelayDivision(division)
                    tone.addEffect(delay_sixteenth)
                }
                else if (division==="dotted eighth") {
                    var delay_dotted = new Pizzicato.Effects.Delay({
                        feedback: .3,
                        time: (props.interval/1000 * 1.5),
                        mix: 0.2
                    })
                    //setDelayDivision(division)
                    tone.addEffect(delay_dotted)
                }
            }
            if (reverbBool) {
                tone.addEffect(reverb)
            }
            tone.addEffect(compressor)
            
        }
        return tones
    }

    function handleDelayChange(e) {
        for (const tone of tones) {
            tone.stop()
        }
        setDelayDivision(e.target.value)
        setDelayFormDisabled(true)
        setDelayDivisionVariant('info')
    }

    function handleDelaySubmit() {
        //const val = e.target.value
        for (const tone of tones) {
            tone.stop()
        }
        const notes = createWaves(frequencies, delayOn, delayDivision, reverbOn)
        setTones(notes)
        setDelayFormDisabled(false)
        setDelayDivisionVariant('outline-secondary')  
    }

    function setScaleFreq(e) {
        const key = e.target.value
        const frequencies = c_freq.map((element) => element * multipliers[key])
        setFrequencies(frequencies)
        const notes = createWaves(frequencies, delayOn, delayDivision, reverbOn)
        setTones(notes)
    }

    function handleKeyChange(e) {
        for (const tone of tones) {
            tone.stop()
        }
        setKey(e.target.value)
        setKeyFormDisabled(true)
        setKeySubmitButtonVariant('info')
      
    }

    function handleKeySubmit(e) {
        for (const tone of tones) {
            tone.stop()
        }
        setScaleFreq(e)
        setKeyFormDisabled(false)
        setKeySubmitButtonVariant('outline-secondary')
      
    }

  
    return (
        <div>
            <div className="lead-controls">
                <Form.Select onChange={e => handleKeyChange(e)} disabled={keyFormDisabled}  style={{height:'3rem', display:'inline-block'}}>
                    <option value="" hidden> Select Key </option>
                   {dropdownValues.map((item) => <option key = {item.label} value={item.value}>{item.label}</option>)}
                </Form.Select>  
                <Button variant={keySubmitButtonVariant} size= "lg" value={key} onClick={e => handleKeySubmit(e)}>update key</Button>
                <Button variant={toggleDelayVariant} size= "lg" value="delay" onClick={toggleDelay}>toggle delay</Button>
                <Form.Select onChange={e => {handleDelayChange(e)}} disabled={delayFormDisabled}  style={{height:'3rem', display:'inline-block'}}>
                    <option value="" hidden> delay division </option>
                    <option value = "quarter">quarter note</option>
                    <option value="eighth">eighth note</option>
                    <option value = "dotted eighth">dotted eighth</option>
                    <option value = "sixteenth">sixteenth note</option>
                </Form.Select>  
                <Button variant={delayDivisionVariant} size= "lg" value={delayDivision} onClick={handleDelaySubmit}>update delay</Button>

                <Button variant={toggleReverbVariant} size= "lg" value= "reverb" onClick={toggleReverb}>toggle reverb</Button>
            </div>
            
            
            <LeadKeyboard tones={tones} delayOn={delayOn} reverbOn={reverbOn} toggleDelay={toggleDelay} toggleReverb={toggleReverb}/>
        </div>
    )
 
}
export default LeadSynth