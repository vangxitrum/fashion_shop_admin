export interface UserType {
    key: React.Key | null;
    id: string | number | null;
    address?: string;
    avatar?: string;
    fullname?: string;
    username?: string;
    email?: string;
    status?: string;
    created_at: string;
    created_by: string;
    phone_number?: string;
    updated_at?: string;
    updated_by?: string;
}
