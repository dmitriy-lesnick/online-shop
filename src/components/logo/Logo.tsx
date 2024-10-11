import AppLink from "../ui/AppLink";
import logo from "/logo.svg";
import styles from './Logo.module.css'

const Logo = () => {


    return (<AppLink to='home'><img src={logo} alt="logo Online store" width='50px' height='50px' /> <span className={styles.logo__text}>Online store</span></AppLink>);
}

export default Logo;