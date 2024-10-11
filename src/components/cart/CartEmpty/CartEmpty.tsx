import AppLink from "../../ui/AppLink";
import backToShopping from '/backToShopping.svg'
import styles from './CartEmpty.module.css'

const CartEmpty = () => {

    return (<div className={styles.element}>
        <h2 className={styles.title}>Cart is empty</h2>
        <div className={styles.icon}><img src={backToShopping} alt="back To Shopping" /></div>
        <AppLink className={styles.link} to="home"> Back To Shopping </AppLink>
    </div>);
}

export default CartEmpty;