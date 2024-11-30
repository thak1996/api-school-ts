export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
}

export interface RegisterUser {
    username: string;
    password: string;
    email: string;
}

export interface LoginUser {
    username: string;
    password: string;
}