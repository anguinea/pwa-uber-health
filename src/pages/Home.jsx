import { useContext, useState } from "react";
import { writeBatch, collection, doc } from "firebase/firestore"; 
import { FirebaseContext } from "../context/FirebaseContext";
// import QRCode from "react-qr-code";

export default function Home() {
//   const [contacts, setContacts] = useState([])
//   const [error, setError] = useState(null);
//   const {db} = useContext(FirebaseContext)

//   const handleClick = async () =>{
//       const props = ['name', 'email', 'tel', 'address'];
//       const opts = {multiple: true};
      
//       try {
//           const contacts = await navigator.contacts.select(props, opts);
//           setContacts(contacts);
//           const batch = writeBatch(db);
//           contacts.map(async (item)=> {
//               batch.set(doc(collection(db, "contacts")),item)
//           });

//           batch.commit()
//       } catch (e) {
//           setError(e)
//       }
      
//   }

  return (
    <div>
        <h1>Welcome to home</h1>
        {/* { error && <p className="error">{error.message}</p> }
        <button onClick={handleClick}>HACK</button>
        {
            contacts.map((contact)=>{
                return (
                    <div className="contact" key={contact.email}>
                        <p className="contact__text">{contact.name}</p>
                        <p className="contact__text">{contact.email}</p>
                        <p className="contact__text">{contact.tel}</p>
                        <p className="contact__text">{contact.address}</p>
                    </div>
                )
            })
        }
        <QRCode
            style={{ height: "auto", maxWidth: "100%", width: "30%" }}
            value="https://console.firebase.google.com/u/0/project/pwaapp-8feaf/overview"
            viewBox={`0 0 256 256`}
        /> */}
    </div>
  )
}
