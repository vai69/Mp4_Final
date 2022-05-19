import { useState, useEffect, React } from "react";
import { connect } from "react-redux";
import setBill from "../actions/setBill";
import setProducts from "../actions/setProducts";
import { db } from "../utils/firebase_db";
import { doc, addDoc , getDocs, collection, setDoc } from "firebase/firestore";
import "./Bill_generation.css"

const Bill_generation =(props) => {

 
  const [mobile ,setMobile]=useState(false);
  const [vmobile ,setVMobile]=useState("");
  const [vAdd ,setVAdd]=useState("");
  const [vCity ,setVCity]=useState("");
  const [vPin ,setVPin]=useState("");
  const [Bal, setBal]=useState(0);
  
  const [curr, setCurr]=useState(0);
  
  const [adjust, setAdjust]=useState(0);
  var flg=true;
  
    const fetch_data=async()=>{
        if(props.Prod_data.length==0&&flg)
        {
            var bill_rpt={};
            var docid="";
            const querySnapshot = await getDocs(collection(db, "Billing Report"));
            querySnapshot.docs.forEach((element) => {
                var data = element.data();
                console.log(data.FName);
                if(data.FName=="Sukant"&&data.LName=="Jadhav")
                {
                    bill_rpt=data;
                    docid=element.id;
                    
                }
            });



            var ct="";
            const querySnapshot1 = await getDocs(collection(db, "subscription"));
            querySnapshot1.docs.forEach((element) => {
                var data = element.data();
                console.log(data.FName);
                if(data.firstName=="Sukant"&&data.lastName=="Jadhav")
                {
                   ct=data.contact;
                }
            });
            setMobile(ct);

            const querySnapshot2 = await getDocs(collection(db, "vendors"));
            querySnapshot2.docs.forEach((element) => {
                var data = element.data();
                if(data.vendorName=="G R Jadhav")
                {
                   setVAdd(data.addressLine1);
                   setVCity(data.city);
                   setVMobile(data.phone);
                   setVPin(data.pincode);
                }
            });
            
            if(bill_rpt!={})
            {
                console.log("bill_rpt==="+JSON.stringify(bill_rpt));
                setBal(bill_rpt.Balance);
                setCurr(bill_rpt.currBill);
                setAdjust(bill_rpt.Adjustment);
            }
            var tmp=[];
            var price=0;
            if(props.Prod_data.length==0)
            {
                //console.log(tmp);
                const querySnapshot = await getDocs(collection(db, "Products"));
                querySnapshot.docs.forEach((element) => {
                    var data = element.data();
                    if(data.productName=="Pudhari")
                    {
                        console.log("price=="+data.sundayPrice)
                        price=data.sundayPrice;
                    }
                });
                //props.setProducts(tmp);
            }
            var date1 = new Date("06/15/2019");
            var date2 = new Date("06/20/2019");
            var Difference_In_Time = date2.getTime() - date1.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            console.log(Difference_In_Days);
            
            console.log(tmp);
            props.Prod_data.forEach((doc)=>{
                
                if(doc.productName=="Pudhari")
                    price=doc.sundayPrice;
            });
            console.log(price);
            setCurr(price*Difference_In_Days);
            if(docid==""&&flg)
            {
                console.log("//insertBal)");
                console.log("In 1==")
                 console.log(Bal);
                  console.log(price);
                 
                flg=false;
                //  await updateDoc(washingtonRef, {
                //     Balance:Bal,
                //     currentBill:price*Difference_In_Days,
                //     totalBill:price*Difference_In_Days+Bal
                //   });

                const data={
                    Balance:Bal,
                    currentBill:price*Difference_In_Days,
                    totalBill:price*Difference_In_Days+Bal,
                    Adjustment:0,
                    FName:"Meentai",
                    LName:"Jadhav",
                    product:"Pudhari"

                };
                await addDoc(collection(db, "Billing Report"), data).then(() =>{ console.log("Document added")}); 
                
                
            }
            else if(flg)
            {
                 //update
                 console.log("In 2==")
                 console.log(Bal);
                  console.log(price);
                  flg=false;
                  const Ref = doc(db, "Billing Report",docid);
                 
                //  await updateDoc(washingtonRef, {
                //     Balance:Bal,
                //     currentBill:price*Difference_In_Days,
                //     totalBill:price*Difference_In_Days+Bal
                //   });

                setDoc(Ref, {
                    Balance:Bal,
                    currentBill:price*Difference_In_Days,
                    totalBill:price*Difference_In_Days+Bal
                }, {
                    merge: true
                    }).then(() => { console.log("Document updated")}); 
            }
            
            
        }
    }

    useEffect(() => {
        if(props.Prod_data.length==0)
            fetch_data();
    },[]);

    var current= new Date();
    var Today_dt=`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        return (
            <>
        
                <div class="main_div">
                    <div className="heading">
                        <h2>G R Jadhav</h2>
                        <p className="subHd">
                            Contact: {vmobile}<br></br>
                            Address: {vAdd}, {vCity}, {vPin}
                        </p>
                    </div>
                    <p>Date: {Today_dt}<br></br>
                    Product: Pudhari</p>
                    <p>Customer Name: Sukant Jadhav<br></br>
                    Mobile No: {mobile}</p><br></br>
                    <table>
                        <tr>
                            <th>Discription</th>
                            <th>Amount</th>
                        </tr>
                        <tr>
                            <td>Bal</td>
                            <td>{Bal}</td>
                        </tr>
                        <tr>
                            <td>AdjustMent</td>
                            <td>{adjust}</td>
                        </tr>
                        <tr>
                            <td>Current Bill</td>
                            <td>{curr}</td>
                        </tr>
                        <tr>
                            <td>Total Bill</td>
                            <td>{curr+Bal+adjust}</td>
                        </tr>
                    
                    </table>
                </div>
            </>
        )

  
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setBill: (payload) => dispatch(setBill(payload)),
  setProducts: (payload) => dispatch(setProducts(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bill_generation);