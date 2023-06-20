type statusType = 'active' | 'inactive' | 'deleted';

interface AccountType {
    created_at: string;
    created_by: string;
    email: string;
    fullname: string;
    id: string;
    status: statusType;
    avtar: string;
    username: string;
    phone_number?: string;
    address?: string;
    updated_at?: string;
    updated_by?: string;
}

export type { AccountType };
