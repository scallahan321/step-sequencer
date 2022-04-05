import React, { useState } from 'react'
import './App.css';
import Beat from './beat';
import BassSynth from './bass_synth';
import LeadSynth from './lead_synth';
import {Container, Col, Row} from 'react-bootstrap';
import Pizzicato from 'pizzicato';


function App() {
  const [showLeadSynth, setShowLeadSynth] = useState(true)
  const [tempo, setTempo] = useState(100)
  const [interval, setInterval] = useState(300)
  const [muteButtonClass, setMuteButtonClass] = useState('mute-button')
  const [muteMessageClass, setMuteMessageClass] = useState('mute-message-hidden')
  const [muteButtonText, setMuteButtonText] = useState('Mute All Sounds')


  function killSound() {
    Pizzicato.volume = 0
    setMuteButtonClass('mute-button-clicked')
    setMuteMessageClass('mute-message-visible')
    setMuteButtonText('Sound Muted')
  }

  function handleSliderChange(e) {
    const val = e.target.value
    setTempo(val)
    setInterval(30000/val)
  }

  function handleClick() {
    setShowLeadSynth(!showLeadSynth)
  }

  return (
    <Container fluid className='vh-100 container-main' style={{backgroundColor:'black'}}>
      <Row style={{height:'10%', paddingTop:'0.5rem'}}>
        <Col style={{height:'100%', width:'100%'}} lg={4} md={4} sm={12}>
            <button className={muteButtonClass} onClick={killSound}>{muteButtonText}</button>
            <p className={muteMessageClass}>Refresh browser to resume</p>
        </Col>  
        <Col lg={8} md={8} sm={12}>
          <h4 className="page-header">React Drum Sequencer and Synth</h4>
          <p style={{color:'white', textAlign:'right'}}>Made by Sean Callahan</p>
        </Col>
      </Row>
      <Row style={{height:'12%', color:'white'}}>
        <Col style={{height:'100%', width:'100%'}} lg={7} md={7} sm={12}>
          <div style={{display:'block', height:'100%', width:'48%', marginLeft:'.5rem'}}>
            <p style={{display:'inline-block', marginTop:'1rem'}}>Set Tempo:&nbsp;</p>
            <input style={{width: '60%', display:'inline-block', marginLeft:'1rem', marginRight:'1rem', paddingTop:'.75rem'}} onChange={(e) => handleSliderChange(e)} type="range" className="custom-range"  min="50" max="170" step="1" defaultValue={100} id="tempoRange"></input> 
            <p style={{display:'inline-block', marginTop:'3rem'}}>&nbsp;{tempo}</p>
          </div>
        </Col>
      </Row>
      <Row style={{height:'75%', marginTop:'1%'}}>
        <Col lg={7} md={7} sm={12} >
          <div className="bg-dark" style={{height:'95%', marginBottom:'1%', borderRadius:'3px', border:'.5px solid #919599'}}>
            <Beat interval={interval}/>
          </div>
        </Col>
        <Col lg={5} md={5} sm={12}>
          <div className="bg-dark" style={{height:'95%', marginBottom:'1%', borderRadius:'3px', border:'.5px solid #919599'}}>
            {showLeadSynth ? 
              <div style={{height:'100%'}}>
              <h2 className="synth-title bg-dark">Lead Synth</h2>
              <div style={{marginLeft:'16rem', display:'inline-block'}}><button onClick={handleClick}>Toggle Synth</button></div>
              <div className='bg-dark' style={{height: '70%'}}>
             <LeadSynth interval={interval} handleClick={handleClick}/>
             </div>
             </div> :
             <div style={{height:'100%'}}>
              <h2 className="synth-title bg-dark">Bass Synth</h2>
              <div style={{marginLeft:'16rem', display:'inline-block'}}><button onClick={handleClick}>Toggle Synth</button></div>
              <div className='bg-dark' style={{height: '70%'}}>
             <BassSynth interval={interval} handleClick={handleClick}/>
             </div>
             </div>
          }
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default App;
