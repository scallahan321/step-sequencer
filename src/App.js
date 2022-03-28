import React, { useState } from 'react'
import './App.css';
import Beat from './beat';
import BassSynth from './bass_synth';
import LeadSynth from './lead_synth';
import Button from 'react-bootstrap/Button';
import {Container, Col, Row} from 'react-bootstrap';


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
    <Container fluid className='vh-100' style={{border: '3px solid pink'}}>
      <Row style={{height:'10%', marginTop:'5%'}}>
        <Col lg={6}>
        <p>tempo</p>
        <input style={{width: '80%'}} onChange={(e) => handleSliderChange(e)} type="range" className="custom-range"  min="50" max="170" step="1" defaultValue={100} id="tempoRange"></input>
        <p>{tempo}</p>
        </Col>
        <Col lg={6}>
        <div style={{marginBottom:'1rem', marginTop:'1rem'}}>       
            <Button variant={buttonVariant[0]} size= "lg" value='bass' onClick={(e) =>handleClick(e)}>bass synth</Button>
            <Button variant={buttonVariant[1]} size= "lg" value='lead' onClick={(e) => handleClick(e)}>lead synth</Button>
          </div>
        </Col>
      </Row>
      <Row style={{height:'70%', marginTop:'5%'}}>
        <Col lg={1} md={1} style={{height:"100%", border: '2px solid blue'}}>
          <div style={{height:'25%', width:'100%', border:'2px dotted grey'}}><p>snare</p></div>
          <div style={{height:'25%', width:'100%', border:'2px dotted grey'}}><p>kick</p></div>
          <div style={{height:'25%', width:'100%', border:'2px dotted grey'}}><p>hi hat</p></div>
          <div style={{height:'25%', width:'100%', border:'2px dotted grey'}}><p>cymbal</p></div>
        </Col>
        <Col lg={6} md={6} style={{height:'100%', border: '2px dotted green'}}>
          <Beat interval={interval}/>
        </Col>
        <Col lg={5} md={6}>
          <div style={{height: '75%', border:'2px solid green'}}>
          {/* {showLeadSynth ? <LeadSynth interval={interval} /> : <BassSynth />} */}
          <LeadSynth interval={interval} />
          </div>
        </Col>
      </Row>
        
      
    
    </Container>
   
    
  )

}

export default App;
