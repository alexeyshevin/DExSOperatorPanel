export interface IUserModel {
    id: number;
    firstName: string;
    secondName: string;
    role: string;
    password: string;
    loginTime: Date | undefined;
    isDeleted: boolean;
};
