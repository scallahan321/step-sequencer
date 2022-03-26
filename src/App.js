import React, { useState } from 'react'
import './App.css';
import Beat from './beat';
import BassSynth from './bass_synth';
import LeadSynth from './lead_synth';
import Button from 'react-bootstrap/Button';


function App() {

  const [showLeadSynth, setShowLeadSynth] = useState(false)
  const [buttonVariant, setButtonVariant] = useState(['dark', 'outline-dark'])
  const [tempo, setTempo] = useState(100)
  const [interval, setInterval] = useState(300)


  function handleSliderChange(e) {
    const val = e.target.value
    setTempo(val)
    setInterval(30000/val)
  }

  function handleClick(e) {
    const val = e.target.value
    if (val==="lead") {
      setButtonVariant(['outline-dark', 'dark'])
      setShowLeadSynth(true)
    }
    else {
      setButtonVariant(['dark', 'outline-dark'])
      setShowLeadSynth(false)
    }
  }


  return (
    <div>
       <p>tempo</p>
        <input style={{width: '50%'}} onChange={(e) => handleSliderChange(e)} type="range" className="custom-range"  min="50" max="170" step="1" defaultValue={100} id="tempoRange"></input>
        <p>{tempo}</p>
        
      <div style={{marginBottom:'2rem', marginTop:'1rem'}}>
        <Beat interval={interval} />
      </div>
     
      <div style={{marginBottom:'1rem', marginTop:'1rem'}}>       
        <Button variant={buttonVariant[0]} size= "lg" value='bass' onClick={(e) =>handleClick(e)}>bass synth</Button>
        <Button variant={buttonVariant[1]} size= "lg" value='lead' onClick={(e) => handleClick(e)}>lead synth</Button>
      </div>

      <div style={{marginTop:'1rem'}}>
         {showLeadSynth ? <LeadSynth interval={interval} /> : <BassSynth />}
      </div>
    </div>
   
    
  )

}

export default App;
