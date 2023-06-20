export interface EmployeeType {
    key: React.Key | null;
    id: string | number | null;
    name: string;
    birday: string;
    address?: string;
    createAt?: string;
    createBy?: string;
    updateAt?: string;
    updateBy?: string;
}
