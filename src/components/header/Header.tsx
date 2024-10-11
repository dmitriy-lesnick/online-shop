
import shopping from "/shopping.svg";
import login from "/login.svg"
import profile from "/profile.svg"
import styles from './Header.module.css'
import useStorage from "../../hooks/useStorage";
import { observer } from "mobx-react";
import AppLink from "../ui/AppLink";
import Logo from "../logo/Logo";


const Header = observer(() => {
    let { cart, auth } = useStorage()
    let cnt = cart.totalCnt
    let isEmptyCart = cart.items.length === 0



    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Logo />
                <nav className={styles.nav}>
                    {auth.authUser && <AppLink to="profile" title="profile"><img width='20px' height='20px' src={profile} alt="profile" /></AppLink>
                        || <AppLink to="login"><img width='20px' height='20px' src={login} alt="login" /></AppLink>}
                    <AppLink to='cart' className={styles.cart}><img src={shopping} alt="logo Online store" width='40px' height='40px' />{!isEmptyCart && <div className={styles.cnt}>{cnt}</div>}</AppLink>
                </nav>

            </div>
        </header>
    );
})

export default Header;