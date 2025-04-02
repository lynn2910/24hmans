const axios = require('axios');
let BASE_URL = process.env.VUE_APP_AXIOS_BASE_URL || "http://localhost:4629";
if (!process.env.VUE_APP_AXIOS_BASE_URL) {
    alert("Please set VUE_APP_AXIOS_BASE_URL env");
}

const axios_client = axios.create({baseURL: BASE_URL});

/**
 * @type {null|number}
 */
let tokenIntercepterId = null;

// Charger le token au moment de l'authentification
if (sessionStorage.getItem('access_token')) {
    defineToken(sessionStorage.getItem('access_token'));
}


export function defineToken(token) {
    sessionStorage.setItem("access_token", token);
    tokenIntercepterId = axios_client.interceptors.request.use(
        config => {
            config.headers.setAuthorization('Bearer ' + token, true);

            return config;
        }
    )
}

export function removeSessionId() {
    if (tokenIntercepterId !== null) {
        axios_client.interceptors.request.eject(tokenIntercepterId);
        tokenIntercepterId = null;
    }
}

/**
 * @enum
 */
export const Method = {
    Get: "GET",
    Post: "POST",
    Put: "PUT",
    Delete: "DELETE",
    Patch: "PATCH",
}


/**
 * @param {string} baseUrl
 */
export function setBaseUrl(baseUrl) {
    if (typeof baseUrl !== "string") throw new Error("baseUrl must be a string");
    if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, baseUrl.length - 2);

    console.log(`[AXIOS] New baseUrl: ${baseUrl}`);
    axios_client.baseURL = baseUrl;
}

export class Request {
    /**
     * @param {Method} method
     * @param {String} route
     */
    constructor(method, route) {
        this.method = method;
        this.url = route;
        this.paramsObj = {};
    }

    static get = (route) => new Request(Method.Get, route);
    static post = (route) => new Request(Method.Post, route);
    static put = (route) => new Request(Method.Put, route);
    static delete = (route) => new Request(Method.Delete, route);
    static patch = (route) => new Request(Method.Patch, route);

    /**
     * Replace args in the route.
     * @param {Object.<string, string>} route_args
     * @returns Request
     */
    args(route_args) {
        Object.entries(route_args)
            .forEach(([key, value]) => {
                this.url = this.url.replace(`:${key}`, value);
            })

        return this;
    }

    params(p) {
        this.paramsObj = p;
        return this;
    }

    /**
     * Define a body for the request.
     * @param {any} body
     * @returns {Request}
     */
    body(body) {
        this.body = body;
        return this;
    }

    /**
     * Send the built-up request using the `BASE_URL` or the specified `base_url` argument
     * @param {string?} [base_url]
     * @return {Promise<{error: 0 | 1, status: number, data: any}>}
     * @throws
     */
    send(base_url = BASE_URL) {
        return new Promise((resolve, reject) => {
            let call = null;
            const params = this.paramsObj;
            switch (this.method) {
                case Method.Get: {
                    call = axios_client.get(this.url, {params});
                    break;
                }
                case Method.Post: {
                    call = axios_client.post(this.url, this.body, {params});
                    break;
                }
                case Method.Put: {
                    call = axios_client.put(this.url, this.body, {params});
                    break;
                }
                case Method.Delete: {
                    call = axios_client.delete(this.url, {params});
                    break;
                }
                case Method.Patch: {
                    call = axios_client.patch(this.url, this.body, {params});
                    break;
                }
                default: {
                    throw new Error("Unknown method " + this.method);
                }
            }
            // Pour que Webstorm soit content
            if (!call) return reject(new Error(`Unknown method ${this.method}`));
            call.then(
                (res) => {
                    return resolve({error: 0, status: res.status, data: res.data})
                },
                (res) => {
                    return resolve({error: 1, status: res.status, data: res.data})
                },
            );
        })
    }
}