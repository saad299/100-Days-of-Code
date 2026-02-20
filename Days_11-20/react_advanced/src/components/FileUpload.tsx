import { useState } from "react";

const FileUpload = () => {
  const [preview, setPreview] = useState(null);
  // const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    console.log(file);
  };


  // const fd = new FormData();
  // fd.append('file', file)

  return (
    <div>
      <h2 className="text-3xl font-bold text-red-700">Day18: File Upload</h2>
      <p>There are many libraries for handling file upload in React.</p>
      <p>Some of the popular libraries are:</p>
      <ul>
        <li>React Dropzone</li>
        <li>React File Upload</li>
        <li>React Upload Widget</li>
      </ul>
      <p>
        These libraries provide a lot of features for handling file upload in
        React.
      </p>
      <p>They provide features like drag and drop, progress bar, and more.</p>
      <br />
      <input
        type="file"
        onChange={handleFileChange}
        placeholder="Upload image here"
        accept="image/*"
        aria-label="image-file"
        multiple
      />
      <img src={preview} alt="Preview" className="w-4/5 mx-auto"/>
    </div>
  );
};

export default FileUpload;
