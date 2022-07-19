import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { sendCartData, getCartData } from "./store/cart-slice";
import Notification from "./components/Layout/Notification";

let init = true;
function App() {
  const ui = useSelector((state) => {
    return state.ui;
  });
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(function(){
    dispatch(getCartData());
  }, [])
  // cart changes here hence triggers the useEffect below
  useEffect(
    function () {
      if(init){
        init = false;
        return;
      }
      dispatch(sendCartData(cart)); // sendCartData returns the required dispatch fuction, helps keep the components lean
    },
    [cart, dispatch]
  );
  return (
    <Layout>
      {ui.notification && (
        <Notification
          title={ui.notification.title}
          status={ui.notification.status}
          message={ui.notification.message}
        />
      )}
      {ui.isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
