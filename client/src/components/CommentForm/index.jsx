import React, { useState } from 'react'
import Swal from "sweetalert2"

export default function CommentForm({ id, setComments }) {
  const [comment, setComment] = useState("")

  const handleTextarea = (e) => {
    setComment(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const postComment = async () => {
      try {
        if (sessionStorage.getItem("token")) {
          const options = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Authorization": sessionStorage.getItem('token')
            },
            body: JSON.stringify({
              user_id: sessionStorage.getItem('user_id'),
              art_id: id,
              content: comment
            })
          }
          const response = await fetch("https://artvista-backend.onrender.com/comment", options)
          if (response.status == 201) {
            const fetchComments = async () => {
              const response = await fetch(`https://artvista-backend.onrender.com/art/${id}/comments`)
              const data = await response.json()
              setComments(data)
            }
            fetchComments()
          }
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    if (sessionStorage.getItem("token")) {
      postComment()
    } else {
      Swal.fire({
        title: "Unable to leave comment.",
        text: "Make sure to login before leaving a comment",
        icon: "error" 
      })
    }
    setComment("")
  }

  return (
    <div className="comment-create" onSubmit={handleSubmit}>
      <textarea name="" id="" cols="30" rows="3" placeholder='Comment here...' onChange={handleTextarea} value={comment} maxLength="200"></textarea>
      <input value="" type="submit" onClick={handleSubmit} />
    </div>
  )
}
