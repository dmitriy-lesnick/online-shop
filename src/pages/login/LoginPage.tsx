import { useState } from "react";
import styles from "./LoginPage.module.css"
import useStorage from "../../hooks/useStorage";
import { observer } from "mobx-react";




const LoginPage = observer(() => {

    let { auth } = useStorage()
    let [isCorrect, setIsCorrect] = useState(true)

    let [fields, setFields] = useState(
        [{ label: 'Name', name: 'name', value: '', type: 'text', plaseholder: 'Your name' },
        { label: 'Password', name: 'password', value: '', type: 'text', plaseholder: 'Your password' }
        ])



    function setNewValue(name: string, newValue: string) {
        setFields(fields.map(field => field.name === name ? { ...field, value: newValue } : field))
    }

    function login() {
        let result: Record<string, string> = {}
        fields.map(field => result[field.name] = field.value)
        let req = auth.init(result.name, result.password)
        if (req) {
            document.location = '/'
        } else {
            setIsCorrect(false)
        }
        setFields(fields.map(field => field = { ...field, value: '' }))
    }


    return (<>
        {
            !auth.authUser && <div className={styles.page}>
                <div className={`${styles.container} container`}>
                    <div className={styles.page__innerwrp}>
                        {isCorrect && <h1 className={styles.title}>Login: Admin 1234</h1>
                            || <h1 className={styles.error}>Incorrect password or login</h1>}
                        <form className={styles.form} onSubmit={(e) => { e.preventDefault() }} >
                            {fields.map(field =>
                                <div className={styles.field} key={field.name}>
                                    <label className={styles.label}>
                                        {field.label}
                                        <input onFocus={() => { setIsCorrect(true) }} className={`${isCorrect && styles.input || `${styles.input} ${styles['input-error']}`}`} onChange={(e) => setNewValue(field.name, e.target.value)} type={field.type} name={field.name} value={field.value} placeholder={field.plaseholder ?? ''} />
                                    </label>
                                </div>
                            )}
                            <button className={styles.btn} onClick={() => { login() }}>LogIn</button>
                        </form>
                    </div>
                </div>
            </div> || <div className="loading">...Loading</div>
        }
    </>
    );
})

export default LoginPage;