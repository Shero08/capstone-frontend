import { useEffect, useState } from 'react';

const useSession = () => {
    const session = localStorage.getItem('token')

    const [userSession, setUserSession] = useState(null)

    useEffect(() => {
        if(session){
            setUserSession(JSON.parse(session))
        }
    }, [])

  return userSession
}

export default useSession