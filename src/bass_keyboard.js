import React, { useState, useEffect } from 'react';
import { useHotkeys, isHotkeyPressed } from 'react-hotkeys-hook';
import Button from 'react-bootstrap/Button';

function BassKeyboard(props) {

    const [pressed, setPressed] = useState(false)

    const [lastPlayed, setLastPlayed] = useState(null)

    function keyClass(key) {
        if (isHotkeyPressed(key) && pressed) {
            return "keyboard-key-pressed"
        }
        else {
            return "keyboard-key"
        }
    }

    function pressKey(tone) {
        props.tones.forEach((element, index) => {
            if (index !== tone) {
                element.stop()
            }
        });
        setPressed(true)
        props.tones[tone].play()
        //setLastPlayed(tone)
        
    }

    function releaseKey(tone) {
        setPressed(false)
        props.tones[tone].stop()
    }

    useHotkeys('z', () => pressKey(0), {keydown:true}, [props.tones]);
    useHotkeys('z', () => releaseKey(0), {keyup:true}, [props.tones]);   
    useHotkeys('x', () => pressKey(1), {keydown:true}, [props.tones]);
    useHotkeys('x', () => releaseKey(1), {keyup:true}, [props.tones]);
    useHotkeys('c', () => pressKey(2), {keydown:true}, [props.tones]);
    useHotkeys('c', () => releaseKey(2), {keyup:true}, [props.tones]);
    useHotkeys('v', () => pressKey(3), {keydown:true}, [props.tones]);
    useHotkeys('v', () => releaseKey(3), {keyup:true}, [props.tones]);
    useHotkeys('b', () => pressKey(4), {keydown:true}, [props.tones]);
    useHotkeys('b', () => releaseKey(4), {keyup:true}, [props.tones]);
    useHotkeys('n', () => pressKey(5), {keydown:true}, [props.tones]);
    useHotkeys('n', () => releaseKey(5), {keyup:true}, [props.tones]);
    useHotkeys('m', () => pressKey(6), {keydown:true}, [props.tones]);
    useHotkeys('m', () => releaseKey(6), {keyup:true}, [props.tones]);
    useHotkeys(',', () => pressKey(7), {keydown:true}, [props.tones]);
    useHotkeys(',', () => releaseKey(7), {keyup:true}, [props.tones]);


    return (
        <div>
         
          <div>
            <div className = {keyClass("z")}> <p className="key-label">z</p> </div>
            <div className = {keyClass("x")}> <p className="key-label">x</p> </div>
            <div className = {keyClass("c")}> <p className="key-label">c</p> </div>
            <div className = {keyClass("v")}> <p className="key-label">v</p> </div>
            <div className = {keyClass("b")}> <p className="key-label">b</p> </div>
            <div className = {keyClass("n")}> <p className="key-label">n</p> </div>
            <div className = {keyClass("m")}> <p className="key-label">m</p> </div>
            <div className = {keyClass(",")}> <p className="key-label">,</p> </div>
          </div>
       
        </div>
    )
}
export default BassKeyboard