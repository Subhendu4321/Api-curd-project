import React,{Component, useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Router from 'next/router';


const useStyles = makeStyles({
    root: {
        backgroundColor: '#fff',
        minHeight: '381px',
        width: '400px',
        margin: '40px auto'
    },
    button: {
        margin:'10px'
    },
    ButtonClass:{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        
    }    
    
  });

export default function UpdateForm() {
    
    const [name,setName] = useState("");
    const [salary,setSalary] = useState("");
    const [age,setAge] = useState("");

    const classes = useStyles();  
    
    const router = useRouter();
    const id = router.query;
        
  
    
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
    const updateEmployeeData = () =>{
      axios.put(`http://dummy.restapiexample.com/api/v1/update/${id}`,{"name":name,"salary":salary,"age":age})
      .then(res => {
          console.log(res);
          console.log(res.data.data);
          
      })
      Router.push("/")
      
    }
    const handleClose = () =>{
      Router.push("/")
    }

    
    return (
        <>
          <Card className={classes.root}>
              <CardHeader className={classes.Header} title="Update Profile" >
              
              </CardHeader>
              <CardContent>
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
          
            
                <div className={classes.ButtonClass}>
                    <Button variant="contained" color="primary" className={classes.button} type="submit" style={{padding:9}} onClick={handleClose}>
                    Cancel
                    </Button>
                    <Button  variant="contained" color="primary" className={classes.button} type="submit" style={{padding:9}} onClick={updateEmployeeData}>
                    Submit
                    </Button>
                </div>
              </CardContent>
          </Card>
        </>
         
      
    );
  }