/* eslint-disable prettier/prettier */
export type TokenResponse = {
    expires:string;
    secret:string;
    refreshSecret:string;
    refreshExpires:string;
    access:string;
}