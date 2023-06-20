import type { NotificationPlacement } from 'antd/es/notification/interface';

enum NoticationValues {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
}

interface NotificationType {
    placement?: NotificationPlacement;
    type: NoticationValues;
    title: string;
    message?: string;
    duration?: number;
}

interface PermissionType {
    screenUrl: string;
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    verify: boolean;
}

export type { NotificationType, PermissionType };
