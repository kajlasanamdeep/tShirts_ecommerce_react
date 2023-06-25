export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}

export interface IChangePasswordEye {
    oldPassword: boolean;
    newPassword: boolean;
}

export interface IChangePasswordPayload extends IChangePassword {
    token: string;
}
