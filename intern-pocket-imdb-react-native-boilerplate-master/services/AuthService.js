import { AsyncStorage } from "react-native";
import ApiService from "./ApiService";
import config from "../config";

const ENDPOINTS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  LOGOUT: "/logout"
};

class AuthService extends ApiService {
  constructor() {
    super();
    this.init();
  }

  init = async () => {
    this.setAuthorizationHeader();
  };

  setAuthorizationHeader = async () => {
    const token = await this.getToken();
    if (token) {
      this.api.attachHeaders({
        Authorization: `Bearer ${token}`
      });
    }

    this.api.attachHeaders({
      clientId: config.CLIENT_ID
    });
  };

  createSession = async user => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    await this.setAuthorizationHeader();
  };

  destroySession = async () => {
    await AsyncStorage.clear();
    this.api.removeHeaders(["Authorization"]);
  };

  login = async loginData => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, loginData);
    await this.createSession(data);
    return data;
  };

  logout = async () => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGOUT);
    await this.destroySession();
    return { ok: true, data };
  };

  signup = async signupData => {
    const { data } = await this.apiClient.post(ENDPOINTS.REGISTER, signupData);

    return data;
  };

  getToken = async () => {
    const user = await AsyncStorage.getItem("user");
    return user ? JSON.parse(user).access_token : undefined;
  };

  getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
  };
}

const authService = new AuthService();
export default authService;
