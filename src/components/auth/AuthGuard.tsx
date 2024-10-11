import { Navigate } from "react-router-dom";
import useStorage from "../../hooks/useStorage";
import { observer } from "mobx-react";



const AuthGuard = observer(({ children }: { children: JSX.Element }) => {

    let { auth } = useStorage()

    return (<>
        {auth.authUser ? children : <Navigate to='/login' />}
    </>);
})

export default AuthGuard 