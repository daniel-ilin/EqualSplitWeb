import createHttpError, { HttpError } from "http-errors";
import Cookies from "js-cookie";
import { Constants } from "./Constants";

import axios, { AxiosError } from "axios";

class APIService {
  async getAccessToken() {
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
      throw new Error("Could not add transaction.");
    }

    const result = (await response.json()) as ApiReponse;
    return result;
  }

  async deleteTransaction(id: string, sessionid: string) {
    const endpoint = `${Constants.API_ADDRESS}/transaction`;
    const accessToken = Cookies.get("access-token");

    const body = JSON.stringify({
      id: id,
      sessionid: sessionid,
    });

    const response = await fetch(endpoint, {
      method: "delete",
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
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${accessToken}`,
        },
        body: body,
      });

      const result = (await response.json()) as ApiReponse;
      return result;
    } else if (!response.ok) {
      throw new Error("Could not delete transaction.");
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
      throw new Error("Could not post session.");
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
      throw new Error("Could not join session.");
    }

    const result = (await response.json()) as ApiReponse;
    return result;
  }

  async login(email: string, password: string) {
    const endpoint = `${Constants.API_ADDRESS}/login`;

    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    let params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    const response = await axios.post<TokensResponse>(endpoint, params, config);

    Cookies.set("refresh-token", response.data.refreshToken);
    Cookies.set("access-token", response.data.accessToken);

    return response;
  }

  async logout() {
    const endpoint = `${Constants.API_ADDRESS}/logout`;

    const response = await fetch(endpoint, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${Cookies.get("refresh-token")}`,
      },
      credentials: "include",
    });

    Cookies.remove("access-token");
    Cookies.remove("refresh-token");

    if (!response.ok) {
      const result = (await response.json()) as ApiReponse;
      throw new Error(result.error || "Could not logout");
    }
  }

  async changeUsername(newname: string) {
    const accessToken = Cookies.get("access-token");

    const endpoint = `${Constants.API_ADDRESS}/users`;

    const body = JSON.stringify({
      newname: newname,
    });

    const response = await fetch(endpoint, {
      method: "put",
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
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${accessToken}`,
        },
        body: body,
      });

      const result = (await response.json()) as ApiReponse;
      return result;
    } else if (!response.ok) {
      throw new Error("Could not change username.");
    }

    const result = (await response.json()) as ApiReponse;
    return result;
  }

  async register(name: string, email: string, password: string) {
    const endpoint = `${Constants.API_ADDRESS}/register`;

    const body = JSON.stringify({
      email: email,
      name: name,
      password: password,
    });

    const response = await fetch(endpoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error("Could not register.");
    }

    const result = (await response.json()) as ApiReponse;
    return result;
  }

  async deleteSession(id: string) {
    const endpoint = `${Constants.API_ADDRESS}/session`;

    const accessToken = Cookies.get("access-token");

    const body = JSON.stringify({
      sessionid: id,
    });

    const response = await fetch(endpoint, {
      method: "DELETE",
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
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${accessToken}`,
        },
        body: body,
      });

      const result = (await response.json()) as ApiReponse;
      return result;
    } else if (!response.ok) {
      throw new Error("Could not delete session.");
    }

    const result = (await response.json()) as ApiReponse;
    return result;
  }

  async removeUser(userid: string, sessionid: string) {
    const endpoint = `${Constants.API_ADDRESS}/session/user`;

    const accessToken = Cookies.get("access-token");

    const body = JSON.stringify({
      targetid: userid,
      sessionid: sessionid,
    });

    const response = await fetch(endpoint, {
      method: "DELETE",
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
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${accessToken}`,
        },
        body: body,
      });

      const result = (await response.json()) as ApiReponse;
      return result;
    } else if (!response.ok) {
      throw new Error("Could not remove user.");
    }

    const result = (await response.json()) as ApiReponse;
    return result;
  }

  async changeTransaction(id: string, amount: number, description: string) {
    const endpoint = `${Constants.API_ADDRESS}/transaction`;
    const accessToken = Cookies.get("access-token");

    const body = JSON.stringify({
      id: id,
      description: description,
      amount: amount,
    });

    const response = await fetch(endpoint, {
      method: "put",
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
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${accessToken}`,
        },
        body: body,
      });

      const result = (await response.json()) as ApiReponse;
      return result;
    } else if (!response.ok) {
      throw new Error("Could not change transaction.");
    }

    const result = (await response.json()) as ApiReponse;
    return result;
  }

  async renameSession(id: string, name: string) {
    const endpoint = `${Constants.API_ADDRESS}/session`;

    const accessToken = Cookies.get("access-token");

    const body = JSON.stringify({
      sessionid: id,
      name: name,
    });

    const response = await fetch(endpoint, {
      method: "put",
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
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${accessToken}`,
        },
        body: body,
      });

      const result = (await response.json()) as ApiReponse;
      return result;
    } else if (!response.ok) {
      throw new Error("Could not rename session.");
    }

    const result = (await response.json()) as ApiReponse;
    return result;
  }
}

const apiService = new APIService();
Object.freeze(apiService);
export default apiService;
