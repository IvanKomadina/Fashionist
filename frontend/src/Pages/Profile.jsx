import React, { useEffect, useState } from 'react'
import './CSS/Profile.css'
import profile_big_icon from '../Components/Assets/profile_big_icon.png'

const Profile = () => {
  const token = localStorage.getItem('auth-token');
  const [currentUserData, setCurrentUserData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [newUserData, setNewUserData] = useState({
    name: "",
    password: ""
  });  

  useEffect(() => {
    fetch('http://localhost:4000/api/users/singleuser', {
      headers: {
          'auth-token': token
      }
    })
    .then((response) => response.json())
    .then((data) => setCurrentUserData(data))
  }, [token])

  const changeHandler = (e) => {
    setNewUserData({...newUserData, [e.target.name]: e.target.value})
  }

  const updateUser = async () => {
    if (newUserData.name !== '' || newUserData.password !== '') { 
      let changedData = {...newUserData}
      if (newUserData.name === '') {
        delete changedData.name
      }
      if (newUserData.password === '') {
        delete changedData.password
      }

      const response = await fetch('http://localhost:4000/api/users/updateuser', {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': token
        },
        body: JSON.stringify(changedData)
      })
      
      const data = await response.json();

      if (data.success === true) {
        setCurrentUserData(prevUserData => ({
          ...prevUserData,
          name: data.name 
        }));
      }
      //alert(data.message);
    } else {
      alert('Fields are empty.')
    }

    setNewUserData({
      name: '',
      password: ''
    })
  }

  const deleteProfile = async () => {
    const response = await fetch('http://localhost:4000/api/users/singleuser', {
      headers: {
          'auth-token': token
      }
    })
    
    const data = await response.json();
    let userID = data._id;

    await fetch('http://localhost:4000/api/users/deleteuser/' + userID, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },            
    })

    localStorage.removeItem('auth-token');
    localStorage.removeItem('cartItems');
    window.location.replace('/');
  }

  return (
    <div className='user-profile'>
      <div className='left'>
        <img src={profile_big_icon} alt='' ></img>
        <a href='orders'>My orders</a>
      </div>
      <div className='user-details'>
        <div className="userdetails-itemfield">
          <p>Email: {currentUserData.email}</p>
          <p>Name: {currentUserData.name}</p>
        </div>
        <div className="userdetails-itemfield">
          <p>Change name</p>
          <input type="text" value={newUserData.name} onChange={changeHandler} name='name' placeholder='New name' />
        </div>
        <div className="userdetails-itemfield">
          <p>Change password</p>
          <input type="password" value={newUserData.password} onChange={changeHandler} name='password' placeholder='New password' />
        </div>
        <div className='userdetails-buttons'>
          <button onClick={() => {updateUser()}}>UPDATE PROFILE</button>
          <button onClick={() => {deleteProfile()}}>DELETE PROFILE</button>
        </div>
      </div>
    </div>
  )
}

export default Profile