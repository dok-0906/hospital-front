import React, { Component } from 'react'
import axios from 'axios'
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
const utc = require('dayjs/plugin/utc');
export default class myAppointments extends Component {

    state = {
        token: null,
        t: null,
        ta: null,
        timeID: null,
        res: null,
        isOpen: null,
        error: null,
        setOpen: null
      }
      // update xiix dialgol

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

      constructor() {
        super()
        this.state = {
          isOpen: false
        }
      }
      changeApp = () => {
        this.setState({
          isOpen: true
        })
      }
    
      openBox = () => {
        this.setState({
          isOpen: true
        })
      }
    
      closeBox = () => {
        this.setState({
          isOpen: false
        })
      }
      deleteBox = () => {
        const token = localStorage.getItem("token");
        axios.delete(`http://134.209.96.67:7575/api/v1/appointments/${this.state.timeID}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((result) => {
            this.setState({res: "amjilttai", setOpen: false, error: "Амжилттай"});
            window.location.reload();
      }).catch((err)=>{
          console.log(err);
        });
      }

    componentDidMount = () => {
        const token = localStorage.getItem("token");
        axios.get("http://134.209.96.67:7575/api/v1/appointments/getUser",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((result) => {
            this.setState({t: result.data.data})
          console.log(this.state.t);
      }).catch((err)=>{
          console.log(err);
        });
      }

  render() {
    return (
        
      <div className='box'>
        <div class="title is-2">
          <p>Таны захиалсан цаг</p>
        </div>
        {this.state.res && (
        <div className="notification is-warning">{this.state.error}</div>
      )}
        {this.state.t && (
          <div className="container">
          
          {this.state.t?.map((el) => (
            <div className="notification has-background-link-light">
            <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="subtitle is-5">
                  <strong> Та {dayjs(el.app_date).format('YYYY-MM-DD')} ны өдрийн {dayjs.extend(utc)}{dayjs.utc(el.app_date).format('HH:mm')}-цагт</strong> {el.ServiceName} <strong>хийлгэх цаг захиалсан байна</strong>
                </p>
              </div>
            </div>
            <div class="level-right">
            <p class="level-item"><a class="button is-link" onClick={() => this.changeApp(this.setState({ timeID: el._id}))}>Өөрчлөх</a></p>
              <p class="level-item"><a class="button is-danger" onClick={() => this.handleClickOpen(this.setState({ timeID: el._id}))}>Цуцлах</a></p>
            </div>
          </nav>
          </div> 
          ))}
                  
                    
          </div>
        )}

    <div>
        {this.state.isOpen && (
          <>
            <ReactDialogBox
              closeBox={this.closeBox}
              modalWidth='25%'
              headerBackgroundColor='red'
              headerTextColor='white'
              headerHeight='65'
              closeButtonColor='white'
              bodyBackgroundColor='white'
              bodyTextColor='black'
              bodyHeight='100px'
              headerText='Цаг захиалгыг устгахдаа итгэлтэй байна уу?'
            >
              <nav class="level">
              <div class="level-right">
              <p class="level-item"><a class="button is-success" onClick={this.deleteBox}>Тийм</a></p>
              <p class="level-item"><a class="button is-danger" onClick={this.closeBox}>Буцах</a></p>
              </div>
              </nav>
            </ReactDialogBox>
          </>
        )}
      </div>

      <div>
      <Dialog
        open={this.state.setOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Цаг захиалгыг устгах уу?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Та цаг захиалгыг устгахдаа итгэлтэй байна уу?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Үгүй</Button>
          <Button onClick={this.deleteBox} autoFocus>
            Тийм
          </Button>
        </DialogActions>
      </Dialog>
    </div>
             
      </div>
    )
  }
}
