import { observer } from "mobx-react";
import useStorage from "../../../hooks/useStorage";
import { TProduct } from "../../../types/types";
import ProductCard from "../../products/ProductCard";
import styles from './Cart.module.css'

const Cart = observer(() => {
    let { cart } = useStorage()
    let productsInCart: TProduct[] | null = null


    productsInCart = []
    /*-----!!!!----*/
    cart.items.map(i => productsInCart!.push(cart.rootStore.products.one(i.id)!))
    /*-----!!!!----*/


    return (<>
        {
            <div>
                <ul className={styles.list}>
                    {productsInCart.map(i => <li key={i.id}><ProductCard item={i} isInCart={true} /></li>
                    )}
                </ul>
            </div>


        }


    </>
    );
})

export default Cart;