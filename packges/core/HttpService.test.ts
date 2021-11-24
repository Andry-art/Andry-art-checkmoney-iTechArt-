
import HttpService from './HttpService'
import saveToken from './HttpService'
import getToken from './HttpService'



it('authGet', async () => {
    const mockFetch = jest.fn().mockReturnValue({ json: () => { } })
    const req = new HttpService(mockFetch, saveToken, getToken)

    req.authGet('https://jsonplaceholder.typicode.com/posts')

    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts');

})

it('authPost', async () => {
    const mockFetch = jest.fn().mockReturnValue({ json: () => { } })
    const req = new HttpService(mockFetch, saveToken, getToken)
    const someParams = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

    req.authPost('https://jsonplaceholder.typicode.com/posts', someParams)

    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts',
        { params: someParams });

})

it('authPut', async () => {
    const mockFetch = jest.fn().mockReturnValue({ json: () => { } })
    const req = new HttpService(mockFetch, saveToken, getToken)

    const someParams = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

    req.authPut('https://jsonplaceholder.typicode.com/posts', someParams)

    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts',
        { params: someParams });
})

it('authDelete', async () => {
    const mockFetch = jest.fn().mockReturnValue({ json: () => { } })
    const req = new HttpService(mockFetch, saveToken, getToken)
    const someParams = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

    req.authDelete('https://jsonplaceholder.typicode.com/posts', someParams)

    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts',
        { params: someParams });
})

it('auth', async () => {
    const mockFetch = jest.fn().mockReturnValue({ json: () => { } })
    const req = new HttpService(mockFetch, saveToken, getToken)
    const email = "randomUser@mail.com"
    const password = "123123"

    req.auth('https://jsonplaceholder.typicode.com/posts', email, password)

    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', email, password)
})

it('refreshToken', async () => {
    const mockFetch = jest.fn().mockReturnValue({ json: () => { } })
    const req = new HttpService(mockFetch, saveToken, getToken)
    const tokenData = "nkgwjnrgwkj4234"

    req.refreshToken(tokenData)

    expect(mockFetch).toBeCalledWith(tokenData)
})
