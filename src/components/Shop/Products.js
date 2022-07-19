import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const DUMMY_ITEMS = [{
    id: 'p1',
    name: 'First Book',
    price: 200,
    description: 'This is my first book'
  },
{
  id: 'p2',
  name: 'Second Book',
  price: 250,
  description: 'This is my second book'
}]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{
        DUMMY_ITEMS.map((ele)=><ProductItem
        key={ele.id}
        id={ele.id}
          name={ele.name}
          price={ele.price}
          description={ele.description}
        />)
      }
        
      </ul>
    </section>
  );
};

export default Products;
