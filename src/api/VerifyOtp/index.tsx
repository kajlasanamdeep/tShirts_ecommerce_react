import { ApiClient } from "api/ApiClient";
import { IOtpPayload, IOtpResponse } from "models/api/OtpResponse";
import { Endpoints } from "utils/Endpoints";

export const VerifyOtp = async (data: IOtpPayload) => {
    const url = await ApiClient.post(Endpoints.OTP, data);
    const response: IOtpResponse = url.data;

    if (response.status === 200) {
        return response;
    }

    throw new Error("Unable to verify OTP");
};
