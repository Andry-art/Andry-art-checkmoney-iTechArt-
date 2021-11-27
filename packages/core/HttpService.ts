/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */


type TokensData = {
  accessToken: string;
  refreshToken: string;
  ok?:boolean;
}

// eslint-disable-next-line no-unused-vars
type FetchCallback = (url: string, param?: object) => Promise<Response>;
type SaveTokenCallback = (response: Promise<any>) => TokensData;
type GetTokenCallback = () => TokensData;

export class ErrorFetch extends Error {
  network: string | number;
  constructor(message: string, network: string | number) {
    super(message);
    this.message = message;
    this.network = network;
  }
}

class HttpService {
  private fetch: FetchCallback;
  private FetchResponse: FetchCallback;

  private getToken: GetTokenCallback;

  private saveToken: SaveTokenCallback;

  constructor(FetchCallbackResponseFun: FetchCallback, fetchFunc: FetchCallback, getTokensFunc: GetTokenCallback, saveTokensFunc: SaveTokenCallback) {
    this.FetchResponse = FetchCallbackResponseFun,
    this.fetch = fetchFunc;
    this.getToken = getTokensFunc;
    this.saveToken = saveTokensFunc;
  }

 

  public async authGet(url: string, limit: number = 1): Promise<object|undefined> {
    const tokens = this.getToken();
    let response 

    try {
      response = await this.fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });

      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON
      } 
       if (response.status === 401 && limit === 1) {
        await this.refreshToken(tokens.refreshToken);
        return await this.authGet(url, 0);
      } 
       if(response.status === 401){
        throw new ErrorFetch('authGet error1', response.status);
      }
      throw new ErrorFetch('authGet error2', 'error');
      
    } catch (error) {
    
         throw error
    }
  }


  public async authPost<T>(url: string, params: any, limit: number = 1): Promise<T | undefined> {
    const tokens = this.getToken();
    let response;

    try {
      response = await this.fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({
          params,
        }),
      });

      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON
      }

      if (response.status === 401 && limit === 1) {
        await this.refreshToken(tokens.refreshToken);
       return await this.authPost(url, params, limit - 1);
      }
      if(response.status === 401){
        throw new ErrorFetch('authPost error1', response.status);
      }
      throw new ErrorFetch('authPost error2', ' error');
    } catch (error) {
    
      throw error
    }
  }

  public async authPut<T>(url: string, params: any, limit: number = 1): Promise<T | undefined> {
    const tokens = this.getToken();
    let response;

    try {
      response = await this.fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({
          params,
        }),
      });

      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON
      }

      if (response.status === 401 && limit === 1) {
        await this.refreshToken(tokens.refreshToken);
        await this.authPut(url, params, limit - 1);
      } if(response.status === 401){
        throw new ErrorFetch('authPut error1', response.status);
      }

      throw new ErrorFetch('authPut error2', 'network error');
    } catch (error) {
     
      throw error
        
    }
  }

  public async authDelete(url: string, params: any, limit: number = 1): Promise<void> {
    const tokens = this.getToken();
    let response;

    try {
      response = await this.fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({
          params,
        }),
      });

      if(response.status === 200){
        return await response.json()
      }

      if (response.status === 401 && limit === 1) {
        await this.refreshToken(tokens.refreshToken);
        await this.authDelete(url, params, limit - 1);
      }
      if (response.status === 401) {
        throw new ErrorFetch('authDelete error1', response.status);
      }

      throw new ErrorFetch('authDelete error2', 'network error');
    } catch (error) {
     
        throw error
        
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
        return responseData
      }
      if(response.status === 401){
      throw new ErrorFetch('auth error1', response.status);
      }

      throw new ErrorFetch('auth error2', 'network error');
    } catch (error) {
      
        throw error
    }
  }

  public async refreshToken(token: string): Promise<any> {
    let response;

    try {
      response = await this.FetchResponse('api/auth/refreshToken', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      })

      if (response.ok) {
       let responseJSON = await response.json()
        this.saveToken(responseJSON);
       return responseJSON
      } 
      if(response.status === 201){
      throw new ErrorFetch('refreshToken error1', response.status);
      }
     
      throw new ErrorFetch('refreshToken error2', 'network error');
    } catch (error) {
      console.log(error)
        throw error
    }
  }
}

export default HttpService;
