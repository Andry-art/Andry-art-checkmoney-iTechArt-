
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable max-len */



import HttpService from './HttpService';
import {ErrorFetch} from './HttpService';



  it('authGet fetch', async () => {
    const mockFetch = jest.fn().mockReturnValue({ok: true, json: () => {}});
    const saveToken = jest.fn().mockReturnValue({});
    const getToken = jest.fn().mockReturnValue({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"});
    const http = new HttpService(mockFetch, getToken, saveToken);
    const tokens = getToken();

    await http.authGet('https://jsonplaceholder.typicode.com/posts');
    
    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET',
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    });
  })


  it('authPost fetch', async () => {
    const mockFetch = jest.fn().mockReturnValue({ok: true, json: () => {}});
    const saveToken = jest.fn().mockReturnValue({});
    const getToken = jest.fn().mockReturnValue({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"});
    const http = new HttpService(mockFetch, getToken, saveToken);
    const tokens = getToken();
    const params = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

    await http.authPost('https://jsonplaceholder.typicode.com/posts', params)
    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              headers: { Authorization: `Bearer ${tokens.accessToken}`},
              body: JSON.stringify(params),
          });
  })

  it('authPut fetch', async () => {
    const mockFetch = jest.fn().mockReturnValue({ok: true, json: () => {}});
    const saveToken = jest.fn().mockReturnValue({ json: () => { } });
    const getToken = jest.fn().mockReturnValue({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"});
    const http = new HttpService(mockFetch, getToken, saveToken);
    const tokens = getToken();
    const params = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

    await http.authPut('https://jsonplaceholder.typicode.com/posts', params)
    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', {
              method: 'PUT',
              headers: { Authorization: `Bearer ${tokens.accessToken}`},
              body: JSON.stringify(params),
          });
  })


  it('authDelete fetch', async () => {
    const mockFetch = jest.fn().mockReturnValue({ok: true, status: 200, json: () => {}});
    const saveToken = jest.fn().mockReturnValue({ json: () => { } });
    const getToken = jest.fn().mockReturnValue({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"});
    const http = new HttpService(mockFetch, getToken, saveToken);
    const tokens = getToken();
    const params = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

    await http.authDelete('https://jsonplaceholder.typicode.com/posts', params)
    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${tokens.accessToken}`},
              body: JSON.stringify(params),
          });
  })


  it('auth fetch', async () => {
    const mockFetch = jest.fn().mockReturnValue({ok: true, json: () => {}});
    const saveToken = jest.fn().mockReturnValue({ json: () => { } });
    const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}));
    const http = new HttpService(mockFetch, getToken, saveToken);
    const email = "randomUser@mail.com"
    const password = "123123"

    await http.auth('https://jsonplaceholder.typicode.com/posts', email, password)
    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
              body: JSON.stringify({email, password}),
          });
  })

  it('refreshTokens fetch', async () => {
    const mockFetch = jest.fn().mockReturnValue({ok: true, json: () => {}});
    const saveToken = jest.fn().mockReturnValue({ json: () => { } });
    const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}));
    const http = new HttpService(mockFetch, getToken, saveToken);
    const token = "nkgwjnrgwkj4234"

    await http.refreshToken(token)
    expect(mockFetch).toBeCalledWith('api/auth/refreshToken', {
              method: 'POST',
              headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
              body: JSON.stringify({token}),
          });
  })
  

    it('authGet error fetch', () => {
      const mockFetch = jest.fn().mockReturnValue({ok: false})
      const saveToken = jest.fn().mockReturnValue({  })
      const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
      const http = new HttpService(mockFetch, getToken, saveToken)

     http.authGet('wwwwwwww').catch(e => expect(e).toEqual(new ErrorFetch('authGet error',  404, true)))
    })


    it('authGet error 401', () => {
      const mockFetch =  jest.fn().mockReturnValueOnce({ok: false, status: 401}).mockReturnValueOnce({
        ok: true,
        json: () => {
          return {accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"};   
        }
      }).mockReturnValueOnce({ok: false, status: 401})
      const saveToken = jest.fn().mockReturnValue({  })
      const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
      const http = new HttpService(mockFetch, getToken, saveToken)

      http.authGet('wwwwwww').catch(e => expect(e).toEqual(new ErrorFetch('authGet error', 401, false)))
     })

    it('authPost error fetch', () => {
      const mockFetch = jest.fn().mockReturnValue({ok: false})
      const saveToken = jest.fn().mockReturnValue({  })
      const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
      const http = new HttpService(mockFetch, getToken, saveToken)
      const params = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

     http.authPost('wwwwwwww', params).catch(e => expect(e).toEqual(new ErrorFetch('authPost error',  404, true)))
    })


    it('authPost error 401', () => {
      const mockFetch =  jest.fn().mockReturnValueOnce({ok: false, status: 401}).mockReturnValueOnce({
        ok: true,
        json: () => {
          return {accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"};   
        }
      }).mockReturnValueOnce({ok: false, status: 401})
      const saveToken = jest.fn().mockReturnValue({  })
      const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
      const http = new HttpService(mockFetch, getToken, saveToken)
      const params = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

      http.authPost('wwwwwww', params).catch(e => expect(e).toEqual(new ErrorFetch('authPost error', 401, false)))
     })

    it('authPut error fetch', () => {
      const mockFetch = jest.fn().mockReturnValue({ok: false})
      const saveToken = jest.fn().mockReturnValue({  })
      const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
      const http = new HttpService(mockFetch, getToken, saveToken)
      const params = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

     http.authPut('wwwwwwww', params).catch(e => expect(e).toEqual(new ErrorFetch('authPut error',  404, true)))
    })


    it('authPut error 401', () => {
      const mockFetch =  jest.fn().mockReturnValueOnce({ok: false, status: 401}).mockReturnValueOnce({
        ok: true,
        json: () => {
          return {accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"};   
        }
      }).mockReturnValueOnce({ok: false, status: 401})
      const saveToken = jest.fn().mockReturnValue({  })
      const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
      const http = new HttpService(mockFetch, getToken, saveToken)
      const params = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

      http.authPut('wwwwwww', params).catch(e => expect(e).toEqual(new ErrorFetch('authPut error', 401, false)))
     })

    it('authDelete error fetch', () => {
      const mockFetch = jest.fn().mockReturnValue({ok: false})
      const saveToken = jest.fn().mockReturnValue({  })
      const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
      const http = new HttpService(mockFetch, getToken, saveToken)
      const params = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

     http.authDelete('wwwwwwww', params).catch(e => expect(e).toEqual(new ErrorFetch('authDelete error',  404, true)))
    })


    it('authDelete error 401', () => {
      const mockFetch =  jest.fn().mockReturnValueOnce({ok: false, status: 401}).mockReturnValueOnce({
        ok: true,
        json: () => {
          return {accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"};   
        }
      }).mockReturnValueOnce({ok: false, status: 401})
      const saveToken = jest.fn().mockReturnValue({  })
      const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
      const http = new HttpService(mockFetch, getToken, saveToken)
      const params = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

      http.authDelete('wwwwwww', params).catch(e => expect(e).toEqual(new ErrorFetch('authDelete error', 401, false)))
     })

    it('auth error fetch', () => {
      const mockFetch = jest.fn().mockReturnValue({ok: false})
      const saveToken = jest.fn().mockReturnValue({  })
      const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
      const http = new HttpService(mockFetch, getToken, saveToken)
      const email = "randomUser@mail.com"
      const password = "123123"

     http.auth('wwwwwwww', email, password).catch(e => expect(e).toEqual(new ErrorFetch('auth error',  404, true)))
    })


    it('auth error 401', () => {
      const mockFetch =  jest.fn().mockReturnValueOnce({ok: false, status: 401}).mockReturnValueOnce({
        ok: true,
        json: () => {
          return {accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"};   
        }
      }).mockReturnValueOnce({ok: false, status: 401})
      const saveToken = jest.fn().mockReturnValue({  })
      const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
      const http = new HttpService(mockFetch, getToken, saveToken)
      const email = "randomUser@mail.com"
      const password = "123123"

      http.auth('wwwwwww', email, password).catch(e => expect(e).toEqual(new ErrorFetch('auth error', 401, false)))
     })

     it('refreshToken error fetch', () => {
      const mockFetch = jest.fn().mockReturnValue({ok: false})
      const saveToken = jest.fn().mockReturnValue({  })
      const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
      const http = new HttpService(mockFetch, getToken, saveToken)
      const token = "nkgwjnrgwkj4234"

     http.refreshToken(token).catch(e => expect(e).toEqual(new ErrorFetch('refreshToken error',  404, true)))
    })


    it('refreshToken error 401', () => {
      const mockFetch =  jest.fn().mockReturnValueOnce({ok: false, status: 401}).mockReturnValueOnce({
        ok: true,
        json: () => {
          return {accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"};   
        }
      }).mockReturnValueOnce({ok: false, status: 401})
      const saveToken = jest.fn().mockReturnValue({  })
      const getToken = jest.fn().mockReturnValue(Promise.resolve({accessToken: 'wvwvw', refreshToken: "dfbdfbfdfb"}))
      const http = new HttpService(mockFetch, getToken, saveToken)
      const token = "nkgwjnrgwkj4234"

      http.refreshToken(token).catch(e => expect(e).toEqual(new ErrorFetch('refreshToken error', 401, false)))
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
     const http = new HttpService( mockFetch, getToken, saveToken)
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



 

