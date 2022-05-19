export default (state, action) => {
    console.log("pay==="+action.type);
    switch (action.type) {
      case "dataCustomers":
        return {
          ...state,
          Cust_data: action.payload
        };
      case "dataProducts":
        return {
          ...state,
          Prod_data: action.payload
        };
    case "dataSubscription":
        return {
          ...state,
          Sub_data: action.payload
        };
    case "dataVendors":
        return {
          ...state,
            Ven_data: action.payload
        };
    case "dataBill":
        return {
          ...state,
            Bill_data: action.payload
        };

      default:
        return state;
    }
  };