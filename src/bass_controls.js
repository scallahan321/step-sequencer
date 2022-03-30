import './App.css';
import React, { useState } from 'react';
import BassKeyboard from "./bass_keyboard"

function BassControls(props) {

    const keys = ['a_flat', 'a', 'b_flat', 'b', 'c', 'c_sharp', 'd', 'e_flat', 'e', 'f', 'f_sharp', 'g']
    const keyLabels = ['Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G']
    // currentKey will work as an index of keys. starting at 4 for C
    const [currentKey, setCurrentKey] = useState(4)

    function keyChange(e) {
        const direction = e.target.value
        if (direction==="up") {
            if (currentKey===11){
                const new_index = 0
                props.handleKeyChange(keys[new_index])
                setCurrentKey(new_index)
            } 
            else {
                const new_index = currentKey + 1
                props.handleKeyChange(keys[new_index])
                setCurrentKey(new_index)
            }  
        }
        else {
            if (currentKey===0) {
                const new_index = 11
                props.handleKeyChange(keys[new_index])
                setCurrentKey(new_index)
            }
            else {
                const new_index = currentKey - 1
                props.handleKeyChange(keys[new_index])
                setCurrentKey(new_index)
            }
        }
    }

    return (
        <div style={{height:'100%', width:'100%'}}>
            <div className="bass-top-panel">
                <div style={{display:'inline-block', verticalAlign: 'top', height:'100%', width:'30%'}}>
                    <p style={{fontWeight: 'bold', color:'white', height:'25%', marginTop:'3%', textAlign:'center'}}>Shift Key</p>
                    <div style={{height: '70%', marginBottom:'5rem'}}>
                        <button value="up" onClick={(e) => keyChange(e)} style={{display:'inline-block', height:'60%', width:'40%', marginLeft:'7.5%', marginRight:'5%', overflow: 'hidden'}}>Up</button>
                        <button value="down" onClick={(e) => keyChange(e)} style={{display:'inline-block', height:'60%', width:'40%', overflow: 'hidden'}}>Down</button>
                    </div> 
                </div>
                <div style={{display:'inline-block', verticalAlign: 'top', height:'100%', width:'40%'}}>
                    <p style={{fontWeight: 'bold', color:'white', height:'25%', marginTop:'3%', textAlign:'center'}}>Toggle Effects</p>
                    <div style={{display: 'inline-block', verticalAlign: 'top', height:'100%', width:'50%'}}>
                        <button className={props.distButtonClass} onClick={props.toggleDistortion}>Distortion</button>
                    </div>
                </div>
            </div>
            <div>
                <div style={{color:'white',fontWeight: 'bold', marginTop:'10%', textAlign:'center'}}>
                    Use your keyboard to play notes
                </div>
                <div style={{marginTop:'7%', marginLeft:'10%'}}>
                    <BassKeyboard tones={props.tones}/>
                </div>
                
            </div>
        </div>
    )
}

export default BassControls