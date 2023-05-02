import React, { Component, useState } from 'react'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const utc = require('dayjs/plugin/utc');

export default class ServiceDetail extends Component {

  
  state = {
    service: null,
    serviceName: null,
    time: null,
    timeID: null,
    userId: null,
    setOpen: null
  }

  // dialgol

  handleClickOpen = () => {
    this.setState({
      setOpen: true
    })
  };

  handleClose = () => {
    this.setState({
      setOpen: false
    })
  };

  handleChange = (event) => {
    this.setState({serviceName:null, time: null})
    if(event.target.value!="")
    this.setState({serviceName:event.target.value, time: null});
  };

  clickButton = () => {
    console.log(this.state.timeID)
    axios.post('http://134.209.96.67:7575/api/v1/appointments', {
      
          Avappointment_id: this.state.timeID,
          user_id: this.state.userId

        }).then((result) => {
          this.setState({serviceName: null, time: null, timeID: null, setOpen: true})
      }).catch((err)=>{
          console.log(err);
        });
  };

  //&app_date[$gte]=2023-05-02T09:00:00.000Z&app_date[$lt]=2023-05-02T18:00:00.000Z
  handleCalendarChange = (date) => {
    this.setState({timeID:null, time: null});
    const a = dayjs(date).format('YYYY-MM-DD')
    console.log(a+this.state.serviceName);
      const token = localStorage.getItem("token");
      axios.get(`http://134.209.96.67:6565/api/v1/av_appointment/is_app?is_app=false&app_date[$gte]=${a}T09:00:00.000Z&app_date[$lt]=${a}T18:00:00.000Z&ServiceName=${this.state.serviceName}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((result) => {
        this.setState({time: result.data.data})
        console.log(this.state.time)
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
    axios.get("http://134.209.96.67:4545/api/v1/users/getuserid",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result) => {
      this.setState({userId: result.data.userid})
  }).catch((err)=>{
      console.log(err);
    });
  }
  render() {
    return (
      
      <div className='box' >

        <div className="title is-2">
          <p>Цаг захиалах хэсэг</p>
        </div>

        <h1>Үйлчилгээ сонгоно уу:</h1>
        <div class="select is-link is-large">
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


        {this.state.timeID && (
          <div className='container'>
            <div className="buttons">
              <button className="button is-success" onClick={this.clickButton}>Захиалах</button>
            </div>
        </div>
        )}
        
        <Dialog
        open={this.state.setOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Цаг захиалга амжилттай боллоо"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-title">
            Та "Захиалсан цаг" цэсээс захиалгаа харна уу!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} autoFocus>
            ОК
          </Button>
        </DialogActions>
      </Dialog>
             
      </div>
    )
  }
}
