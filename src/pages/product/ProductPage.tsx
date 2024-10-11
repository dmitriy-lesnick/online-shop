import { Outlet, useParams } from "react-router-dom";
import styles from "./ProductPage.module.css"
import smartphone from '/smartphone.png'
import AppLink from "../../components/ui/AppLink";
import AddToCart from '/add_to_cart.svg'
import useStorage from "../../hooks/useStorage";
import { observer } from "mobx-react";


const ProductPage = observer(() => {
    let { id } = useParams()
    let { cart, auth, products } = useStorage()
    let product = products.one(+id!)



    return (<>{product ?
        <div className={styles.page}>
            <div className={`${styles.container} container`}>
                <div className={styles['product-card']}>
                    <div className={styles.img}><img src={smartphone} alt="smartphone" /></div>
                    <div className={styles.info}>
                        <h1 className={styles.title}>{product.title}</h1>
                        <p className={styles.price}>price: {product.price}</p>
                        <p className={styles.subtitle}> Lorem ipsum dolor sit. </p>
                        <AppLink className={styles.details} to="product.details">Details...</AppLink>

                        {auth.authUser &&
                            <div className={styles.btns}>
                                {cart.has(+id!) &&
                                    <AppLink className={styles['link-cart']} to="cart">Go to Cart</AppLink> ||
                                    <button onClick={() => { cart.add(+id!) }} className={styles.add} type="button"><img src={AddToCart} alt="" /></button>

                                }
                            </div>

                            || <><AppLink className={styles['link-cart']} to="login">log in to purchase</AppLink></>}
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
        /*---!!!!!!!!!!!!!!!!---*/
        : <strong>Product is not found</strong>}</>);
})

export default ProductPage;