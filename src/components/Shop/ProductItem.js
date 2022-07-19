import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux/es/exports';
import { cartActions } from '../../store/cart-slice';
const ProductItem = (props) => {
  const { name, price, description, id } = props;
  const dispatch = useDispatch();
  function addToCartHandler(){
    dispatch(cartActions.additem({
      id: id,
      name: name,
      price : price
    }))
  }
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{name}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
