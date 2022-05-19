import { useRef } from "react";
import Bill_generation from "./Bill_generation";
import Bill_vendor from "./Bill_vendor";
import ReactToPrint from "react-to-print";
import "./bill.css";

const Bill = (props) => {

  console.log(props);
    const printOrder = () => {
        const printableElements = document.getElementById('printme').innerHTML;
        const orderHTML = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
        const oldPage = document.body.innerHTML;
        document.body.innerHTML = orderHTML;
        window.print();
        document.body.innerHTML = oldPage
    }
  return (
    <>
      <div class="row">
        
        <button className="bill_btn" onClick={printOrder}>Print</button>
        <br></br>
        {/* component to be printed */}
        <div id="printme">
            <Bill_generation  />
        </div>
      </div>
    </>
  )
};
export default Bill;


