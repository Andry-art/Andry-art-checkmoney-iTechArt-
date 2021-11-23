
import Api from './http'

// type resu = {
//     id: string
//     title: string
//     body: string
//     heades: string
//   }



// const moskJsonPromise: Promise<any> = Promise.resolve({email: '1', password: 'vwevw', accesToken: 'wrvwecwr3NYlevn', refreshToken: 'urvbsuhdvhrsjjv'})
// // const moskFetchPromise: resu = Promise.resolve({json: () => moskJsonPromise})
// global.fetch= jest.fn(()=>moskJsonPromise )



it('common func', async () => {
    const mockFetch = jest.fn().mockReturnValue({ json: () => { } })
    const req = new Api(mockFetch)

    req.get('https://jsonplaceholder.typicode.com/posts')

    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', undefined);

})

it('Get some data', async () => {
    const mockFetch = jest.fn().mockReturnValue({ json: () => { } })
    const req = new Api(mockFetch)

    req.getposts('https://jsonplaceholder.typicode.com/posts', { 'Accept': 'application/json', 'Content-Type': 'application/json' })

    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts', { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } });

})

it('common post', async () => {
    const mockFetch = jest.fn().mockReturnValue({ json: () => { } })
    const req = new Api(mockFetch)

    const email: string = 'randomUser@gmail.com';
    const password: string = "123123"

    req.post('https://jsonplaceholder.typicode.com/posts', {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
        email,
        password,
    )

    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
})

it('auth', async () => {
    const mockFetch = jest.fn().mockReturnValue({ json: () => { } })
    const req = new Api(mockFetch)

    const email: string = 'randomUser@gmail.com';
    const password: string = "123123"

    req.auth('https://jsonplaceholder.typicode.com/posts', {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
        email,
        password,
    )

    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
})


it('refresh', async () => {
    const mockFetch = jest.fn().mockReturnValue({ json: () => { } })
    const req = new Api(mockFetch, {})

    const token = { accsessToken: '1241452346', refreshToken: '23523235' }

    req.refreshToken('https://jsonplaceholder.typicode.com/posts', token)

    expect(mockFetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token
            }
            ),
        })
})






// it('new post', async () =>{
//     const newPost: Promise<any> = Promise.resolve({id: "1", title: '111', body: '3333333'})
//     global.fetch= jest.fn(()=>newPost)
//     const req = new Api()
//     const result = await req.newpost({email: '1', password: 'vwevw'})

//     expect(result).toEqual({id: "1", title: '111', body: '3333333'})
// })




// it('registration', async () =>{

//     const registration: Promise<any> = Promise.resolve( {
//         accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
//         refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC",
//         user: {
//             email: "randomUser@gmail.com",
//             id: "619aaa2fb2f5f43a717e5f6c",
//         }
//     })
//     global.fetch= jest.fn(()=>registration)
//     const req = new Api()
//     const email: string = 'randomUser@gmail.com'
//     const password: string = "123123"
//     const result = await req.registration(email, password)

//     expect(result).toEqual({
//                             accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
//                             refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC",
//                             user: {
//                                 email: email,
//                                 id: "619aaa2fb2f5f43a717e5f6c",
//                             }
//     })

// })


// it('refreshToken', async ()=>{
//     const refresh: Promise<any> = Promise.resolve( {
//         accessToken: "wrojvnsldkvweljnvksdlvjnlskdvn",
//         refreshToken: "rvjseevbvkveukekebsdev;necSrb",
//         user: {
//             email: "randomUser@gmail.com",
//             id: "619aaa2fb2f5f43a717e5f6c",
//         }
//     })
//     global.fetch= jest.fn(()=>refresh)
//     const req = new Api()
//     const refreshToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC"
//     const newToken = await req.refreshToken(refreshToken)
//     expect(newToken).toEqual( {
//                                 accessToken: "wrojvnsldkvweljnvksdlvjnlskdvn",
//                                 refreshToken: "rvjseevbvkveukekebsdev;necSrb",
//                                 user: {
//                                     email: "randomUser@gmail.com",
//                                     id: "619aaa2fb2f5f43a717e5f6c",
//                                 }
//     })
// })
