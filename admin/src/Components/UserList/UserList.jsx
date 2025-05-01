import React, { useState, useEffect } from 'react'
import './UserList.css'
import cross_icon from '../../assets/cross_icon.png'

const UserList = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [usersLoad, setUsersLoad] = useState(false);

    const fetchAllUsers = async () => {
        const response = await fetch('http://localhost:4000/api/users/allusers');
        const data = await response.json();

        // Filter out users with the admin property
        const nonAdminUsers = data.filter(user => !user.admin);

        // Update state with non-admin users
        setAllUsers(nonAdminUsers);

        setUsersLoad(true);
    }

    useEffect(() => {
        fetchAllUsers();
        window.scrollTo(0, 0);
      }, [])

    const removeUser = async (id) => {
        await fetch('http://localhost:4000/api/users/deleteuser/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },            
        })
        await fetchAllUsers();
    }

  if (!usersLoad) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='list-user'>
        <h1>All users</h1>
        <div className="listuser-allusers">
        {allUsers.map((user, i) => (
            <div key={i} className='listuser-item'>
                <div className="listuser-format">
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <img onClick={() => {removeUser(user._id)}} className="listproduct-right-icon" src={cross_icon} alt="" />
                </div>
                <hr />
            </div>
        ))}
        </div>
    </div>
  )
}

export default UserList