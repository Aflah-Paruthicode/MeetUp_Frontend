import React, { useState } from 'react'

const EditProffile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [about, setAbout] = useState('');


  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto my-auto">
      <legend className="fieldset-legend">Edit Proffile</legend>

      <label className="label">First Name : </label>
      <input type="text" className="input" name="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} />

      <label className="label">Last Name : </label>
      <input type="text" className="input" name="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} />

      <label className="label">Photo Url : </label>
      <input type="text" className="input" name="photoUrl" onChange={(e) => setPhotoUrl(e.target.value)} value={photoUrl} />

      <label className="label">Age : </label>
      <input type="number" className="input" name="age" onChange={(e) => setAge(e.target.value)} value={age} />

      <label className="label">Gender : </label>
      <input type="text" className="input" name="gender" onChange={(e) => setGender(e.target.value)} value={gender} />

      <label className="label">About : </label>
      <input type="text" className="input" name="About" onChange={(e) => setAbout(e.target.value)} value={about} />


      {/* <p className="text-red-400">{error}</p> */}
      <button className="btn btn-neutral mt-4" >
        Save Changes
      </button>
    </fieldset>
  )
}

export default EditProffile