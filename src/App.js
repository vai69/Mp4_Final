import Agency from "./Agency";
import Vendor from "./Vendor";
import Routs from "./Routs";
import { db } from "./utils/firebase_db";
import { collection, getDocs } from "firebase/firestore";
import { useState,useEffect } from 'react';
import { connect } from "react-redux";
import setCustomer from "./actions/setCustomer";
import setProducts from "./actions/setProducts";
import setSubscription from "./actions/setSubscription";
import setVendors from "./actions/setVendors";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Bill from "./bill_genration/Bill";
import Bill_index_vendor from "./bill_genration/Bill_index_vendor";

function App(props) {
  
  const CPP=async ()=>{
    console.log("Data-fetching");
    if(props.Cust_data.length==0)
    {
        var tmp=[];
        const querySnapshot = await getDocs(collection(db, "customers"));
        querySnapshot.docs.forEach((element) => {
            var data = element.data();
            tmp.push(data);
        });
          props.setCustomer(tmp);
    }
    if(props.Prod_data.length==0)
    {
        var tmp=[];
        const querySnapshot = await getDocs(collection(db, "Products"));
        querySnapshot.docs.forEach((element) => {
            var data = element.data();
            tmp.push(data);
        });
          props.setProducts(tmp);
    }
    if(props.Sub_data.length==0)
    {
        var tmp=[];
        const querySnapshot = await getDocs(collection(db, "subscription"));
        querySnapshot.docs.forEach((element) => {
            var data = element.data();
            tmp.push(data);
        });
          props.setSubscription(tmp);
    }
    if(props.Ven_data.length==0)
    {
        var tmp=[];
        const querySnapshot = await getDocs(collection(db, "vendors"));
        querySnapshot.docs.forEach((element) => {
            var data = element.data();
            tmp.push(data);
        });
          props.setVendors(tmp);
    }
  }
  return (
    <>
      <Router>
      <Routes>
        <Route index path="/" element={<Routs OnClickFunc={CPP}/>} />
            <Route path="/Agency" element={<Agency data={[props.Cust_data,props.Prod_data,props.Sub_data,props.Ven_data]}/>} />
          <Route path="/Vendor" element={<Vendor data={[props.Cust_data,props.Prod_data,props.Sub_data,props.Ven_data]}/>} />
          <Route path="/Bill_Agency" element={<Bill />} />
          <Route path="/Bill_Vendor" element={<Bill_index_vendor />} />
      </Routes>
      </Router>
      
    </>
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setCustomer: (payload) => dispatch(setCustomer(payload)),
  setProducts: (payload) => dispatch(setProducts(payload)),
  setVendors: (payload) => dispatch(setVendors(payload)),
  setSubscription: (payload) => dispatch(setSubscription(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

