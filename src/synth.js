import './App.css';
import React, { useState, useEffect } from 'react';
import Pizzicato from 'pizzicato';
import Button from 'react-bootstrap/Button';
import { useHotkeys, isHotkeyPressed } from 'react-hotkeys-hook';


function BassSynth() {

    //roughly 1.059
    const semitone_up = 261.63/246.94
    //roughly .943
    const semitone_down = 246.94/261.63
    //261 is middle c
    const c_freq = [65.41, 73.42, 82.41, 87.31, 98.00, 110.00, 123.47, 130.81, 146.83, 164.81, 174.61, 196.00, 220.00, 246.94, 261.63]
    const [tones, setTones] = useState([])


    useHotkeys('z', () => tones[0].play(), {keydown:true});
    useHotkeys('z', () => tones[0].stop(), {keyup:true});   
    useHotkeys('x', () => tones[1].play(), {keydown:true});
    useHotkeys('x', () => tones[1].stop(), {keyup:true});
    useHotkeys('c', () => tones[2].play(), {keydown:true});
    useHotkeys('c', () => tones[2].stop(), {keyup:true});
    useHotkeys('v', () => tones[3].play(), {keydown:true});
    useHotkeys('v', () => tones[3].stop(), {keyup:true});
    useHotkeys('b', () => tones[4].play(), {keydown:true});
    useHotkeys('b', () => tones[4].stop(), {keyup:true});
    useHotkeys('n', () => tones[5].play(), {keydown:true});
    useHotkeys('n', () => tones[5].stop(), {keyup:true});
    useHotkeys('m', () => tones[6].play(), {keydown:true});
    useHotkeys('m', () => tones[6].stop(), {keyup:true});
    useHotkeys('a', () => tones[7].play(), {keydown:true});
    useHotkeys('a', () => tones[7].stop(), {keyup:true});
    useHotkeys('s', () => tones[8].play(), {keydown:true});
    useHotkeys('s', () => tones[8].stop(), {keyup:true});
    useHotkeys('d', () => tones[9].play(), {keydown:true});
    useHotkeys('d', () => tones[9].stop(), {keyup:true});
    useHotkeys('f', () => tones[10].play(), {keydown:true});
    useHotkeys('f', () => tones[10].stop(), {keyup:true});
    useHotkeys('g', () => tones[11].play(), {keydown:true});
    useHotkeys('g', () => tones[11].stop(), {keyup:true});
    useHotkeys('h', () => tones[12].play(), {keydown:true});
    useHotkeys('h', () => tones[12].stop(), {keyup:true});
    useHotkeys('j', () => tones[13].play(), {keydown:true});
    useHotkeys('j', () => tones[13].stop(), {keyup:true});
    useHotkeys('k', () => tones[14].play(), {keydown:true});
    useHotkeys('k', () => tones[14].stop(), {keyup:true});
    

    const multipliers = {
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


    function createSineWaves(scale) {
        var tones = []  
        for (const element of scale) {
            tones.push(new Pizzicato.Sound({ 
                source: 'wave',
                options: { type: 'sine', frequency: element , release: 0.2, attack: 0.08, volume: .5}
            }))
        }
        return tones
    }

    function setScaleFreq(e) {
        const key = e.target.value
        const selected_key = c_freq.map((element) => element * multipliers[key])
        const notes = createSineWaves(selected_key)
        setTones(notes)
    }

  
    return (
        <div>
            <button value = "d" onClick={e => setScaleFreq(e)}> d </button>
            <button value = "e" onClick={e => setScaleFreq(e)}> e </button>
            <button value = "f" onClick={e => setScaleFreq(e)}> f </button>
            <button value = "b" onClick={e => setScaleFreq(e)}> b </button>
            {/* <button onClick={play}> play </button>
            <button onClick={stop}> stop </button> */}
        </div>
    )
 
}
export default BassSynth