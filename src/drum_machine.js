import React, { useState, useEffect } from 'react';

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


    useEffect(() => {
        if (props.cleared) {
            setSnareSelected(["light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off"])
            setKickSelected(["light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off"])
            setHatSelected(["light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off"])
            setCymbalSelected(["light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off", "light-off"])   
        }
    }, [props.cleared])


    function handleClick(e, instrument) {
        var steps;
        if (instrument==="snare") {
            props.handleSnareClick(e)
            steps= [...snareSelected]
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
            steps= [...kickSelected]
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
            steps= [...hatSelected]
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
            steps= [...cymbalSelected]
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
                        <button className={props.stepClass[i]} disabled={props.isRunning}  value={i} onClick={e => handleClick(e, "snare")}></button>
                        <span className={snareSelected[i]}></span>  
                    </div>  
            )     
        }
        else if (instrument==="kick") {
            return (
                <div key={kickKeys[i]} className="step-switch">
                    <button className={props.stepClass[i]} disabled={props.isRunning} value={i} onClick={e => handleClick(e, "kick")}></button>
                    <span className={kickSelected[i]}></span>
                </div>  
            )    
        }
        else if (instrument==="hat") {
            return (
                <div key={hatKeys[i]} className="step-switch">
                    <button className={props.stepClass[i]} disabled={props.isRunning} value={i} onClick={e => handleClick(e, "hat")}></button>
                    <span className={hatSelected[i]}></span>
                </div>  
            )    
        }
        else {
            return (
                <div key={cymbalKeys[i]} className="step-switch">
                    <button className={props.stepClass[i]} disabled={props.isRunning} value={i} onClick={e => handleClick(e, "cymbal")}></button>
                    <span className={cymbalSelected[i]}></span>
                </div>  
            )    
        }
    }


    return (
        <div style={{height:'100%', width:'100%'}}>
            <div style={{display: 'inline-block', height: '100%', width:'100%'}}>
                <div style={{color:'white',fontWeight: 'bold', fontSize:'.9rem', marginTop:'1%', textAlign:'center'}}>
                        Click boxes to turn drum sounds on and off, then hit play to start play the beat
                </div> 
                <div className="d-flex step-row">
                    <p style={{display:'inline-block', width:'10%', marginTop:'3.5%', marginLeft:'1%', color:'white', fontWeight:'bold'}}>snare</p>
                    {index.map((item) => mapButtons(item, "snare"))}
                </div>
                <div className="d-flex step-row">
                    <p style={{display:'inline-block', width:'10%', marginTop:'3.5%',marginLeft:'1%',  color:'white', fontWeight:'bold'}}>kick</p>
                    {index.map((item) => mapButtons(item, "kick"))}  
                </div>
                <div className="d-flex step-row">
                    <p style={{display:'inline-block', width:'10%',marginTop:'3.5%',marginLeft:'1%',  color:'white', fontWeight:'bold'}}>hihat</p>
                    {index.map((item) => mapButtons(item, "hat"))}
                </div>
                <div className="d-flex step-row">
                    <p style={{display:'inline-block', width:'10%',marginTop:'3.5%',marginLeft:'1%',  color:'white', fontWeight:'bold'}}>crash</p>
                    {index.map((item) => mapButtons(item, "cymbal"))}
                </div>
            </div>
        </div>
    )
}

export default DrumMachine