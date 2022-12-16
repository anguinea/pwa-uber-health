import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
    const {setUser} = useContext(UserContext);
    const {auth, db} = useContext(FirebaseContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        signInWithEmailAndPassword(auth, event.currentTarget.email.value, event.currentTarget.password.value)
        .then(async (userCredential) => {

            const docRef = doc(db, "customers", userCredential.user.uid);
            const customer = await(await getDoc(docRef)).data();
            customer != null ? setUser({...customer,uid:userCredential.user.uid}) : setError('User not found');
            navigate("/home");
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
        <section className="min-h-screen flex flex-col">
            <div className="flex flex-1 items-center justify-center">
                <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
                    <form onSubmit={handleSubmit} className="text-center">
                        <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                            Connexion
                        </h1>
                        <div className="py-2 text-left">
                            <input type="email" name="email" required className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Email" />
                        </div>
                        <div className="py-2 text-left">
                            <input type="password" name="password" required className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Password" />
                        </div>
                        <div className="py-2">
                            <button type="submit" className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700">
                                Se connecter
                            </button>
                        </div>
                    </form>
                    {/* <div className="text-center">
                        <a href="#" className="hover:underline">Forgot password?</a>
                    </div> */}
                    <div className="text-center mt-12">
                        <p>Pas encore de compte? <Link to="/register">S'enregisrer</Link></p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
};
