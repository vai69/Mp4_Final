import { db } from "../utils/firebase_db";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState,useEffect } from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const Customers_Per_Vendors = (props)=>{

    const [vendors,setVendors]=useState([]);
    const [name,setNames]=useState([]);
    const [customers,setCustomer]=useState([]);
    const [cnt,setCnt] =useState([]);
    const [loading,setLoading]=useState(false);
        const fetch_data=async ()=>{
            if(props.data[0].length>0)
            {
                if(vendors.length==0){
                    var tmp=[];
                    var tname=[];
                        props.data[0].forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        if(doc.Agency=="GyfrtgrRCkOANqoppXWH"){
                            tmp.push(doc.vId);
                            tname.push(doc.firnName);
                        }
                    });
                    setVendors(tmp);
                    setNames(tname);
                }
                if(vendors.length>0)
                {
                
                    var tmp=[];
                    props.data[1].forEach((element) => {
                        tmp.push(element.vendorId);
                    });
                    setCustomer(tmp);
                }
                if(customers.length>0)
                {
                    var tmp=[]
                    vendors.forEach((element) => {
                        var c=0;
                        customers.forEach((t) => {
                            if(t==element)
                                c+=1;
                        });
                        tmp.push(c);
                    });
                    setCnt(tmp);
                    setLoading(true);
                }
            }
        }
            

        

    if(loading)
    {
        console.log("Name== "+name);
        console.log("Customerss== "+cnt);
        const state = {
            labels:name,
            datasets: [
              {
                label: 'Vendors',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: cnt
              }
            ]
          }
        return (
            <Bar
                data={state}
                options={{
                    scales: {
                        y: {
                          ticks: {
                            stepSize: 1,
                            beginAtZero: true,
                          },
                        },
                      },
                    plugins: {
                            title: {
                            display: true,
                            text: "customers per Vendors"
                            },
                            legend: {
                            display: true,
                            position: "bottom"
                        }
                    },
                    
            }}
          />
        )
    }
    else
    {
        //console.log(info.length);
        
        fetch_data();
        return (
            <></>
        )
    }

    
}
export default Customers_Per_Vendors

