

// const API_URL: string = `http://localhost:5000/`
// const POSTS_URL: string = 'https://jsonplaceholder.typicode.com/posts'


type FetchCallback = (url: string, param?: object) => Promise<Response>;


class errorFetch extends Error {
    constructor(message: string) {
        super(message)
        this.message = message
    }
}


class Api {



    private fetch: FetchCallback
    private token: object;

    constructor(fetchFync: FetchCallback, tokenData: object = { accsessToken: '1241452346', refreshToken: '23523235' }) {
        this.fetch = fetchFync
        this.token = tokenData
    }



    public async get(url: string, headers?: object): Promise<any> {
        const options = headers ? { headers } : undefined;

        let response = await this.fetch(url, options)

        if (response.ok) {

            return await response.json()

        } else {
            new errorFetch('didn`t get request')
        }

    }


    public async getposts(url: string, headers: object): Promise<any> {

        const responseFetch: Promise<any> = this.get(url, headers)

        if (responseFetch) {
            return responseFetch
        } else {
            new errorFetch('didn`t get request')
        }

    }


    public async post(url: string, headers: object, email: string, password: string): Promise<any> {

        const response = await this.fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers,
            body: JSON.stringify({
                email,
                password,
            }),
        })
        if (response.ok) {

            return await response.json()

        } else {
            new errorFetch('didn`t get request')
        }
    }



    public async auth(url: string, headers: object, email: string, password: string): Promise<any> {
        const response = await this.post(url, headers, email, password)

        if (response) {
            this.token = response
            return response
        } else {
            new errorFetch('didn`t get request')
        }
    }


    public async refreshToken(url: string, token: {}): Promise<any> {
        let response = await this.fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             token
            }),
        })

        if (response.ok) {
            response = await response.json()
            this.token = response
            return response
        } else {
            new errorFetch('didn`t get request')
        }
    }







    // public async getposts () : Promise<any> { 
    //     let posts = await this.fetch('https://jsonplaceholder.typicode.com/posts')
    //     return await posts.json()

    //     }



    //  public async newpost(body: any) : Promise<any> { 
    //     const newPost = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //         method: 'POST',
    //         body: JSON.stringify(body),
    //     })
    //     return newPost
    // }


    // public async registration(email: string, password: string): Promise<any> {

    //    const newUser = fetch('api/auth', {
    //         method: 'POST',
    //         credentials: 'include',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             email,
    //             password,
    //         }),
    //     })     
    //         return newUser

    // .then((res) => {
    //     if (res.status === 200) {
    //         const tokenData = res.json();
    //         sessionStorage.setItem('tokenData ',JSON.stringify(tokenData)); 
    //         return tokenData
    //     }
    //     return Promise.reject();
    // });  
    // }

    // public async refreshToken(token: any): Promise<any> {
    //     return fetch('api/auth/refreshToken', {
    //         method: 'POST',
    //         credentials: 'include',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             token,
    //         }),
    //     })

    // }
}









export default Api

