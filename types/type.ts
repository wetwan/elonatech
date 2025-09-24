export interface TaskProp {
    _id: string;
    name: string;
    description: string;
    status: 'pending' | 'completed' | string;
    createdAt: string;
    user?: string;
}
