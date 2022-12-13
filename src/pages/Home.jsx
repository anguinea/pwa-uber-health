import { useContext, useState, useEffect, useCallback } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { addDoc, collection, query, where, getDocs} from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import Select from "react-select";

export default function Home() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    let [toggleForm, setToggleForm] = useState(false);
    const {db} = useContext(FirebaseContext);
    const {user} = useContext(UserContext);
    const [doctorOptions, setDoctorOptions] = useState([]);
    const [doctorId, setDoctorId] = useState(null);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [date, setDate] = useState(null);

    
    useEffect(() => {
        const getInitialAppointmentsData = async () => {
            const querySnapshot = await getDocs(query(collection(db, "appointments"), where("user_uid", "==", user.uid)));
            setAppointments(querySnapshot);
            console.log("appointments", appointments);
        }
        getInitialAppointmentsData();
    },[forceUpdate]);


    useEffect(() => {
        const getInitialDoctorsData = async () => {
            let doctors = [];
            const doctorsQuerySnapshot = await getDocs(query(collection(db, "doctors")));
            doctorsQuerySnapshot.forEach((doc) => {
                var doctor = {value: doc.id, label: doc.data().fullname}
                doctors.push(doctor);
            });
            setDoctorOptions(doctors);
            console.log("doctorOptions", doctorOptions);
        }
        getInitialDoctorsData(); 
    },[]);


    const handleSubmit = useCallback( async (event) =>{
        const user_uid = user.uid;
        console.log('data to add', date, start, end, user_uid, doctorId)
        
        const docRef = await addDoc(
            collection(db, "appointments"), 
            {date, start, end, doctorId, user_uid}
        )
        console.log("Appointment written with ID: ", docRef.id);
        setForceUpdate(true);
    }
    , [user])

    const handleChangeDate = useCallback((e) => setDate(e.currentTarget.value), [])
    const handleChangeStart = useCallback((e) => setStart(e.currentTarget.value), [])
    const handleChangeDoctor = useCallback((newValue) => setDoctorId(newValue), [])
    const handleToggleForm = useCallback(() => setToggleForm(!toggleForm), [toggleForm])
    
    return (
        <div>
            {/* Top bar */}
            {/* Liste des rendez vous avec filtre "à venir" ou tous.  */}
            <h1>Mes Rendez-vous</h1>
            { appointments.map((appointment) => {
                    return (
                        <div className="appointment" key={appointment.uid}>
                            <p className="date">{appointment.date}</p>
                            <p className="start">{appointment.start}</p>
                            <p className="end">{appointment.end}</p>
                            <p className="doctor">{appointment.doctor.fullname}</p>
                        </div>
                    )
                })
            }
            { error && <p className="error">{error.message}</p> }
            
            <button onClick={handleToggleForm}>Nouveau RDV</button>

            { toggleForm &&
                <form className="text-center">
                    <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                        Nouveau RDV
                    </h1>
                    <div className="py-2 text-left">
                        <input onChange={handleChangeDate} type="date" name="date" required className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="jj/mm/aaaa" />
                    </div>
                    <div className="py-2 text-left">
                        <input onChange={handleChangeStart} type="time"  step="60" name="start" required className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="10:00" />
                    </div>
                    <Select value={doctorId} onChange={handleChangeDoctor} className="basic-single" classNamePrefix="select" isClearable={true} isSearchable={true} name="doctor_uid" options={doctorOptions} />
                    <div className="py-2">
                        <button onClick={handleSubmit} type="submit" className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700">
                            Confirmer le RDV
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}
