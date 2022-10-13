import React,{useEffect} from 'react'
import Nav from './NavBar/NavBar'
import Other from './Other/Other'
import { useNavigate } from 'react-router-dom'

const Main = () => {

  // const navigate = useNavigate()
  // const user = JSON.parse(localStorage.getItem('user'))

  // useEffect(() => {
  //   if(user === null){
  //     navigate('/')
  //   }
  // });


  return (
    <div>      
      <Nav />
      <Other/>
    </div>
  )
}

export default Main