
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable max-len */



import HttpService from './HttpService';
import {ErrorFetch} from './HttpService'




describe('function to be called with', () => {
  const mockFetchErrorResponse = jest.fn().mockReturnValue({ json: () => { } })
  const mockFetch = jest.fn().mockReturnValue({ json: () => { } });
  const saveToken = jest.fn().mockReturnValue({ json: () => { } });
  const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}));
  const http = new HttpService(mockFetchErrorResponse,mockFetch, saveToken, getToken);
  const params = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  const email = "randomUser@mail.com"
  const password = "123123"
  const tokens = getToken();
  const token = "nkgwjnrgwkj4234"

  it('authGet', () => {
    http.authGet('https://jsonplaceholder.typicode.com/posts');
    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET',
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    });
  })

  it('authPost', () => {
    http.authPost('https://jsonplaceholder.typicode.com/posts', params)
    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              headers: { Authorization: `Bearer ${tokens.accessToken}`},
              body: JSON.stringify({params}),
          });
  })

  it('authPut', () => {
    http.authPut('https://jsonplaceholder.typicode.com/posts', params)
    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', {
              method: 'PUT',
              headers: { Authorization: `Bearer ${tokens.accessToken}`},
              body: JSON.stringify({params}),
          });
  })

  it('authDelete', () => {
    http.authDelete('https://jsonplaceholder.typicode.com/posts', params)
    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${tokens.accessToken}`},
              body: JSON.stringify({params}),
          });
  })

  it('auth', () => {
    http.auth('https://jsonplaceholder.typicode.com/posts', email, password)
    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
              body: JSON.stringify({email, password}),
          });
  })

  it('refreshTokens', () => {
    http.refreshToken(token)
    expect(mockFetchErrorResponse).toBeCalledWith('api/auth/refreshToken', {
              method: 'POST',
              headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
              body: JSON.stringify({token}),
          });
  })

})


  describe('errors', () => {
   const mockFetchErrorResponse = jest.fn().mockReturnValue({
     ok: true,
     json: () => {
       return {accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"};   
     }
   }
 );
    const mockFetchErrorFetch = jest.fn().mockReturnValue({ok: false})
    const mockFetchErrorStatus = jest.fn().mockReturnValue({ok: false, status: 401})
    const saveToken = jest.fn().mockReturnValue({  })
    const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
    const httpErrorFetch = new HttpService(mockFetchErrorResponse,mockFetchErrorFetch, getToken, saveToken)
    const httpErrorStatus = new HttpService(mockFetchErrorResponse,mockFetchErrorStatus, getToken, saveToken)
    const params = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    const email = "randomUser@mail.com"
    const password = "123123"
   

  

    it('authGet error', () => {
     httpErrorFetch.authGet('wwwwwwww').catch(e => expect(e).toEqual(new ErrorFetch('authGet error2', 'error')))
     httpErrorStatus.authGet('wwwwwww').catch(e => expect(e).toEqual(new ErrorFetch('authGet error1', 401)))
    })

    it('authPost error', () => {
      httpErrorFetch.authPost('wwwwwwww',params).catch(e => expect(e).toEqual(new ErrorFetch('authPost error2', 'error')))
      httpErrorStatus.authPost('wwwwwww', params).catch(e => expect(e).toEqual(new ErrorFetch('authPost error1', 401)))
    })

    it('authPut error', () => {
      httpErrorFetch.authPut('wwwwwwww',params).catch(e => expect(e).toEqual(new ErrorFetch('authPut error2', 'error')))
      httpErrorStatus.authPut('wwwwwww', params).catch(e => expect(e).toEqual(new ErrorFetch('authPut error1', 401)))
    })

    it('authDelete error', () => {
      httpErrorFetch.authDelete('wwwwwwww',params).catch(e => expect(e).toEqual(new ErrorFetch('authDelete error2', 'error')))
      httpErrorStatus.authDelete('wwwwwww', params).catch(e => expect(e).toEqual(new ErrorFetch('authDelete error1', 401)))
    })
    
    it('auth error', () => {
      httpErrorFetch.auth('wwwwwwww', email, password).catch(e => expect(e).toEqual(new ErrorFetch('auth error2', 'error')))
      httpErrorStatus.auth('wwwwwww', email, password).catch(e => expect(e).toEqual(new ErrorFetch('auth error1', 401)))
    })
  
  });

  it('refreshToken error', () => {
    const mockFetchErrorResponse = jest.fn().mockReturnValue({})
     const mockFetchErrorFetch = jest.fn().mockReturnValue({ok: false})
     const mockFetchErrorStatus = jest.fn().mockReturnValue({ok: false, status: 201})
     const saveToken = jest.fn().mockReturnValue({  })
     const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
     const httpErrorFetch = new HttpService(mockFetchErrorFetch,mockFetchErrorResponse, getToken, saveToken)
     const httpErrorStatus = new HttpService(mockFetchErrorStatus, mockFetchErrorResponse, getToken, saveToken)
     const token = "nkgwjnrgwkj4234"

    httpErrorFetch.refreshToken(token).catch(e => expect(e).toEqual(new ErrorFetch('refreshToken error2', 'error')))
    httpErrorStatus.refreshToken(token).catch(e => expect(e).toEqual(new ErrorFetch('refreshToken error1', 401)))
  })
   


  describe('return value', () => {
    const mockFetch= jest.fn().mockReturnValue({
      ok: true,
      status: 200,
      json: () => {
        return {accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"};   
      }
    }
  );
     const saveToken = jest.fn().mockReturnValue({  })
     const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
     const http = new HttpService(mockFetch, mockFetch, getToken, saveToken)
     const params = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
     const email = "randomUser@mail.com"
     const password = "123123"
     const token = "nkgwjnrgwkj4234"

     it('authGet', async ()=>{
      const data = await http.authGet('evwevw')
      expect(data).toEqual({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"})
     })

     it('authPost', async ()=>{
      const data = await http.authPost('evwevw', params)
      expect(data).toEqual({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"})
     })

     it('authPut', async ()=>{
      const data = await http.authPut('evwevw', params)
      expect(data).toEqual({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"})
     })

     it('authDelete', async ()=>{
      const data = await http.authDelete('evwevw', params)
      expect(data).toEqual({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"})
     })

     it('auth', async ()=>{
      const data = await http.auth('evwevw', email, password)
      expect(data).toEqual({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"})
     })

     it('refreshToken', async ()=>{
      const data = await http.refreshToken(token)
      expect(data).toEqual({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"})
     })
  })



 

