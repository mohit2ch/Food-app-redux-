import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux/es/exports';
const Cart = (props) => {
  const items = useSelector((state)=>{
    console.log(state.cart.items);
    return state.cart.items
  });
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
      {items.map(function(ele){
        return <CartItem
        key = {ele.id}
          item={{id: ele.id, title: ele.name, quantity: ele.amount, total: ele.totalPrice, price: ele.price }}
        />
      })}
        
      </ul>
    </Card>
  );
};

export default Cart;
