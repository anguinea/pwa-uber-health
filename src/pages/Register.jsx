import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseContext } from '../context/FirebaseContext';
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from '../context/UserContext';

export default function Register(){
  const {setUser} = useContext(UserContext);
  const [error, setError] = useState(null);
  const {auth,db} = useContext(FirebaseContext);
  
  const navigate = useNavigate();
  
  const handleSubmit = (event) =>{
    event.preventDefault()
    // console.log(event);
    const firstname = event.currentTarget.firstname.value;
    const lastname = event.currentTarget.lastname.value;
    const birthdate = event.currentTarget.birthdate.value;
    const postalCode = event.currentTarget.postalCode.value;
    const city = event.currentTarget.city.value;

    createUserWithEmailAndPassword(auth, event.currentTarget.email.value, event.currentTarget.password.value)
      .then(async (userCredential) => {
        // Signed in
        await setDoc(
            doc(db, "customers", userCredential.user.uid), {firstname, lastname, birthdate, postalCode, city}
        )
        setUser({firstname, lastname, birthdate, postalCode, city, uid: userCredential.user.uid, })
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
      <section className="min-h-screen flex flex-col">
            <div className="flex flex-1 items-center justify-center">
                <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
                    <form onSubmit={handleSubmit} className="text-center">
                        <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                            S'enregistrer
                        </h1>
                        <div className="py-2 text-left">
                            <input type="email" name="email" required className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Email" />
                        </div>
                        <div className="py-2 text-left">
                            <input type="password" name="password" required className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Password" />
                        </div>
                        <div className="w-full flex items-center justify-between py-5">
                            <hr className="w-full bg-gray-400" />
                            <p className="w-full text-base text-center font-medium leading-4 px-2.5 text-gray-400">IDENTITÉ</p>
                            <hr className="w-full bg-gray-400" />
                        </div>
                        <div className="flex space-x-2">
                            <div className="py-2 text-left">
                                <input type="text" name="firstname" required className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Firstname" />
                            </div>
                            <div className="py-2 text-left">
                                <input type="text" name="lastname" required className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Lastname" />
                            </div>
                        </div>
                        <div className="py-2 text-left">
                            <input type="date" name="birthdate" required className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 text-gray-400" />
                        </div>
                        <div className="py-2 text-left">
                            <input type="text" name="address" required className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Address" />
                        </div>
                        <div className="flex space-x-2">
                            <div className="py-2 text-left">
                                <input type="text" name="postalCode" required className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Postal Code" />
                            </div>
                            <div className="py-2 text-left">
                                <input type="text" name="city" required className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="City" />
                            </div>
                        </div>
                        <div className="py-2">
                            <button type="submit" className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700">
                                Créer mon compte
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
  )
};
