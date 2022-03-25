import './App.css';
import React, { useState, useEffect } from 'react';
import Pizzicato from 'pizzicato';
import Button from 'react-bootstrap/Button';
import { useHotkeys, isHotkeyPressed } from 'react-hotkeys-hook';
import LeadKeyboard from './lead_keyboard';
import Form from 'react-bootstrap/Form'



function LeadSynth() {

    //roughly 1.059
    const semitone_up = 261.63/246.94
    //roughly .943
    const semitone_down = 246.94/261.63
    //261 is middle c
    const c_freq = [261.64, 293.68, 329.64, 349.24, 392, 440, 493.88, 523.24, 587.32, 659.24, 698.44, 784, 880, 987.76, 1046.52]
    const [tones, setTones] = useState([])
    const [frequencies, setFrequencies] = useState([])
    const [delayOn, setDelayOn] = useState(false)
    const [reverbOn, setReverbOn] = useState(false)

  


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

    var delay = new Pizzicato.Effects.Delay({
        feedback: 0.2,
        time: 0.520,
        mix: 0.1
    });

    var reverb = new Pizzicato.Effects.Reverb({
        time: .4,
        decay: .3,
        reverse: false,
        mix: 0.2
    });

    function toggleDelay() {
        var isOn = delayOn
        if (!delayOn) {
            const notes = createWaves(frequencies, true, reverbOn)
            setTones(notes)
            isOn = true
        }
        else {
            const notes = createWaves(frequencies, false, reverbOn)
            setTones(notes)
            isOn = false
        }
        setDelayOn(isOn)
    }

    function toggleReverb() {
        var isOn = reverbOn
        if (!reverbOn) {
            const notes = createWaves(frequencies, delayOn, true)
            setTones(notes)
            isOn = true
        }
        else {
            const notes = createWaves(frequencies, delayOn, false)
            setTones(notes)
            isOn = false
        }
        setReverbOn(isOn)
    }


    

    function createWaves(scale, delayBool, reverbBool) {
        var tones = []  
        for (const element of scale) {
            tones.push(new Pizzicato.Sound({ 
                source: 'wave',
                options: { type: 'sawtooth', frequency: element , release: 0.2, attack: 0.7, volume: .001}
            }))
        }
        for (const tone of tones) {
            tone.addEffect(lowPassFilter)
            if (delayBool) {
                tone.addEffect(delay)
            }
            if (reverbBool) {
                tone.addEffect(reverb)
            }
            tone.addEffect(compressor)
            
        }
        return tones
    }

    function setScaleFreq(e) {
        const key = e.target.value
        const frequencies = c_freq.map((element) => element * multipliers[key])
        setFrequencies(frequencies)
        const notes = createWaves(frequencies, delayOn, reverbOn)
        setTones(notes)
    }

  
    return (
        <div>
            <div className="lead-controls">
                <Form.Select onChange={e => {setScaleFreq(e)}}  style={{height:'3rem', display:'inline-block'}}>
                    <option value="" hidden> Change Key </option>
                   {dropdownValues.map((item) => <option key = {item.label} value={item.value}>{item.label}</option>)}
               </Form.Select>               
            </div>
            
            
            <LeadKeyboard tones={tones} toggleDelay={toggleDelay} toggleReverb={toggleReverb}/>
        </div>
    )
 
}
export default LeadSynth