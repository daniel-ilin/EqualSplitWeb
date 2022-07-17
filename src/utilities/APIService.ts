import Cookies from "js-cookie";
import { Constants } from "./Constants";

const axios = require("axios").default;

class APIService {
  async getAccessToken() {
    const refreshToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNGVlZjMwNjZkZmVlNTc4M2Y0ZGNiMDM3ZjZmMzFhYWEiLCJlbWFpbCI6InRlc3QxIiwiaWF0IjoxNjU3OTgyMjYxLCJleHAiOjE3NTI2NTUwNjF9.TMLZHHS2A6Rg7QxPM3g2ZThzc7RRho4zCWluYWXAw-A";
    Cookies.set("refresh-token", refreshToken);

    let config = {
      headers: {
        "x-auth-token": `${Cookies.get("refresh-token")}`,
      },
    };

    const result = await axios.get(
      `${Constants.API_ADDRESS}/login/token`,
      config
    );

    if (result.data.error !== undefined) {
      console.log(result.data.error);
      throw new Error(result.data.error || "Could not get the token");
    }
    Cookies.set("access-token", result.data.accessToken);
    return;
  }

  async getAllUserData() {
    const endpoint = `${Constants.API_ADDRESS}/users`;
    const accessToken = Cookies.get("access-token");

    const response = await fetch(endpoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${accessToken}`,
      },
    });

    if (response.status === 401) {
      await apiService.getAccessToken();

      const accessToken = Cookies.get("access-token");

      const response = await fetch(endpoint, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${accessToken}`,
        },
      });

      const result = (await response.json()) as UserData;
      return result;
    } else if (!response.ok) {
      throw new Error("Could not get user data.");
    }

    const result = (await response.json()) as UserData;
    return result;
  }

  async addTransaction(
    sessionid: string,
    description: string,
    amount: number,
    targetid: string
  ) {
    const endpoint = `${Constants.API_ADDRESS}/transaction`;
    const accessToken = Cookies.get("access-token");

    const body = JSON.stringify({
      sessionid: sessionid,
      description: description,
      amount: amount,
      targetid: targetid,
    });

    const response = await fetch(endpoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${accessToken}`,
      },
      body: body,
    });

    if (response.status === 401) {
      await apiService.getAccessToken();

      const accessToken = Cookies.get("access-token");

      const response = await fetch(endpoint, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${accessToken}`,
        },
        body: body,
      });

      const result = (await response.json()) as ApiReponse;
      return result;
    } else if (!response.ok) {
      throw new Error("Could not get user data.");
    }

    const result = (await response.json()) as ApiReponse;
    return result;
  }

  async postSession(name: string) {
    const endpoint = `${Constants.API_ADDRESS}/session`;
    const accessToken = Cookies.get("access-token");

    const body = JSON.stringify({
      name: name,
    });

    const response = await fetch(endpoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${accessToken}`,
      },
      body: body,
    });

    if (response.status === 401) {
      await apiService.getAccessToken();

      const accessToken = Cookies.get("access-token");

      const response = await fetch(endpoint, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${accessToken}`,
        },
        body: body,
      });

      const result = (await response.json()) as ApiReponse;
      return result;
    } else if (!response.ok) {
      throw new Error("Could not get user data.");
    }

    const result = (await response.json()) as ApiReponse;
    return result;
  }

  async joinSession(sessionCode: string) {
    const accessToken = Cookies.get("access-token");

    const endpoint = `${Constants.API_ADDRESS}/session/join`;

    const body = JSON.stringify({
      sessionCode: sessionCode,
    });

    const response = await fetch(endpoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${accessToken}`,
      },
      body: body,
    });

    if (response.status === 401) {
      await apiService.getAccessToken();

      const accessToken = Cookies.get("access-token");

      const response = await fetch(endpoint, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${accessToken}`,
        },
        body: body,
      });

      const result = (await response.json()) as ApiReponse;
      return result;
    } else if (!response.ok) {
      throw new Error("Could not get user data.");
    }

    const result = (await response.json()) as ApiReponse;
    return result;
  }
}

const apiService = new APIService();
Object.freeze(apiService);
export default apiService;
