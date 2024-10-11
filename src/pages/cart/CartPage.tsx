import { observer } from "mobx-react-lite";
import Cart from "../../components/cart/CartFull/Cart";
import useStorage from "../../hooks/useStorage";
import styles from './CartPage.module.css'
import CartEmpty from "../../components/cart/CartEmpty/CartEmpty";

const CartPage = observer(() => {
    let { cart } = useStorage()
    let totalPrice = cart.totalPrice

    return (<>

        <div className={styles.page}>
            <div className={`${styles.container} container`} >
                {cart.items.length > 0 &&
                    <>
                        <div className={styles.cart}>
                            <Cart />
                        </div>
                        <div className={styles.pay}> <h4 className={styles.pay__title}>Placing an order</h4>
                            <p className={styles.pay__subtitle}>Pay for your purchases</p>
                            <p className={styles.pay__total}>Total : <span>{totalPrice}</span>  </p>
                            <button type="button" className={styles.clean} onClick={() => { cart.clean() }}>Clean Cart</button>
                            <button type="button" className={styles.pay__btn}>pay</button>
                        </div>
                    </>
                    ||
                    <CartEmpty />
                }
            </div>
        </div>

    </>



    );
})

export default CartPage;