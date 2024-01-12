import { addToCart } from "./store/cart-slice";
import { useCartDispatch } from "./store/hooks";

type ProductProps = {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
};

export default function Product({ id, image, title, price, description }: ProductProps) {
  const dispatch = useCartDispatch();

  function handleAddToCart() {
    // it is not recommended to use the default version of dispatch hook,
    // but to create my own version of it
    dispatch(
      addToCart({
        id,
        title,
        price,
      })
    );
  }

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={handleAddToCart}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
