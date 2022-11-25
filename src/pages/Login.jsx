import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const {setUser} = useContext(UserContext);
  const {auth} = useContext(FirebaseContext)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  
  const handleSubmit = (event) =>{
    event.preventDefault()
    signInWithEmailAndPassword(auth, event.currentTarget.email.value, event.currentTarget.password.value)
      .then((userCredential) => {
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
        <button type="submit">Se connecter</button>
      </form>
      <p>Pas encore de compte? <Link to="/register">S'enregisrer</Link></p>
    </div>
  )
};
