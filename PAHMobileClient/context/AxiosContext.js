import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';
import config from '../config';

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
    const authContext = useContext(AuthContext);

    const authAxios = axios.create({
        baseURL: config.BASE_API_URL,
    });

    const publicAxios = axios.create({
        baseURL: config.BASE_API_URL,
    });

    authAxios.interceptors.request.use(
        authConfig => {
            if (!authConfig.headers.Authorization) {
                authConfig.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
            }
            
            return authConfig;
        },
        error => {
            return Promise.reject(error);
        },
    );

    const refreshAuthLogic = async failedRequest => {
        
        const data = {
            accessToken: authContext.authState.accessToken,
            refreshToken: authContext.authState.refreshToken,
        };

        const options = {
            method: 'POST',
            data,
            url: `${config.BASE_API_URL}/refresh`,
        };

        try {
            console.log('refresh token');
            const tokenRefreshResponse = await axios(options);
            failedRequest.response.config.headers.Authorization =
                'Bearer ' + tokenRefreshResponse.data.data.accessToken;

            authContext.setAuthState({
                ...authContext.authState,
                accessToken: tokenRefreshResponse.data.data.accessToken,
            });

            await Keychain.setGenericPassword(
                'token',
                JSON.stringify({
                    accessToken: tokenRefreshResponse.data.data.accessToken,
                    refreshToken: authContext.authState.refreshToken,
                }));
            return await Promise.resolve();
        } catch (e) {
            authContext.setAuthState({
                accessToken: null,
                refreshToken: null,
            });
        }
    };

    createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

    return (
        <Provider
            value={{
                authAxios,
                publicAxios,
            }}>
            {children}
        </Provider>
    );
};

export { AxiosContext, AxiosProvider };