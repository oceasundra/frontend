import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const {slug} = useParams();

  const fetchDetailProject = async () => {
    await axios.get(`projects/${slug}`)
      .then(response => {
        setTitle(response.data.data.title);
        setUrl(response.data.data.url);
        setDesc(response.data.data.desc);
      })
  }

  useEffect(() => {
    fetchDetailProject();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  }

  const updateProject = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('image', image);
    formData.append('url', url);
    formData.append('desc', desc);
    formData.append('_method', 'PUT')

    await axios.post(`projects/${slug}`, formData)
      .then(() => {
        navigate('/projects');
      })
      .catch(error => {
        setErrors(error.response.data);
      })
  }
  return (
    <div className='bg-site bg-no-repeat bg-cover overflow-hidden'>
      <div className="container mx-auto mt-5">
        <h3 className="h3">Update Project</h3>
      </div>
      <div className="container mx-auto mt-5">
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <div className="rounded shadow">
              <div className="p-4">
                <form onSubmit={updateProject}>
                
                  <div className="mb-3">
                    <label className="font-bold">Title</label>
                    <input type="text" className="w-full border rounded px-3 py-2 text-black" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title Post" />
                    {errors.title && (
                      <div className="text-red-500 mt-2">
                        {errors.title[0]}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="font-bold">Image</label>
                    <input type="file" onChange={handleFileChange} className="w-full border rounded px-3 py-2" />
                    {errors.image && (
                      <div className="text-red-500 mt-2">
                        {errors.image[0]}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="font-bold">Url</label>
                    <input className="w-full border rounded px-3 py-2 text-black" value={url} onChange={(e) => setUrl(e.target.value)} rows="5" placeholder="Url Project" />
                    {errors.url && (
                      <div className="text-red-500 mt-2">
                        {errors.url[0]}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="font-bold">Desciption</label>
                    <textarea className="w-full border rounded px-3 py-2 text-black" value={desc} onChange={(e) => setDesc(e.target.value)} rows="5" placeholder="Description Project"></textarea>
                    {errors.desc && (
                      <div className="text-red-500 mt-2">
                        {errors.desc[0]}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn rounded-sm shadow px-4 py-2">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update