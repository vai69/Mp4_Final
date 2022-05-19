import { useState } from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { CSVLink, CSVDownload } from "react-csv";
Chart.register(...registerables);
import "../Agency.css"


const Customers_Per_District = (props)=>{

    const [loading, setloading]=useState(false);
    const [pin,setPin] = useState([]);
    const [cnt,setCnt] =useState([]);
    //const [pincode,setPincode] = useState([]);


        const fetch_data=async ()=>{
           //console.log("data==="+props.info);
            if(props.data[0].length>0&&props.data[1].length>0&&pin.length==0){
                const pincodes = props.data[0]
                    .map(dataItem => dataItem.pincode) // get all media types
                    .filter((pincodes, index, array) => array.indexOf(pincodes) === index);

                console.log("AllPINS=="+pincodes);
                var tmp=[];
                    props.data[1].forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    props.data[0].forEach((ele)=>{
                            if(doc.firstName==ele.firstName && doc.lastName==ele.lastName&&doc.vendorId=="JwSCk3y6VINWbbWRAnIZ")
                            {
                                console.log("Match"+ele.pincode)
                                tmp.push(ele.pincode);
                            }
                    });
                });
                console.log("tmpPincode==="+tmp);
                var ct=[]
                pincodes.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    var c=0
                    tmp.forEach((ele)=>{
                            if(doc==ele)
                            {
                                c+=1;
                            }
                            
                    });
                    ct.push(c);
                });
               console.log(ct)
                setCnt(ct);
                setPin(pincodes);
                setloading(true);
               
            }
        }
            

        

    if(loading)
    {
        
        console.log(pin);
        console.log(cnt);
        var csvData=[];
        var headers=['Area Pincode','No. of Customers'];
        csvData.push(headers);
        for(var i=0;i<pin.length;i++)
        {
            csvData.push([pin[i],cnt[i]]);
        }

        const state = {
            labels:pin,
            datasets: [
              {
                label: 'customers',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: cnt
              }
            ]
          }
        return (
          <>
            <Bar
            data={state}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "customers per area"
                },
                legend: {
                  display: true,
                  position: "bottom"
               }
              },
              scales: {
                y: {
                  ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                  },
                },
              },
            }}
          />
          <br></br>
              <div >
                  <CSVLink class="download-btn" filename='Customers_per_district.csv' data={csvData}>Customers_per_Area</CSVLink>
              </div>
          </>
        )
    }
    else
    {
        fetch_data();
        return (
            <></>
        )
    }

    
}
export default Customers_Per_District;

