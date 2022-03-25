import React, { useState, useEffect } from 'react';
import { useHotkeys, isHotkeyPressed } from 'react-hotkeys-hook';

function Keyboard(props) {

    //const [keyClass, setKeyClass] = useState({keyboard-key})
    // const [pressed, setPressed] = useState([
    //     false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
    // ])

    const [pressed, setPressed] = useState(false)

    const [lastPlayed, setLastPlayed] = useState(0)


    function keyClass(key) {
        if (isHotkeyPressed(key) && pressed) {
            return "keyboard-key-pressed"
        }
        else {
            return "keyboard-key"
        }
    }

    // function keyClass(key) {
    //     if (pressed[key]) {
    //         return "keyboard-key-pressed"
    //     }
    //     else {
    //         return "keyboard-key"
    //     }
    // }

    // function keyClass(key) {
    //     if (pressed[key]) {
    //         return "keyboard-key-pressed"
    //     }
    //     else {
    //         return "keyboard-key"
    //     }
    // }

    function pressKey(tone) {
        //var keys = [...pressed]
        //keys[tone] = true
        //setPressed(keys)
        setPressed(true)
        props.tones[tone].play()
        
    }

    function releaseKey(tone) {
        //var keys = [...pressed]
        //keys[tone] = false
        //setPressed(keys)
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
    useHotkeys('a', () => pressKey(7), {keydown:true}, [props.tones]);
    useHotkeys('a', () => releaseKey(7), {keyup:true}, [props.tones]);
    useHotkeys('s', () => pressKey(8), {keydown:true}, [props.tones]);
    useHotkeys('s', () => releaseKey(8), {keyup:true}, [props.tones]);
    useHotkeys('d', () => pressKey(9), {keydown:true}, [props.tones]);
    useHotkeys('d', () => releaseKey(9), {keyup:true}, [props.tones]);
    useHotkeys('f', () => pressKey(10), {keydown:true}, [props.tones]);
    useHotkeys('f', () => releaseKey(10), {keyup:true}, [props.tones]);
    useHotkeys('g', () => pressKey(11), {keydown:true}, [props.tones]);
    useHotkeys('g', () => releaseKey(11), {keyup:true}, [props.tones]);
    useHotkeys('h', () => pressKey(12), {keydown:true}, [props.tones]);
    useHotkeys('h', () => releaseKey(12), {keyup:true}, [props.tones]);
    useHotkeys('j', () => pressKey(13), {keydown:true}, [props.tones]);
    useHotkeys('j', () => releaseKey(13), {keyup:true}, [props.tones]);
    useHotkeys('k', () => pressKey(14), {keydown:true}, [props.tones]);
    useHotkeys('k', () => releaseKey(14), {keyup:true}, [props.tones]);


    return (
        <div style={{border: "2px dotted purple"}}>
          <div className = "top-row-keys">
          <div className = {keyClass("a")}> <p className="key-label">a</p> </div>
          <div className = {keyClass("s")}> <p className="key-label">s</p> </div>
          <div className = {keyClass("d")}> <p className="key-label">d</p> </div>
          <div className = {keyClass("f")}> <p className="key-label">f</p> </div>
          <div className = {keyClass("g")}> <p className="key-label">g</p> </div>
          <div className = {keyClass("h")}> <p className="key-label">h</p> </div>
          <div className = {keyClass("j")}> <p className="key-label">j</p> </div>
          <div className = {keyClass("k")}> <p className="key-label">k</p> </div>
          </div>
          <div className = "bottom-row-keys">
          <div className = {keyClass("z")}> <p className="key-label">z</p> </div>
          <div className = {keyClass("x")}> <p className="key-label">x</p> </div>
          <div className = {keyClass("c")}> <p className="key-label">c</p> </div>
          <div className = {keyClass("v")}> <p className="key-label">v</p> </div>
          <div className = {keyClass("b")}> <p className="key-label">b</p> </div>
          <div className = {keyClass("n")}> <p className="key-label">n</p> </div>
          <div className = {keyClass("m")}> <p className="key-label">m</p> </div>
          </div>
        </div>
    )


}
export default Keyboard