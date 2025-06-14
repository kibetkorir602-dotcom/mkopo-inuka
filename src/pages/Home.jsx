import React, { } from 'react'
import Featured from '../components/Featured/Featured';
import Slider from '../components/Slider/Slider';
import JobsFlyer from '../components/JobsFlyer/JobsFlyer';
import Services from '../components/Services/Services';
import Newsletter from '../components/Newsletter/Newsletter';
import AppHelmet from './AppHelmet';

export default function Home() {
  return (
    <div className='Home'>
      <AppHelmet title={"MKOPO INUKA"} />
      <Slider />
      <h1 id='services'>What we offer:</h1>
      <Services />
      <Featured />
      <JobsFlyer />
      <Newsletter />
    </div>
  )
}
