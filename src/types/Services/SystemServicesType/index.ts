interface CommonRequestParamsTypes {
    page: string | number;
    pageSize: string | number;
    status?: boolean;
    keyword?: string;
}

interface DetailAccountParamsType {
    userId?: string;
    username?: string;
}

export type { CommonRequestParamsTypes, DetailAccountParamsType };
