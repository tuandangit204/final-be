export interface IPost {
    id: string;
    title: string;
    author: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ICreatePostParams = Omit<IPost, 'id' | 'createdAt' | 'updatedAt'>; 