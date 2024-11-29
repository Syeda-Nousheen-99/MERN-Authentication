import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSuccess } from '../Utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('')
  const [products, setProducts] = useState('')
  const Navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('LoggedInUser'))
  }, [])

  const fetchProduct = async () => {
    try {
      const url = "https://mern-authentication-api-mu.vercel.app/products"
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result)

    } catch (err) {

    }
  }
  useEffect(() => {
    fetchProduct()
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('LoggedInUser');
    handleSuccess('User Logout')
    setTimeout(() => {
      Navigate('/login')

    }, 1000)
  }
  return (
    <>
      <header className='header'>
        <div className='logo'>
          <h1>My Auth</h1>
        </div>
        <h2>Welcome <span className='name'>{loggedInUser}</span></h2>
        <button onClick={handleLogout} className='btn'>Logout</button>
      </header>

      <div className='product'>
        {
          products && products?.map((item, index) => (
            <ul key={index}>
              <span className='product_show'>{item.name} : {item.price}</span>
            </ul>
          ))
        }
      </div>
      <ToastContainer />
    </>
  )
}

export default Home
