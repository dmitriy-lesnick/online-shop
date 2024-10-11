import { observer } from "mobx-react";
import useStorage from "../../hooks/useStorage";
import { TProduct } from "../../types/types";
import AppLink from "../ui/AppLink";
import styles from './ProductCard.module.css';
import smartphone from '/smartphone.png'


type TProductCardProps = {
    item: TProduct
    isInCart: boolean
}

const ProductCard = observer(({ isInCart, item }: TProductCardProps) => {
    let { cart, auth } = useStorage()
    let cnt = cart.cnt(item.id)

    function addItemToCart() {
        auth.authUser ? cart.add(item.id) : document.location = 'login'
    }

    function removeFromCart() {
        cart.remove(item.id)
    }

    function increase() {
        cart.change(item.id, ++cnt)
    }

    function decrease() {
        if (cnt === 1) {
            removeFromCart()
        } else {
            cart.change(item.id, --cnt)
        }
    }



    return (
        <div className={styles.item}>
            <div className={styles['img-wrp']}><img src={smartphone} alt={`${item.title}`} /></div>
            <div className={styles.info}>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.price}> price: {item.price}</p>
                <AppLink className={styles['link-more']} to={'product'} params={[item.id]}>Read more</AppLink>
                {isInCart ? <div className={styles.quantity}>
                    <button onClick={() => { increase() }} type="button">+</button>
                    <div className={styles.cnt}>
                        {cart.isReady && <div>{cnt}</div> || <div className="loader"></div>}
                    </div>
                    <button onClick={() => { decrease() }} type="button">-</button>
                </div>
                    : <div>
                        {cart.has(item.id) ?
                            <div className={styles['buttons-cart']}>
                                <AppLink className={styles['cart-link']} to="cart">Go to cart</AppLink>
                                <button className={styles.remove} onClick={() => { removeFromCart() }} type="button">X</button>
                            </div>
                            :
                            <button type="button" className={styles.add} onClick={() => addItemToCart()}>Add to Cart</button>}
                    </div>
                }
            </div>
            {isInCart && <button className={styles['cart-item__remove']} onClick={() => { removeFromCart() }}>x</button>}
        </div >
    );
})

export default ProductCard;