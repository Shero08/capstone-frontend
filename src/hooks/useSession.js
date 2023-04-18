import { useEffect, useState } from 'react';

const useSession = () => {
    const session = localStorage.getItem('token')
    const auth = localStorage.getItem('authToken')

    const [userSession, setUserSession] = useState(null)
    const [userToken, setUserToken] = useState(null)

    useEffect(() => {
        if(session){
            setUserSession(JSON.parse(session))
            setUserToken(JSON.parse(auth))
        }
    }, [])

  return {userSession, userToken}
}

export default useSession