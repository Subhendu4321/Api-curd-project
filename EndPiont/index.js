import axios from 'axios';


export const getEmployeeDetails = () =>
    axios.get('http://dummy.restapiexample.com/api/v1/employees')
        .then(response => {
            const {data} = response;
            return data;
        });

       
export const getIndividualEmployee = (id) => {
            
    axios.get(`http://dummy.restapiexample.com/api/v1/employee/${id}`)
        .then(response =>{
            const {data} = response;
            return data;
        })
}

export const postEmployeeDta = (postData) =>{
    axios.post(`http://dummy.restapiexample.com/api/v1/create`,{"name":"subhendu","salary":"50000","age":"22"})
    .then(res => {
        console.log(res);
        console.log(res.data);
        const {response} = res;
        return response;
    })
}
