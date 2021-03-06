import React from 'react'

import { Slider } from './components/Slider'
import { SlideSmooth as Slide } from './components/SlideSmooth'
import { SlideStep as SlideAlt } from './components/SlideStep'
import { Content } from './components/Content'
import { Reveal } from './components/Reveal'
import { Slide6 } from './components/slides/Slide6'
import { Room } from './components/slides/Room'

import './App.css'

function App() {
  return (
    <Slider slideSize={5}>
      <Slide>
        {range => <Content range={range}>Slide 1</Content>}
      </Slide>
      <Slide>
        <h3>Slide 2</h3>
        <p><small>no progress bar on top</small></p>
      </Slide>
      <Slide>
        {range => <Content range={range} scaleIn>Slide 3</Content>}
      </Slide>
      <Slide>
        {range =>
          <Content range={range} scaleIn fullSize>
            {progress => <Room progress={progress} />}
          </Content>
        }
      </Slide>
      <Slide>
        {range => <Content range={range}>Slide 5</Content>}
      </Slide>
      <Slide>
        {range =>
          <Reveal range={range} itemCount={4}>
            {item => <Slide6 active={item} />}
          </Reveal>
        }
      </Slide>
      <Slide>
        {range => <Content range={range}>Slide 7</Content>}
      </Slide>
      <SlideAlt>Slide 8</SlideAlt>
      <SlideAlt>Slide 9</SlideAlt>
      <SlideAlt>Slide 10</SlideAlt>
    </Slider>
  )
}

export default App
