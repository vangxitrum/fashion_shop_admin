import React, { useContext, useState } from 'react';
import { SystemServices } from '../../../services';

interface NotificationType {
    type: 'success' | 'info' | 'error' | 'warning';
    title: string;
    message?: string;
}

export const AccountContext = React.createContext<any | null>(null);

export function useAccount() {
    const accountContext = useContext(AccountContext);
    if (!accountContext) {
        throw new Error('userContext has to be used within EmployeeProvider');
    }
    return accountContext;
}

export const AccountProvider: React.FC<{ children: any }> = ({ children }) => {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [notifications, setNotifications] = useState<NotificationType | null>(
        null
    );
    const [isFormVisible, setFormVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState(null);
    const [filters, setFilters] = useState<any>({
        page: 1,
        pageSize: 10,
    });

    const toggleFormVisible = (status: boolean, formData?: any) => {
        setFormVisible(status);
        if (!status) {
            setFormData(null);
        } else {
            setFormData(formData);
        }
    };

    const accountState = {
        accounts,
        loading,
        filters,
        total,
        notifications,
        isFormVisible,
        formData,
    };

    const accountActions = {
        setAccounts,

        setFilters,
        toggleFormVisible,
        setTotal,
    };

    return (
        <AccountContext.Provider value={[accountState, accountActions]}>
            {children}
        </AccountContext.Provider>
    );
};
