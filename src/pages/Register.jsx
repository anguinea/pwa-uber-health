import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseContext } from '../context/FirebaseContext';

export default function Register(){
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const {auth} = useContext(FirebaseContext)

  
  const navigate = useNavigate();
  
  const handleSubmit = (event) =>{
    event.preventDefault()

    createUserWithEmailAndPassword(auth, event.currentTarget.email.value, event.currentTarget.password.value)
      .then((userCredential) => {
        // Signed in 
        setUser(userCredential.user)
        navigate("/home")
      })
      .catch((error) => {
        // navigator.vibrate([500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]);
        setError(error)
      });

  }

  return (
    <div className="main">
      {
        error && <p className="error">{error.message}</p>
      }
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" required />
        <input type="password" name="password" required />
        <button type="submit">Créer mon compte</button>
      </form>
    </div>
  )
};
