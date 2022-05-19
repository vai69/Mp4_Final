import { Outlet, Link } from "react-router-dom";
import './App.css';
import { connect } from "react-redux";
import setCustomer from "./actions/setCustomer";

const Routs = (props) => {

  console.log(props);
  
  return (
    <>
      <div class="row">
          <div class="column crd" >
            <Link class="bt" onClick={props.OnClickFunc} to="/Agency">Agency</Link>
          </div>
          <div class="column crd" >
            <Link class="bt" onClick={props.OnClickFunc} to="/Vendor">Vendor</Link>
          </div>
          <div class="column crd" >
            <Link class="bt" to="/Bill_Agency">Bill For Agency</Link>
          </div>
          <div class="column crd" >
            <Link class="bt" to="/Bill_Vendor">Bill For Vendor</Link>
          </div>
      </div>

      <Outlet />
    </>
  )
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setCustomer: (payload) => dispatch(setCustomer(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routs);