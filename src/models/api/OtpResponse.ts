export interface IOtp {
    otp: string;
    newPassword: string;
}

export interface IOtpPayload extends IOtp {
    email: string;
}

export interface IOtpResponse {
    message: string;
    error: string;
    data: string;
    status: number;
}
