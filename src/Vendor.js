import Customers_Per_District from "./Chart_data_vendor/Customers_Per_District";
import Customers_Per_Product from "./Chart_data_vendor/Customers_Per_Product";
import { useState,useEffect } from 'react';
import "./Agency.css"


const Vendor = (props)=>{
    console.log("agency=="+JSON.stringify(props.data[0]));
    if(props.data[0].length>0){
        return (
            //<Customers_Per_District/>
            <>
                {/* <div class="btns-gr">
                    <button onClick={CPP(1)}  class="btn-ag"><b>Customers Per District</b></button>
                    {cpm==1 ? (<Test cnt={cpm}/>) :(<></>) }
                    <button  class="btn-ag"><b>Customer Per Product</b></button>
                    {cpm==2 ? (<Test cnt={cpm}/>) :(<></>) }
                    <button  class="btn-ag"><b>Customers Per Vendors</b></button>
                    {cpm==3 ? (<Test cnt={cpm}/>) :(<></>) }
                </div> */}
                <div class="graph-gr">
                    <div class="dist-gr">
                        <Customers_Per_District data={[props.data[0],props.data[2]]}/> 
                    </div>
                    <hr></hr>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div class="prd-gr">
                    <h2>Customers Per Product</h2>
                        <Customers_Per_Product data={[props.data[1],props.data[2]]} />
                        
                    </div>
                    {/* <hr></hr>
                    <div class="ven-gr">
                        <Customers_Per_Vendors data={[props.data[3],props.data[2]]}/> 
                    </div> */}
                </div>

            </>
        )
    }

    
}
export default Vendor;

