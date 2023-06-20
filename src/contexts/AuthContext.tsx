import React, { useState, useContext, useEffect } from 'react';
import { UserServices } from '../services';

interface AuthUserType {
    address: string;
    created_at: string;
    created_by: string;
    email: string;
    fullname: string;
    username: string | null;
    phone_number?: string;
    photo?: string;
    updated_at?: string;
    updated_by?: string;
}

interface AuthContextType {
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    authUser: AuthUserType | null;
    setAuthUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('authContext has to be used within AuthProvider');
    }
    return authContext;
}

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        if (!authUser) {
            getCurrentUser();
        }
    }, []);

    const getCurrentUser = async () => {
        try {
            const res: any = await UserServices.getCurrentUser();
            setAuthUser(res.data);
            setIsLogged(true);
        } catch (error) {
            setIsLogged(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                setIsLogged,
                authUser,
                setAuthUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export type { AuthContextType, AuthUserType };
