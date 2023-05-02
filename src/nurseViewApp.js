import React, { Component, useState } from 'react'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');

export default class ServiceDetail extends Component {

  
  state = {
    service: null,
    rd: null
  }

  handleType = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value, error:null});
  };
  
  render() {
    return (

      
      
      <div className='box' >
        <div class="title is-2">
          <p>Үйлчлүүлэгчийн эмчилгээний цаг захиалга шалгах хэсэг</p>
        </div>
      <div class="field has-addons has-addons has-addons-centered">
      {/* <div class="control">
      <label className="label">Имэйл:</label>
      </div> */}
      <div className="control ">
        <input className="input" name="rd" type="text" placeholder="РД оруулна уу!"
        onChange={this.handleType}/>
      </div>
      <div class="control">
        <a class="button is-info">
          Хайх
        </a>
      </div>
      </div>
      
        
             
      </div>
    )
  }
}
