import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ImageUploadPage() {
  const [file, setFile] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post('http://localhost:8000/upload-image/', formData);
      console.log(res);
      history.push('/result');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ImageUploadPage;
