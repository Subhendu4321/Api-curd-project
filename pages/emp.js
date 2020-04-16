import Router from 'next/router';

export default function App(){
  const redirect = () =>{
  Router.push("/emp");
  }
  return(
    <div>
      {redirect}
    </div>
  )
}