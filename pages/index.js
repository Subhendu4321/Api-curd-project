import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React, {useState,useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import {getEmployeeDetails} from "../EndPiont";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FormDialog from './Dialog';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';



const useStyles = makeStyles({
  heading: {
    width: '100%',
    marginTop:80,
    marginLeft:50,
    marginBottom:10
  },
  tableHead:{
    fontSize:'large',
    fontWeight:'bold'
  },
  
  DeleteIcon:{
    marginLeft:7,
    color:'red'
    
  },
  EditIcon:{
    color:'#f5c542'
    
  },
  addButton:{
    marginLeft:800
  }
});



export default function App(){
  const classes = useStyles();
  const [empDetails,setEmpDetails] = useState([]);
  const [name,setName] = useState("");
  const [salary,setSalary] = useState("");
  const [age,setAge] = useState("");

  const [isopen,setIsopen] = useState(false);


  const doEdit =() =>{
    setIsopen(!isopen);

  };
  const handleClose = (e) => {
    setIsopen(!isopen);
    e.preventDefault();
    axios.post(`http://dummy.restapiexample.com/api/v1/create`, {"name": name, "salary":salary, "age": age })
        .then(res => {
            
            console.log(res.data.data)
            const newEmployee = {employee_name: res.data.data.name, employee_salary: res.data.data.salary, employee_age: res.data.data.age, id: res.data.data.id}
            empDetails.unshift(newEmployee)
            setEmpDetails([...empDetails])
        
        })
    
        
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

  const CancelEdit = () =>{
    
    setIsopen(!isopen);
  }
  const handleDelete = (id) => {
    axios.delete(`http://dummy.restapiexample.com/api/v1/delete/${id}`)
    .then(res => {
        const removeIndex = empDetails.map((item)=> { return item.id; }).indexOf(id);
        empDetails.splice(removeIndex, 1);
        setEmpDetails([...empDetails])
        console.log(res.data.data)
  })
  }

  

  useEffect(() =>{
    getEmployeeDetails()
        .then(response =>{
          const {data} = response;
          setEmpDetails(data);
          
        })
        .catch(console.log)
  },[]);

  

  return(
    <>
       <Typography className={classes.heading} variant="h3" gutterBottom>
          Employee Details:
          <Button className={classes.addButton} variant="contained" color="primary" onClick={doEdit}><AddIcon />
            Add Employee
          </Button>
        </Typography>
        <Dialog open={isopen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Employee</DialogTitle>
        
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
              Submittt
            </Button>
            <Button  color="primary" onClick={CancelEdit}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper}>
          <Table  aria-label="simple table">
            <TableHead >
              <TableRow >
                <TableCell className={classes.tableHead} align="center">Employee Id</TableCell>
                <TableCell className={classes.tableHead} align="center">Name</TableCell>
                <TableCell className={classes.tableHead} align="center">Salary</TableCell>
                <TableCell className={classes.tableHead} align="center">Age</TableCell>
                <TableCell className={classes.tableHead} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empDetails.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className={classes.tableHead} component="th" scope="row" align="center">
                    {data.id}
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center"><Link href="/Employee/individualData/[id]" as={`/Employee/individualData/${data.id}`}><a>{data.employee_name}</a></Link></TableCell>
                  <TableCell className={classes.tableHead} align="center">{data.employee_salary}</TableCell>
                  <TableCell className={classes.tableHead} align="center">{data.employee_age}</TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    <div>
                      <Link href="/Employee/updateEmployeeData/[id]" as={`/Employee/updateEmployeeData/${data.id}`}>
                        <EditIcon className={classes.EditIcon} ></EditIcon>
                      </Link>
                      <DeleteIcon className={classes.DeleteIcon} onClick={() => {handleDelete(data.id)}}></DeleteIcon>
                    </div>
                    
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        
        {/* <FormDialog  isopen={isopen} onEdit={doEdit}/> */}
        
        
      </>
      
   
  )
};




