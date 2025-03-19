export interface User {
    id: string;
    email: string;
    password?: string;
    googleId?: string;
}

export interface AuthPayload {
    email: string;
    password: string;
}

export interface GoogleAuthPayload {
    idToken: string;
}