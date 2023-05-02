import React, { Component, useState } from 'react'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');

export default class ServiceDetail extends Component {

  
  state = {
    service: null,
    serviceName: null,
    time: null,
    timeID: null,
    userId: null
  }
  
  render() {
    return (
      
      <div className='box' >

        <p>nurse root</p>
        
             
      </div>
    )
  }
}
