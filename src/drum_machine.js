import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Container, Col, Row} from 'react-bootstrap';

function DrumMachine(props) {

    const index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const snareKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const kickKeys = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const hatKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]
    const cymbalKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]
   
    
    const [snareSelected, setSnareSelected] = useState(
        ["light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off"]
        )
    const [kickSelected, setKickSelected] = useState(
        ["light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off"]
        )
    const [hatSelected, setHatSelected] = useState(
        ["light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off"]
        )
    const [cymbalSelected, setCymbalSelected] = useState(
        ["light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off"]
        )


    function handleClick(e, instrument) {
        if (instrument==="snare") {
            props.handleSnareClick(e)
            var steps= [...snareSelected]
            const step = e.target.value
            if (steps[step]==="light-off") {
                steps[step] = "light-on"
            }
            else {
                steps[step] = "light-off"
            }
            setSnareSelected(steps)
        }
        else if (instrument==="kick") {
            props.handleKickClick(e)
            var steps= [...kickSelected]
            const step = e.target.value
            if (steps[step]==="light-off") {
                steps[step] = "light-on"
            }
            else {
                steps[step] = "light-off"
            }
            setKickSelected(steps)
        }
        else if (instrument==="hat") {
            props.handleHatClick(e)
            var steps= [...hatSelected]
            const step = e.target.value
            if (steps[step]==="light-off") {
                steps[step] = "light-on"
            }
            else {
                steps[step] = "light-off"
            }
            setHatSelected(steps)
        }
        else {
            props.handleCymbalClick(e)
            var steps= [...cymbalSelected]
            const step = e.target.value
            if (steps[step]==="light-off") {
                steps[step] = "light-on"
            }
            else {
                steps[step] = "light-off"
            }
            setCymbalSelected(steps)
        }
    }
        

    function mapButtons(i, instrument) {
        if (instrument==="snare") {
            return (
                <div key={snareKeys[i]} className="step-switch">
                    <button className="step-button"  value={i} onClick={e => handleClick(e, "snare")}></button>
                    <span className={snareSelected[i]}></span>
                    </div>  
            )     
        }
        else if (instrument==="kick") {
            return (
                <div key={kickKeys[i]} className="step-switch">
                    <button className="step-button" value={i} onClick={e => handleClick(e, "kick")}></button>
                    <span className={kickSelected[i]}></span>
                    </div>  
            )    
        }
        else if (instrument==="hat") {
            return (
                <div key={hatKeys[i]} className="step-switch">
                    <button className="step-button" value={i} onClick={e => handleClick(e, "hat")}></button>
                    <span className={hatSelected[i]}></span>
                    </div>  
            )    
        }
        else {
            return (
                <div key={cymbalKeys[i]} className="step-switch">
                    <button className="step-button" value={i} onClick={e => handleClick(e, "cymbal")}></button>
                    <span className={cymbalSelected[i]}></span>
                    </div>  
            )    
        }
    }


    return (
        <div style={{height:'100%', width:'100%'}}>
            <div style={{display: 'inline-block', height: '100%', width:'100%', border:'2px solid green'}}>
                <div className="d-flex step-row">
                    {index.map((item) => mapButtons(item, "snare"))}
                </div>
                <div className="d-flex step-row">
                    {index.map((item) => mapButtons(item, "kick"))}  
                </div>

                <div className="d-flex step-row">
                    {index.map((item) => mapButtons(item, "hat"))}
                </div>
                <div className="d-flex step-row">
                    {index.map((item) => mapButtons(item, "cymbal"))}
                </div>
            </div>
        </div>
       
    )
}
export default DrumMachine