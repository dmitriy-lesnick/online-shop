import useStorage from "../../hooks/useStorage";
import ProductCard from "../../components/products/ProductCard";
import styles from "./HomePage.module.css"
import Slider from "../../components/slider/Slider";

const HomePage = () => {
    let store = useStorage()


    return (
        <>
            <div className="container">
                <aside>
                    <Slider />
                </aside>
                <div className={styles.catalog}>
                    <ul className={styles.list}>
                        {store.products.items.map(i => <li key={i.id}> <ProductCard item={i} isInCart={false} /></li>)}
                    </ul>
                </div>
            </div>

        </>
    )
}

export default HomePage;