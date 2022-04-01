import React, { useState } from 'react'
import './App.css';
import Beat from './beat';
import BassSynth from './bass_synth';
import LeadSynth from './lead_synth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container, Col, Row} from 'react-bootstrap';


function App() {

  const [showLeadSynth, setShowLeadSynth] = useState(true)
  const [buttonVariant, setButtonVariant] = useState(['dark', 'outline-dark'])
  const [tempo, setTempo] = useState(100)
  const [interval, setInterval] = useState(300)
  const [clickMessage, setClickMessage] = useState('click-screen-message-hidden')


  function handleSliderChange(e) {
    const val = e.target.value
    setTempo(val)
    setInterval(30000/val)
  }

  function handleChange() {
    setShowLeadSynth(!showLeadSynth)
    setClickMessage('click-screen-message-visible')
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
    <Container fluid className='vh-100 container-main' style={{border: '3px solid blue', backgroundColor:'black'}}>
      <Row style={{height:'10%', paddingTop:'1%'}}>
        <Col lg={12} md={12} sm={12}>
          <h4 className="page-header">React Drums and Synth</h4>
       
        </Col>
      </Row>

      <Row style={{height:'15%', borderTop: '2px solid white', color:'white'}}>
        <Col lg={6} md={6} sm={6}>
          
          <p style={{display:'inline-block', marginTop:'3rem'}}>Set Tempo:&nbsp;</p>
          <input style={{width: '45%', display:'inline-block', marginLeft:'1rem', marginRight:'1rem', paddingTop:'.75rem'}} onChange={(e) => handleSliderChange(e)} type="range" className="custom-range"  min="50" max="170" step="1" defaultValue={100} id="tempoRange"></input> 
          <p style={{display:'inline-block', marginTop:'3rem'}}>&nbsp;{tempo}</p>
          
        </Col>
        <Col lg={6} md={6} sm={6}>
            <div style={{height:'50%', marginTop:'3rem', marginLeft:'8rem'}}>
              <p style={{display:'inline-block', marginRight:'1rem'}}>Toggle Synth:</p>
              <p style={{display:'inline-block'}}>Lead</p>
              
              <div class="custom-control custom-switch" style={{display:'inline-block', marginLeft:'.75rem'}} >
                <input type="checkbox" style={{display:'inline-block'}} class="custom-control-input" id="customSwitch1" onChange={handleChange}></input>
                <label class="custom-control-label" style={{display:'inline-block'}} for="customSwitch1">Bass</label>
              </div> 
              <p className={clickMessage}>Click anywhere on screen to register change</p>
              </div>

           
          
        </Col>

      </Row>
      <Row style={{height:'70%', marginTop:'1%'}}>
        {/* <Col lg={1} md={1} sm={1} style={{height:'100%',border: '2px solid blue'}}>
          <div style={{height:'10%'}}></div>
          <div style={{display:'block',height:'90%', border:'2px solid green'}}>
            <div style={{display:'block', height:'23%',width:'100%', marginTop:'10%', border:'2px dotted grey'}}><p style={{height:'60%'}}>snare</p></div>
            <div style={{display:'block', height:'23%',width:'100%',marginTop:'10%', border:'2px dotted grey'}}><p style={{height:'60%'}}>kick</p></div>
            <div style={{display:'block', height:'23%',width:'100%',marginTop:'10%', border:'2px dotted grey'}}><p style={{height:'60%'}}>hi hat</p></div>
            <div style={{display:'block', height:'23%',width:'100%',marginTop:'10%', border:'2px dotted grey'}}><p style={{height:'60%'}}>cymbal</p></div>
          </div>
            
        </Col> */}
        <Col lg={7} md={7} sm={12} >
          <div className="bg-dark" style={{height:'95%', marginBottom:'1%'}}>
          
            <Beat interval={interval}/>
          </div>
          
        </Col>
        <Col lg={5} md={5} sm={12}>
          
        

          <div className="bg-dark" style={{height:'95%', marginBottom:'1%',  borderRadius:'7px'}}>
            {showLeadSynth ? 
              <div style={{height:'100%'}}>
              <h2 className="synth-title bg-dark">Lead Synth</h2>
              <div className='bg-dark' style={{height: '70%'}}>
             <LeadSynth interval={interval}/>
             </div>
             </div> :
             <div style={{height:'100%'}}>
              <h2 className="synth-title bg-dark">Bass Synth</h2>
              <div className='bg-dark' style={{height: '70%'}}>
             <BassSynth interval={interval}/>
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
