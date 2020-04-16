import axios from 'axios';

export const getEmployeeDetails = () =>
    axios.get('http://dummy.restapiexample.com/api/v1/employees')
        .then(response => {
            const {data} = response;
            return data;
        });