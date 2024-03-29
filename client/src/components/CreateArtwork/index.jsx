import React, { useState, useEffect } from "react"
import { TagForm } from "../../components"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'


export default function CreateArtwork() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [message, setMessage] = useState("")
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [image, setImage] = useState("")

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("https://artvista-backend.onrender.com/tag")
        const data = await response.json()
        if (response.status == 200) {
          setTags(data.data)
        } else {
          setTags([])
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    fetchTags()
  }, [tags])

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setSelectedTags(prevState => [...prevState, parseInt(e.target.dataset.number)])
    } else {
      setSelectedTags(prevState => prevState.filter((el) => el !== parseInt(e.target.dataset.number)))
    }
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],

    }
    setImage(img.preview)
    setFile(img)
  }
  const handleTextInput = (e) => {
    setTitle(e.target.value)
  }
  const handleTextarea = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!description || !title || !file) {
      Swal.fire({
        title: "Oops...",
        text: "Unable to post artwork. Make sure to upload an image and enter a title and description.",
        icon: "error"
      });
    } else {
      const uploadFile = async () => {
        try {
          const options = {
            method: "POST",
            headers: {
              "Authorization": sessionStorage.getItem('token')
            },
            body: formData
          }
          const response = await fetch("https://artvista-backend.onrender.com/art", options)
          const data = await response.json()
          console.log(data)

          if (response.status == 201) {
            setTimeout(() => {
              navigate(`/artwork/${data.id}`)
            }, 0)
          } else {
            console.log("unsuccessful")
          }
        }
        catch (err) {
          console.error({ error: err.message })
        }
      }
      let formData = new FormData()
      formData.append("user_id", sessionStorage.getItem("user_id"))
      formData.append("file", file.data)
      formData.append("title", title)
      formData.append("description", description)
      formData.append("likes", 0)
      formData.append("tag_ids", selectedTags)
      uploadFile()
    }
    setDescription("")
    setTitle("")
  }
  return (
    <>
      <form className="create-artwork" onSubmit={handleSubmit}>
        {/* <h2>Post your art!</h2> */}
        <div className="row">
          <div className="create-artwork-image">

            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />

            {
              !image && <h2>Choose an image to upload!</h2>
            }
            <img src={image} alt="" />

          </div>
          <div className="create-artwork-details">
            <input type="text" placeholder="Title..." onChange={handleTextInput} value={title} maxLength="40" />
            <textarea placeholder="Description..." onChange={handleTextarea} value={description} maxLength="200" rows="8"></textarea>
            <TagForm tags={tags} setTags={setTags} handleCheckbox={handleCheckbox} />
          </div>
        </div>
        <div className="create-artwork-submit-div">
          <input type="submit" value="Publish" className="create-artwork-submit" />
        </div>
      </form>
      <h2>{message}</h2>
    </>
  )
}