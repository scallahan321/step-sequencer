import React, { useState } from 'react'
import './App.css';
import Beat from './beat';
import BassSynth from './bass_synth';
import LeadSynth from './lead_synth';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


function App() {

  const [showLeadSynth, setShowLeadSynth] = useState(false)
  const [buttonVariant, setButtonVariant] = useState(['dark', 'outline-dark'])

  // function handleChange() {
  //   if (!showLeadSynth) {
  //     setShowLeadSynth(true)
  //   }
  //   else {
  //     setShowLeadSynth(false)
  //   }
  // }

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
      <div style={{marginBottom:'2rem', marginTop:'1rem'}}>
        <Beat />
      </div>
     
      <div style={{marginBottom:'1rem', marginTop:'1rem'}}>       
        <Button variant={buttonVariant[0]} value='bass' onClick={(e) =>handleClick(e)}>bass synth</Button>
        <Button variant={buttonVariant[1]} value='lead' onClick={(e) => handleClick(e)}>lead synth</Button>
      </div>

      <div style={{marginTop:'1rem'}}>
         {showLeadSynth ? <LeadSynth /> : <BassSynth />}
      </div>
    </div>
   
    
  )

}

export default App;
