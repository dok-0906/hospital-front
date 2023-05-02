import React, { Component, useState } from 'react'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc');

export default class ServiceDetail extends Component {

  
  state = {
    service: null,
    rd: null,
    t: null
  }

  handleType = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value, error:null});
  };

  handleChange = (event) => {
    this.setState({serviceName:null, time: null})
    if(event.target.value!="")
    this.setState({serviceName:event.target.value, time: null});
  };
  handleCalendarChange = (date) => {
    this.setState({timeID:null, time: null, t: null});
    const a = dayjs(date).format('YYYY-MM-DD')
    console.log(a+this.state.serviceName);
      const token = localStorage.getItem("token");
      // ${a}
      axios.get(`http://134.209.96.67:6565/api/v1/av_appointment/is_app?ServiceName=${this.state.serviceName}&app_date[$gte]=${a}T00:00:00.000Z&app_date[$lt]=${a}T23:59:00.000Z`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((result) => {
        // this.setState({time: result.data.data})
        console.log(result.data.data);
        this.setState({t: result.data.data})
        // this.setState({service: result.data.data})
    }).catch((err)=>{
        console.log(err);
      });
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    axios.get("http://134.209.96.67:3535/api/v1/service",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result) => {
      // console.log(result.data.data)
      this.setState({service: result.data.data})
  }).catch((err)=>{
      console.log(err);
    });

    //Get user ID 
  //   axios.get("http://134.209.96.67:4545/api/v1/users/getuserid",{
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((result) => {
  //     this.setState({userId: result.data.userid})
  // }).catch((err)=>{
  //     console.log(err);
  //   });
  }
  
  render() {
    return (

      
      
      <div className='box' >
        <div class="title is-2">
          <p>Үйлчлүүлэгчийн эмчилгээний цаг захиалга өөрчлөх хэсэг</p>
        </div>
      
        <h1>Үйлчилгээ сонгоно уу:</h1>
        <div class="select is-link is-medium">
          <select onChange={this.handleChange}>
          <option></option>
          {this.state.service?.map((el) => (
          <option>{el.ServiceName}</option>
        ))}
          </select>
        </div>
        {this.state.serviceName && (
          <div className='container'>
          <h1>Өдөрөө сонгоно уу:</h1>
          <Calendar  onChange={this.handleCalendarChange}/>
        </div>
        )} 

        {this.state.time && (
          <div className="columns is-multiline">
            
          {this.state.time?.map((el) => (
            
            <div className="column is-one-eighther">
              <div className="buttons">
                <button className="button is-info" onClick={() => this.setState({ timeID: el._id})}>{dayjs.extend(utc)}{dayjs.utc(el.app_date).format('HH:mm')}</button>
              </div>
             </div>
          ))}
        
        </div>
        )}

{this.state.t && (
          <div className="container">
          
          {this.state.t?.map((el) => (
            <div className="notification has-background-link-light">
            <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="subtitle is-5">
                  <strong> Та {dayjs(el.app_date).format('YYYY-MM-DD')} ны өдрийн {dayjs.extend(utc)}{dayjs.utc(el.app_date).format('HH:mm')}-цагын</strong> {el.ServiceName} <strong>хийлгэх цаг захиалга засах боломжтой байна</strong>
                </p>
              </div>
            </div>
            <div class="level-right">
            <p class="level-item"><a class="button is-link" onClick={() => this.changeApp(this.setState({ timeID: el._id}))}>Өөрчлөх</a></p>
              <p class="level-item"><a class="button is-danger" onClick={() => this.handleClickOpen(this.setState({ timeID: el._id}))}>Устгах</a></p>
            </div>
          </nav>
          </div> 
          ))}
                  
                    
          </div>
        )} 
      
        
             
      </div>
    )
  }
}
