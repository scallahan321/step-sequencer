import React, { useState, useEffect } from 'react';
import { useHotkeys, isHotkeyPressed } from 'react-hotkeys-hook';
import Button from 'react-bootstrap/Button';

function LeadKeyboard(props) {


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

    useHotkeys('a', () => pressKey(0), {keydown:true}, [props.tones]);
    useHotkeys('a', () => releaseKey(0), {keyup:true}, [props.tones]);   
    useHotkeys('s', () => pressKey(1), {keydown:true}, [props.tones]);
    useHotkeys('s', () => releaseKey(1), {keyup:true}, [props.tones]);
    useHotkeys('d', () => pressKey(2), {keydown:true}, [props.tones]);
    useHotkeys('d', () => releaseKey(2), {keyup:true}, [props.tones]);
    useHotkeys('f', () => pressKey(3), {keydown:true}, [props.tones]);
    useHotkeys('f', () => releaseKey(3), {keyup:true}, [props.tones]);
    useHotkeys('g', () => pressKey(4), {keydown:true}, [props.tones]);
    useHotkeys('g', () => releaseKey(4), {keyup:true}, [props.tones]);
    useHotkeys('h', () => pressKey(5), {keydown:true}, [props.tones]);
    useHotkeys('h', () => releaseKey(5), {keyup:true}, [props.tones]);
    useHotkeys('j', () => pressKey(6), {keydown:true}, [props.tones]);
    useHotkeys('j', () => releaseKey(6), {keyup:true}, [props.tones]);
    useHotkeys('q', () => pressKey(7), {keydown:true}, [props.tones]);
    useHotkeys('q', () => releaseKey(7), {keyup:true}, [props.tones]);
    useHotkeys('w', () => pressKey(8), {keydown:true}, [props.tones]);
    useHotkeys('w', () => releaseKey(8), {keyup:true}, [props.tones]);
    useHotkeys('e', () => pressKey(9), {keydown:true}, [props.tones]);
    useHotkeys('e', () => releaseKey(9), {keyup:true}, [props.tones]);
    useHotkeys('r', () => pressKey(10), {keydown:true}, [props.tones]);
    useHotkeys('r', () => releaseKey(10), {keyup:true}, [props.tones]);
    useHotkeys('t', () => pressKey(11), {keydown:true}, [props.tones]);
    useHotkeys('t', () => releaseKey(11), {keyup:true}, [props.tones]);
    useHotkeys('y', () => pressKey(12), {keydown:true}, [props.tones]);
    useHotkeys('y', () => releaseKey(12), {keyup:true}, [props.tones]);
    useHotkeys('u', () => pressKey(13), {keydown:true}, [props.tones]);
    useHotkeys('u', () => releaseKey(13), {keyup:true}, [props.tones]);
    useHotkeys('i', () => pressKey(14), {keydown:true}, [props.tones]);
    useHotkeys('i', () => releaseKey(14), {keyup:true}, [props.tones]);


    return (
        <div style={{border: "2px dotted purple"}}>
          <div className = "effects">
            {/* <Button variant="secondary" onClick={props.turnDelayOn}>test add delay</Button>
            <Button variant="secondary" onClick={props.turnDelayOff}>test remove delay</Button> */}
            <Button variant="secondary" onClick={props.toggleDelay}>toggle delay</Button>
            <Button variant="secondary" onClick={props.toggleReverb}>toggle reverb</Button>
          </div>
          <div className = "top-row-keys">
            <div className = {keyClass("q")}> <p className="key-label">q</p> </div>
            <div className = {keyClass("w")}> <p className="key-label">w</p> </div>
            <div className = {keyClass("e")}> <p className="key-label">e</p> </div>
            <div className = {keyClass("r")}> <p className="key-label">r</p> </div>
            <div className = {keyClass("t")}> <p className="key-label">t</p> </div>
            <div className = {keyClass("y")}> <p className="key-label">y</p> </div>
            <div className = {keyClass("u")}> <p className="key-label">u</p> </div>
            <div className = {keyClass("i")}> <p className="key-label">i</p> </div>
          </div>
          <div className = "middle-row-keys">
            <div className = {keyClass("a")}> <p className="key-label">a</p> </div>
            <div className = {keyClass("s")}> <p className="key-label">s</p> </div>
            <div className = {keyClass("d")}> <p className="key-label">d</p> </div>
            <div className = {keyClass("f")}> <p className="key-label">f</p> </div>
            <div className = {keyClass("g")}> <p className="key-label">g</p> </div>
            <div className = {keyClass("h")}> <p className="key-label">h</p> </div>
            <div className = {keyClass("j")}> <p className="key-label">j</p> </div>
          </div>
        </div>
    )
}
export default LeadKeyboard