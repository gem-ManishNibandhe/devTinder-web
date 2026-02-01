import React from 'react'

export const UserCard  = ({user}) => {
    console.log(user);
    const {firstName,lastName,photoUrl,age,gender,about}=user;
  return (
    <div>
        <div className="card bg-base-150 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
     {age && gender && <p>{age} years old, {gender}</p>} 
    <p>{about}</p>
    <div className="card-actions justify-center mt-4 gap-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested 🩶
      </button>
    </div>
  </div>
</div>
         </div>
  )
}
