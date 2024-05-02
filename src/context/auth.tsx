import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface UserType {
    user: string | null;
    setUser: (user: string | null) => void
}

const UserContext = createContext<UserType | undefined> (undefined)

interface UserProviderProps {
    children: ReactNode; // Define children prop
  }

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUserState] = useState<string | null> (() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    })

    const setUser = (newUser : string | null) => {
        setUserState(newUser)
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };