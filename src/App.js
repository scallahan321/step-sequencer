import React, { useState } from 'react'
import './App.css';
import Beat from './beat';
import BassSynth from './bass_synth';
import LeadSynth from './lead_synth';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


function App() {

  const [showLeadSynth, setShowLeadSynth] = useState(false)

  function handleChange(e) {
    if (e.target.value==="lead") {
      setShowLeadSynth(true)
    }
    else {
      setShowLeadSynth(false)
    }
  }

  return (
    <div>
      <div style={{marginBottom:'2rem', marginTop:'1rem'}}>
        <Beat />
      </div>
     
     <div style={{marginBottom:'1rem', marginTop:'1rem'}}>
        <Form.Select onChange={e => {handleChange(e)}}  style={{height:'3rem', display:'inline-block'}}>
            <option value="" hidden> Select Synth </option>
            <option value="bass">bass synth</option>
            <option value="lead">lead synth</option>
        </Form.Select> 
     </div>

      <div style={{marginTop:'1rem'}}>
         {showLeadSynth ? <LeadSynth /> : <BassSynth />}
      </div>
    </div>
   
    
  )

}

export default App;
