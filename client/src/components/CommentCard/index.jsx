import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"

export default function CommentCard({ commentData }) {
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    const fetchUserDataById = async () => {
      const response = await fetch(`https://artvista-backend.onrender.com/users/userInfo/${commentData.user_id}`)
      const data = await response.json()
      if (response.status == 200) {
        setUserInfo(data)
      }
    }
    fetchUserDataById()
  }, [])
  return (
    <div className='comment-card'>
      <img className="comment-profile-pic" src={userInfo.profile_url} alt="profile pic" />
      <div>
        <NavLink className="nav-link profile-link" to={`/profile/${userInfo.id}`}>
          <h2>{userInfo.username}:</h2>
        </NavLink>
        <h3>{commentData.content}</h3>
      </div>
    </div>
  )
}
