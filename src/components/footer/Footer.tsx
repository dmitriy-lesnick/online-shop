import { Link } from 'react-router-dom';
import styles from './Footer.module.css'
import Logo from '../logo/Logo';


const Footer = () => {
    return (<footer className={styles.footer}>
        <div className='container'>
            <div className={styles['footer-top']}>
                <Logo />
                <div className={styles.contacts}>
                    <div>
                        <h3 className={styles.title}>Information</h3>
                        <ul className={styles.list}>

                            <li><Link to={'#!'}>About Us</Link></li>
                            <li><Link to={'#!'}>Faq</Link></li>
                            <li><Link to={'#!'}>Terms & Conditions</Link></li>
                            <li><Link to={'#!'}>Contact Us</Link></li>
                            <li><Link to={'#!'}>Help</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={styles.title}>Customer Service</h3>
                        <ul className={styles.list}>
                            <li><Link to={'#!'}>Payment Methods</Link></li>
                            <li><Link to={'#!'}>Money-back</Link></li>
                            <li><Link to={'#!'}>Returns</Link></li>
                            <li><Link to={'#!'}>Shipping</Link></li>
                            <li><Link to={'#!'}>Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={styles.title}>We are in social:</h3>
                        <ul className={styles.social}>
                            <li className={`${styles['social-item']} ${styles.facebook}`}><Link to='#!' ></Link></li>
                            <li className={`${styles['social-item']} ${styles.inst}`}><Link to='#!' ></Link></li>
                            <li className={`${styles['social-item']} ${styles.youTube}`}><Link to='#!' ></Link></li>
                            <li className={`${styles['social-item']} ${styles.twitter}`}><Link to='#!' ></Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles['footer-bottom']}>
                <p className={styles.copy}>Copyright © 2024 Online shop  - All Rights Reserved. Dmitrii Mokrinskii</p>
            </div>
        </div>



    </footer>);
}

export default Footer;