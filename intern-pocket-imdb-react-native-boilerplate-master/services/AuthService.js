import { AsyncStorage } from "react-native";
import ApiService from "./ApiService";
import config from "../config";

const ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/logout",
  UNIQUE: "/auth/unique",
  VERIFY: "/auth/verify"
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

  verify = async userData => {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    const { data } = await this.apiClient.post(ENDPOINTS.VERIFY, {user, code: userData});
    if (data !== 'FAIL') await this.createSession(data);
    return data;
  }
  // checking if email is unique
  unique = async email => {
    const { data } = await this.apiClient.post(ENDPOINTS.UNIQUE, {email});
    return data.unique;
  }
  // end
  logout = async () => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGOUT);
    await this.destroySession();
    return { ok: true, data };
  };

  signup = async signupData => {
    const {data} = await this.apiClient.post(ENDPOINTS.REGISTER, signupData);
    return data;
  };

  getToken = async () => {
    const user = await AsyncStorage.getItem("user");
    return user ? JSON.parse(user).token : undefined;
  };

  getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
  };
}

const authService = new AuthService();
export default authService;
