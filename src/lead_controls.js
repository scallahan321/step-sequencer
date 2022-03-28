import './App.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form'


function LeadControls(props) {

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
            <div className='select-key' style={{display:'block',height:'25%', width:'100%'}}>
                <div style={{height:'100%', width:'30%',marginLeft:'70%', border:'2px dotted purple'}}>
                <h5 style={{display:'block', height:'25%',marginTop:'5%', textAlign:'center'}}>Shift Key</h5>
                <button value="up" onClick={(e) => keyChange(e)} style={{display:'inline-block', height:'50%', width:'40%', marginLeft:'7.5%', marginRight:'5%', overflow: 'hidden'}}>Up</button>
                <button value="down" onClick={(e) => keyChange(e)} style={{display:'inline-block', height:'50%', width:'40%', overflow: 'hidden'}}>Down</button>
            </div>
            </div>

            {/* <Form.Select onChange={e => props.handleKeyChange(e)} disabled={props.keyFormDisabled}  style={{height:'3rem', display:'inline-block'}}>
                    <option value="" hidden> Select Key </option>
                   {props.dropdownValues.map((item) => <option key = {item.label} value={item.value}>{item.label}</option>)}
                </Form.Select>   */}
            <br></br>
            <br></br>
            <Button variant={props.toggleDelayVariant} size= "lg" value="delay" onClick={props.toggleDelay}>toggle delay</Button>
                <Form.Select onChange={e => {props.handleDelayChange(e)}} disabled={props.delayFormDisabled}  style={{height:'3rem', display:'inline-block'}}>
                    <option value="" hidden> delay division </option>
                    <option value = "quarter">quarter note</option>
                    <option value= "eighth">eighth note</option>
                    <option value = "dotted eighth">dotted eighth</option>
                    <option value = "sixteenth">sixteenth note</option>
                </Form.Select>  
                <Button variant={props.delayDivisionVariant} size= "lg" value={props.delayDivision} onClick={props.handleDelaySubmit}>update delay</Button>
                <Button variant={props.toggleReverbVariant} size= "lg" value= "reverb" onClick={props.toggleReverb}>toggle reverb</Button>
        </div>
    )
}

export default LeadControls