import React,{Component, useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {postEmployeeDta} from '../EndPiont';
import axios from 'axios';

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [name,setName] = useState("");
    const [salary,setSalary] = useState("");
    const [age,setAge] = useState("");

    
    
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      props.onEdit()
    };
    const handleName = (e) => {
      setName(e.target.value);
      
    };
    const handleSalary = (e) => {
      setSalary(e.target.value);
    };
    const handleAge = (e) =>{
      setAge(e.target.value);
    };
    const postData = {"name":name,"salary":salary,"age":age};

    // const submitEmployeeData = (event) =>{
    //   event.preventDefault();
    // }
    // useEffect(() =>{
    //   postEmployeeDta().then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })
    // },[]);
    const postEmployeeDta = () =>{
      axios.post(`http://dummy.restapiexample.com/api/v1/create`,{"name":name,"salary":salary,"age":age})
      .then(res => {
          console.log(res);
          console.log(res.data);
          
      })
      {handleClose}
    }

    
    return (
      
        <Dialog open={props.isopen} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
          <DialogContent>
            
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              onChange={handleName}
              
            />
            <TextField
              autoFocus
              margin="dense"
              id="salary"
              label="Salary"
              type="text"
              fullWidth
              onChange={handleSalary}
            />
            <TextField
              autoFocus
              margin="dense"
              id="age"
              label="Age"
              type="text"
              fullWidth
              onChange={handleAge}             
            />
            
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button  color="primary" onClick={postEmployeeDta}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      
    );
  }