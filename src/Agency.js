import Customers_Per_District from "./chart_data/Customers_Per_District";
import Customers_Per_Product from "./chart_data/Customers_Per_Product";
import Customers_Per_Vendors from "./chart_data/Customers_Per_Vendors";
import Test from "./chart_data/Test";
import { useState,useEffect } from 'react';
import "./Agency.css"


const Agency = (props)=>{
    //console.log("agency=="+JSON.stringify(props.data[0]));
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
                        <Customers_Per_District info={props.data[0]}/> 
                    </div>
                    <hr></hr>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div class="prd-gr">
                    <h2>Customers Per Product</h2>
                        <Customers_Per_Product data={[props.data[1],props.data[2]]} />
                        
                    </div>
                    <hr></hr>
                    {/* <div class="ven-gr">
                        <Customers_Per_Vendors data={[props.data[3],props.data[2]]}/> 
                    </div> */}
                </div>

            </>
        )

    
}
export default Agency;

