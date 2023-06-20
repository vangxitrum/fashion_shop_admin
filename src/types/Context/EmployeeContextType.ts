import React from 'react';
export interface EmployeeContextType {
    employeeData: [] | null;
    setEmployeeData: React.Dispatch<React.SetStateAction<any>>;
    total?: number;
    setTotal?: React.Dispatch<React.SetStateAction<number>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
