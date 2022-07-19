import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { useSelector } from 'react-redux/es/exports';
const CartButton = (props) => {
  const dispatch = useDispatch();
  function toggleHandler(){
    dispatch(uiActions.toggle());
  }
  const totalQuantity = useSelector((state)=>state.cart.totalQuantity);
  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
