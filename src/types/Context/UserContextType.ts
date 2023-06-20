import React from 'react';
export interface UserContextType {
    userData: [] | null;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
    total?: number;
    setTotal?: React.Dispatch<React.SetStateAction<number>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isFormVisible: boolean;
    toggleFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
