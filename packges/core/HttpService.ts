

type FetchCallback = (url: string, param?: object) => Promise<Response>;


class ErrorFetch extends ErrorEvent {
    constructor({ message, stack, colno, error, lineno, filename }:
        { message: string; stack?: string; colno?: number; error?: string, lineno?: string, filename?: string }) {
        super(message)
        message
        colno
        stack
        error
        lineno
        filename
    }
}



let tokenData: Promise<any>;

export function saveToken(response: Promise<any>): Promise<void> {
    return tokenData = response;
}

export const getToken = (): object => {
    return tokenData
}



class HttpService {

    private fetch: FetchCallback
    private getToken: Function
    private saveToken: Function

    constructor(fetchFync: FetchCallback, getToken: Function, saveToken: Function) {
        this.fetch = fetchFync
        this.getToken = getToken;
        this.saveToken = saveToken;
    }

    public async authGet(url: string, limit: number = 1): Promise<any> {
        let token = this.getToken()
        let tokenAccess = token.accessToken

        let response = await this.fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${tokenAccess}`
            }
        })

        if (response.ok) {
            return await response.json()

        } if (response.status === 401 && limit == 1) {
            await this.refreshToken(token.refreshToken)
            await this.authGet(url, limit - 1)

        } else {
            new ErrorFetch({ message: 'didn`t get request' })
        }
    }

    public async authPost(url: string, params: any, limit: number = 1): Promise<void> {
        let token = this.getToken()
        let tokenAccess = token.accessToken

        const response = await this.fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${tokenAccess}`
            },
            body: JSON.stringify({
                params
            }),
        })

        if (response.ok) {
            return await response.json()
        }

        if (response.status === 401 && limit == 1) {
            await this.refreshToken(token.refreshToken)
            await this.authPost(url, limit - 1)

        } else {
            new ErrorFetch({ message: 'didn`t get request' })

        }
    }

    public async authPut(url: string, params: any, limit: number = 1): Promise<any> {
        let token = this.getToken()
        let tokenAccess = token.accessToken

        const response = await this.fetch(url, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${tokenAccess}`
            },
            body: JSON.stringify({
                params
            }),
        })

        if (response.ok) {
            return await response.json()
        }

        if (response.status === 401 && limit == 1) {
            await this.refreshToken(token.refreshToken)
            await this.authPost(url, limit - 1)

        } else {
            new ErrorFetch({ message: 'didn`t get request' })
        }
    }

    public async authDelete(url: string, params: any, limit: number = 1): Promise<any> {
        let token = this.getToken()
        let tokenAccess = token.accessToken

        const response = await this.fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${tokenAccess}`
            },
            body: JSON.stringify({
                params
            }),
        })

        if (response.status === 401 && limit == 1) {
            await this.refreshToken(token.refreshToken)
            await this.authDelete(url, limit - 1)

        }
        if (!response.ok) {
            new ErrorFetch({ message: 'didn`t get request' })
        }
    }

    public async auth(url: string, email: string, password: string): Promise<any> {
        let response = await this.fetch(url, {
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

        if (response.ok) {
            await this.saveToken(response.json())
            return await response.json()

        } else {
            new ErrorFetch({ message: 'didn`t get request' })
        }
    }


    public async refreshToken(token: string): Promise<any> {
        let response = await this.fetch('api/auth/refreshToken', {
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
            await this.saveToken(response.json())
            return await response.json()

        } else {
            new ErrorFetch({ message: 'didn`t get request' })
        }
    }
}

export default HttpService;

