import { db } from "../utils/firebase_db";
import { collection, getDocs } from "firebase/firestore";

var customers =[];
// const querySnapshot = await getDocs(collection(db, "customers"));
//             querySnapshot.docs.forEach((element) => {
//                 var d = element.data();
//                 customers.push(d);
//             });

export { customers };