export interface UserInterface {
    DateCreated: string;
    Email: string;
    IsActive: boolean;
    Phone: string;
    RoleID: boolean;
    SendEmail: boolean;
    SendSMS: boolean;
    Username: string;
}

export interface AuthAtomInterface {
    isAuthenticated: boolean;
    token: string | null;
    user: UserInterface | null;
}
