import './App.css';
import React, { useState, useEffect } from 'react';
import Pizzicato from 'pizzicato';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import BassKeyboard from './bass_keyboard';


function BassSynth() {

    //roughly 1.059
    const semitone_up = 261.63/246.94
    //roughly .943
    const semitone_down = 246.94/261.63
    //261 is middle c
    const c_freq = [65.41, 73.42, 82.41, 87.31, 98.00, 110.00, 123.47, 130.81, 146.83, 164.81]
    const [tones, setTones] = useState([])
    const [frequencies, setFrequencies] = useState([])
    const [flangerOn, setFlangerOn] = useState(false)

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


    var distortion = new Pizzicato.Effects.Distortion()

    function toggleFlanger() {
        var isOn = flangerOn
        if (!flangerOn) {
            const notes = createWaves(frequencies, true)
            setTones(notes)
            isOn = true
        }
        else {
            const notes = createWaves(frequencies, false)
            setTones(notes)
            isOn = false
        }
        setFlangerOn(isOn)
    }


    function createWaves(scale, flangerBool) {
        var tones = []  
        // flange is boosting volume, need to make initial volume lower if turned on
        if (flangerBool) {
            for (const element of scale) {
                tones.push(new Pizzicato.Sound({ 
                    source: 'wave',
                    options: { type: 'sine', frequency: element , release: 0.1, attack: 0.1, volume: .05}
                }))
            }
            for (const tone of tones) {
                tone.addEffect(distortion) 
                
            }
        }
        else {
            for (const element of scale) {
                tones.push(new Pizzicato.Sound({ 
                    source: 'wave',
                    options: { type: 'sine', frequency: element , release: 0.1, attack: 0.1, volume: .4}
                }))
            }
            for (const tone of tones) {
                
            }
        }
        return tones
    }

    function setScaleFreq(e) {
        const key = e.target.value
        const frequencies = c_freq.map((element) => element * multipliers[key])
        setFrequencies(frequencies)
        const notes = createWaves(frequencies, flangerOn)
        setTones(notes)
    }
  
    return (
        <div>

            <Form.Select onChange={e => {setScaleFreq(e)}}  style={{height:'3rem'}} >
                    <option value="" hidden> Change Key </option>
                   {dropdownValues.map((item) => <option key = {item.label} value={item.value}>{item.label}</option>)}
               </Form.Select>
            <BassKeyboard tones={tones} toggleFlanger={toggleFlanger} />
        </div>
    )
 
}
export default BassSynth