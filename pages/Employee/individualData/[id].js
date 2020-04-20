import {getIndividualEmployee} from '../../../EndPiont/index';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


export default function Post(){
    const [empDetail,setEmpDetail] = useState([]);

    const router = useRouter();
    const id = router.query;
    console.log("id",id);

    useEffect(() =>{
        axios.get(`http://dummy.restapiexample.com/api/v1/employee/${id}`)
        .then(res => {
            console.log(res.data.data)
            setEmpDetail(res)
            console.log("empdetail",empDetail)
                
        })
            // .catch(console.log("response",response))
    },[])
           
    


    return(
        <div>
            
            <h1>{empDetail.data.data.id}</h1>
            <h1>{empDetail.data.data.employee_name}</h1>
            <h1>{empDetail.data.data.employee_salary}</h1>
            <h1>{empDetail.data.data.employee_age}</h1>
        </div>
    )
}