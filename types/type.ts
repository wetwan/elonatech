export interface Task {
    _id: string;
    name: string;
    description: string;
    status: 'pending' | 'completed' | string;
    createdAt: string;
    user?: string;
}
