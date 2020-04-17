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
import dynamic from 'next/dynamic';


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

  const [isopen,setIsopen] = useState(false);


  const doEdit =() =>{
    setIsopen(!isopen);

  };

 

  

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
                  <TableCell className={classes.tableHead} align="center"><Link href="/Employee/slug1/[id]" as={`/Employee/slug1/${data.id}`}><a>{data.employee_name}</a></Link></TableCell>
                  <TableCell className={classes.tableHead} align="center">{data.employee_salary}</TableCell>
                  <TableCell className={classes.tableHead} align="center">{data.employee_age}</TableCell>
                  <TableCell className={classes.tableHead} align="center">
                    <EditIcon className={classes.EditIcon} ><Link href="/Employee/slug2/[id]" as={`/Employee/slug2/${data.id}`}><a>edit</a></Link></EditIcon> 
                    <DeleteIcon className={classes.DeleteIcon}/>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        
        <FormDialog  isopen={isopen} onEdit={doEdit}/>
        
      </>
      
   
  )
};




