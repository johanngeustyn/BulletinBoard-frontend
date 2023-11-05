export interface DecodedToken {
    id: string;
    username: string;
    role: string;
    department: string;
    iat: number;
    exp: number;
}  