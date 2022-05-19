import { db } from "../utils/firebase_db";
import { collection, getDocs } from "firebase/firestore";
import { useState,useEffect } from 'react';
import DonutChart from "react-donut-chart";
//import{ data } from "../DataCall/Cutomers";



const Test = (props)=>{
        console.log(props.cnt);
        return (
            <h1>Test {props.cnt}</h1>
        )

    
}
export default Test;

