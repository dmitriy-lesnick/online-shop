import { observer } from "mobx-react";
import useStorage from "../../hooks/useStorage";
import styles from './ProfilePage.module.css'

const ProfilePage = observer(() => {
    let { auth } = useStorage()

    function logOut() {
        auth.logout()
        document.location = '/login'
    }

    return (<div className={styles.page}>
        {auth.authUser && <div className={styles.wrp}><h1 className={styles.name}>{auth.authUser.name}</h1>
            <button className={styles.btn} onClick={() => { logOut() }}>LogOut</button>
        </div> || <div className="loading">...Loading</div>
        }
    </div>);
})

export default ProfilePage;