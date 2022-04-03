import './App.css';
import React, { useState } from 'react';
import Pizzicato from 'pizzicato';
import BassControls from './bass_controls';
import useInterval from './use_interval';

function BassSynth() {
    //roughly 1.059
    const semitone_up = 261.63/246.94
    //roughly .943
    const semitone_down = 246.94/261.63
    //261 is middle c
    const c_freq = [65.41, 73.42, 82.41, 87.31, 98.00, 110.00, 123.47, 130.81]
    const default_tones = []  
   
    for (const element of c_freq) {
        default_tones.push(new Pizzicato.Sound({ 
            source: 'wave',
            options: { type: 'sine', frequency: element , release: 0.1, attack: 0.1, volume: .8}
        }))
    }
   
    const [tones, setTones] = useState(default_tones)
    const [frequencies, setFrequencies] = useState(c_freq)
    const [distortionOn, setdistortionOn] = useState(false)
    const [distButtonClass, setDistButtonClass] = useState("bass-effect-button-off")
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

    useInterval(() => {
        //this briefly kills sound every 5 seconds to prevent runaway feedback or 
        // a stuck key causing note to hold
        for (const tone of tones) {
            tone.stop()
        }      
    }, 5000);

    var distortion = new Pizzicato.Effects.Distortion({
    gain: 0.4
    });

    function toggleDistortion() {
        for (const tone of tones) {
            tone.stop()
        }
        var isOn = distortionOn
        if (!distortionOn) {
            const notes = createWaves(frequencies, true)
            setTones(notes)
            setDistButtonClass("bass-effect-button-on")
            isOn = true
        }
        else {
            const notes = createWaves(frequencies, false)
            setTones(notes)
            setDistButtonClass("bass-effect-button-off")
            isOn = false
        }
        setdistortionOn(isOn)   
    }

    function createWaves(scale, distortionBool) {
        var tones = []  
        if (distortionBool) {
            for (var element of scale) {
                element = Math.round(element * 100) / 100
                tones.push(new Pizzicato.Sound({ 
                    source: 'wave',
                    options: { type: 'sine', frequency: element , release: 0.1, attack: 0.1, volume: .1}
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
                    options: { type: 'sine', frequency: element , release: 0.1, attack: 0.1, volume: .8}
                }))
            }
        }
        return tones
    }

    function handleKeyChange(key) {
        for (const tone of tones) {
            tone.stop()
        }
        setScaleFreq(key) 
    }

    function setScaleFreq(key) {
        const frequencies = c_freq.map((element) => element * multipliers[key])
        setFrequencies(frequencies)
        const notes = createWaves(frequencies, distortionOn)
        setTones(notes)
    }

    return (
        <div style={{height:'100%'}}>
            <BassControls 
            handleKeyChange={handleKeyChange} 
            toggleDistortion={toggleDistortion}
            distButtonClass={distButtonClass}
            tones={tones}
            />
        </div>
    )
}

export default BassSynth