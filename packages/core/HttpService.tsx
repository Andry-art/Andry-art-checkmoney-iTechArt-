/* eslint-disable consistent-return */
// eslint-disable-next-line max-classes-per-file
type TokensData = {
  accessToken: string;
  refreshToken: string;
};

type FetchCallback = (url: string, param?: object) => Promise<Response>;
type SaveTokenCallback = (response: Promise<any>) => Promise<TokensData>;
type GetTokenCallback = () => Promise<TokensData>;

export class ErrorFetch extends Error {
  code: number;

  isNetwork: boolean;

  constructor(message: string, code: number, isNetwork: boolean) {
    super(message);
    this.message = message;
    this.code = code;
    this.isNetwork = isNetwork;
  }
}

class HttpService {
  private readonly fetch: FetchCallback;

  private readonly getToken: GetTokenCallback;

  private readonly saveToken: SaveTokenCallback;

  constructor(
    fetchFunc: FetchCallback,
    getTokensFunc: GetTokenCallback,
    saveTokensFunc: SaveTokenCallback,
  ) {
    this.fetch = fetchFunc;
    this.getToken = getTokensFunc;
    this.saveToken = saveTokensFunc;
  }

  public async authGet<T>(url: string, limit: number = 1): Promise<T | undefined> {
    const tokens = await this.getToken();
    let response;

    try {
      response = await this.fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });

      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
      }
      if (response.status === 401 && limit === 1) {
        await this.refreshToken(tokens.refreshToken);
        return await this.authGet(url, 0);
      }
      if (response.status === 401) {
        throw new ErrorFetch('authGet error', response.status, false);
      }
      throw new ErrorFetch('authGet error', response.status, true);
    } catch (error) {
      if (error instanceof (ErrorFetch)) {
        throw error;
      } else {
        console.log(error);
      }
    }
  }

  public async authPost<T>(url: string, params: any, limit: number = 1): Promise<T | undefined> {
    const tokens = await this.getToken();
    let response;

    try {
      response = await this.fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify(
          params,
        ),
      });

      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
      }

      if (response.status === 401 && limit === 1) {
        await this.refreshToken(tokens.refreshToken);
        return await this.authPost(url, params, 0);
      }
      if (response.status === 401) {
        throw new ErrorFetch('authPost error', response.status, false);
      }

      throw new ErrorFetch('authPost error', response.status, true);
    } catch (error) {
      if (error instanceof (ErrorFetch)) {
        throw error;
      } else {
        console.log(error);
      }
    }
  }

  public async authPut<T>(url: string, params: any, limit: number = 1): Promise<T | undefined> {
    const tokens = await this.getToken();
    let response;

    try {
      response = await this.fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify(
          params,
        ),
      });

      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
      }

      if (response.status === 401 && limit === 1) {
        await this.refreshToken(tokens.refreshToken);
        return await this.authPut(url, params, limit - 1);
      }
      if (response.status === 401) {
        throw new ErrorFetch('authPut error', response.status, false);
      }

      throw new ErrorFetch('authPut error', response.status, true);
    } catch (error) {
      if (error instanceof (ErrorFetch)) {
        throw error;
      } else {
        console.log(error);
      }
    }
  }

  public async authDelete(url: string, params: any, limit: number = 1): Promise<void> {
    const tokens = await this.getToken();
    let response;

    try {
      response = await this.fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify(
          params,
        ),
      });

      if (response.status === 200) {
        return await response.json();
      }

      if (response.status === 401 && limit === 1) {
        await this.refreshToken(tokens.refreshToken);
        return await this.authDelete(url, params, limit - 1);
      }
      if (response.status === 401) {
        throw new ErrorFetch('authDelete error', response.status, false);
      }

      throw new ErrorFetch('authDelete error', response.status, true);
    } catch (error) {
      if (error instanceof (ErrorFetch)) {
        throw error;
      } else {
        console.log(error);
      }
    }
  }

  public async auth<T>(url: string, email: string, password: string): Promise<T | undefined> {
    let response;

    try {
      response = await this.fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        this.saveToken(responseData);
        return responseData;
      }
      if (response.status === 401) {
        throw new ErrorFetch('auth error', response.status, false);
      }

      throw new ErrorFetch('auth error', response.status, true);
    } catch (error) {
      if (error instanceof (ErrorFetch)) {
        throw error;
      } else {
        console.log(error);
      }
    }
  }

  public async refreshToken<T>(token: string): Promise<T | undefined> {
    let response;

    try {
      response = await this.fetch('api/auth/refreshToken', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      });

      if (response.ok) {
        const responseJSON = await response.json();
        await this.saveToken(responseJSON);
        return responseJSON;
      }
      if (response.status === 401) {
        throw new ErrorFetch('refreshToken error', response.status, false);
      }

      throw new ErrorFetch('refreshToken error', response.status, true);
    } catch (error) {
      if (error instanceof (ErrorFetch)) {
        throw error;
      } else {
        console.log(error);
      }
    }
  }
}

export default HttpService;
