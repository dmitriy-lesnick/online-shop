import { RefObject, useEffect, useRef } from 'react'
import styles from './Slider.module.css'
import slide1 from '/slide1.jpg'
import slide2 from '/slide2.webp'
import slide3 from '/slide3.webp'


const Slider = () => {
    let counter = 0
    let sliderRef: RefObject<HTMLDivElement> = useRef(null)
    let lineRef: RefObject<HTMLDivElement> = useRef(null)
    let prevRef: RefObject<HTMLButtonElement> = useRef(null)
    let nextRef: RefObject<HTMLButtonElement> = useRef(null)
    let paginRef: RefObject<HTMLDivElement> = useRef(null)
    let paginDots: NodeListOf<ChildNode> | undefined
    let slides: NodeListOf<ChildNode> | undefined
    let width: number
    let sliderTimeStart: number


    useEffect(() => {
        window.addEventListener('resize', sliderInit)
        sliderInit()
        startSlider()
        return () => { stopSlider(); window.removeEventListener('resize', sliderInit) }
    }, [])

    function startSlider() {
        sliderTimeStart = setTimeout(() => {
            sliderMove(true)
            startSlider()
        }, 3000);
    }


    function stopSlider() {
        clearTimeout(sliderTimeStart)
    }

    function sliderInit() {
        slides = lineRef.current!.childNodes
        width = sliderRef.current!.clientWidth
        paginDots = paginRef.current?.childNodes
        slides?.forEach(s => (s as HTMLDivElement).style.width = width + 'px')
        rollSlider()
    }

    function sliderMove(isNext: boolean) {
        if (isNext) {
            counter === slides?.length! - 1 ? counter = 0 : ++counter
        } else {
            counter === 0 ? counter = slides?.length! - 1 : --counter
        }
        paginationСhange()
        rollSlider()
    }

    function rollSlider() {
        lineRef.current!.style.transform = 'translate(-' + counter * width + 'px)'
    }

    function paginationСhange(current: number = counter) {
        counter = current
        rollSlider()
        paginDots?.forEach(d => (d as HTMLDivElement).classList.remove(styles['dot--active']));
        (paginDots![counter] as HTMLDivElement).classList.add(styles['dot--active'])
    }

    return (<div ref={sliderRef} className={styles.slider}>
        <div ref={lineRef} className={styles.line}>
            <div className={styles.slide}><img src={slide1} alt="" /></div>
            <div className={styles.slide}><img src={slide2} alt="" /></div>
            <div className={styles.slide}><img src={slide3} alt="" /></div>
        </div>
        <button onClick={() => { sliderMove(false) }} ref={prevRef} className={styles.prev} type="button"></button>
        <button onClick={() => { sliderMove(true) }} ref={nextRef} className={styles.next} type="button"></button>
        <div ref={paginRef} className={styles.pagination}>
            <div className={`${styles.dot} ${styles['dot--active']}`} onClick={() => { paginationСhange(0) }}></div>
            <div className={styles.dot} onClick={() => { paginationСhange(1) }}></div>
            <div className={styles.dot} onClick={() => { paginationСhange(2) }}></div>
        </div>
    </div>);
}

export default Slider;