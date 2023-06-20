import React, { useContext, useState } from 'react';
import { SystemServices } from '../../../services';

interface NotificationType {
    type: 'success' | 'info' | 'error' | 'warning';
    title: string;
    message?: string;
}

export const RoleGroupContext = React.createContext<any | null>(null);

export function useRoleGroups() {
    const roleGroupContext = useContext(RoleGroupContext);
    if (!roleGroupContext) {
        throw new Error(
            'roleGroupContext has to be used within EmployeeProvider'
        );
    }
    return roleGroupContext;
}

export const RoleGroupProvider: React.FC<{ children: any }> = ({
    children,
}) => {
    const [roles, setRoles] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

    const [roleGroups, setRoleGroups] = useState<any[]>([]);
    const [roleGroupsLoading, setRoleGroupsLoading] = useState<boolean>(false);

    const [notifications, setNotifications] = useState<NotificationType | null>(
        null
    );
    const [isFormVisible, setFormVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState(null);

    const [isPermissionFormVisible, setPermissionFormVisible] =
        useState<boolean>(false);
    const [permissionsFormData, setPermissionFormData] = useState<any | null>(
        null
    );

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

    const togglePermissionFormVisible = (status: boolean, formData?: any) => {
        setPermissionFormVisible(status);
        if (!status) {
            setPermissionFormData(null);
        } else {
            setPermissionFormData(formData);
        }
    };

    const roleGroupsState = {
        roles,
        roleGroups,
        loading,
        filters,
        total,
        notifications,
        isFormVisible,
        formData,
        roleGroupsLoading,
        permissionsFormData,
        isPermissionFormVisible,
    };

    const roleGroupsActions = {
        setRoles,
        setFilters,
        toggleFormVisible,
        setTotal,
        togglePermissionFormVisible,
    };

    return (
        <RoleGroupContext.Provider value={[roleGroupsState, roleGroupsActions]}>
            {children}
        </RoleGroupContext.Provider>
    );
};
