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


const useStyles = makeStyles({
  heading: {
    width: '100%',
    marginTop:70,
    marginLeft:50,
    marginBottom:10
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function App(props){
  const classes = useStyles();
  const [empDetails,setEmpDetails] = useState([]);

  // useEffect(() =>{
  //   async function fetchData(){
  //     const data =await fetch(`	http://dummy.restapiexample.com/api/v1/employees`).then(res => res.json())
  //     .then(res => setEmpDetails(res))
  //   }
  //   console.log("Use Effect called")
      
  //   fetchData();
  // });

  return(
    <>
      <Typography className={classes.heading} variant="h3" gutterBottom>
        Employee Details:
      </Typography>

      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </>
  )
};


App.getInitialProps = async function() {
  const res = await fetch(`http://dummy.restapiexample.com/api/v1/employees`);
  const data1 = await res.json();

  console.log(`Show data fetched. Count: ${data1.length}`);
  console.log("data",data1);

  return {
    data1
    
  };
};