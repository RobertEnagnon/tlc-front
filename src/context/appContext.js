import { createContext, useContext, useEffect, useState } from "react";


// Creation du context de l'application avec un objet vide comme valeur par defaut
export const AppContext = createContext({});


// Creation du fournisseur du context
export const AppContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [isLogged, setIsLogged] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);


    const getCurrentUser = async () => {
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            // console.log("context auth: ", currentUser);

            if (currentUser)
                return currentUser;
            else
                return null
        } catch (e) {
            // error reading value
            console.log("error: ", e);
            return null
        }

    };


    const getProfile = async () => {
      // On définit les entêtes
      const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`
      };
  
      try {
          const resp = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
              headers
          });
          const data = await resp?.json();
          setUserProfile(data);
          console.log(data);
      } catch (error) {
        console.error("Erreur: ", error.message);
      }
  };

    useEffect(() => {
        const getAuth = async () => setAuth(await getCurrentUser());
        getAuth()
    }, []);

    return (
        <AppContext.Provider value={
            {
                auth,
                setAuth,
                getCurrentUser,
                notifications,
                setNotifications,
                notificationCount,
                setNotificationCount,
                userProfile,
                setUserProfile,
                getProfile,
            }
        } >
            {children}
        </AppContext.Provider>
    )
}

// Le hook d'utilisation de AppContext
export const useAppContext = () => useContext(AppContext);
