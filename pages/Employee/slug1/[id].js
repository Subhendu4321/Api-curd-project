import {getIndividualEmployee, getEmployeeDetails} from '../../../EndPiont';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Post(){
    const [empDetail,setEmpDetail] = useState([]);

    const router = useRouter();
    const id = router.query;

    useEffect(() =>{
        getIndividualEmployee(id)
            .then(response =>{
              const {data} = response;
              setEmpDetail(data);
            })
            .catch(console.log("response",response))
    },[])
    


    return(
        <div>
            <h1>{empDetail.id}</h1>
            <h1>{empDetail.employee_name}</h1>
            <h1>{empDetail.employee_salary}</h1>
            <h1>{empDetail.employee_age}</h1>
        </div>
    )
}