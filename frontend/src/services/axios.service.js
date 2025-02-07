const axios = require('axios');
let BASE_URL = "https://apidemo.iut-bm.univ-fcomte.fr/herocorp/"
const axios_client = axios.create({baseURL: BASE_URL});


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
        this.route = route;
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
                this.route.replace(`:${key}`, value);
            })

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
     * @return {Promise<Response>}
     * @throws
     */
    send(base_url = BASE_URL) {
        return new Promise((resolve, reject) => {
            let call = null;
            switch (this.method) {
                case Method.Get: {
                    call = axios_client.get(this.url);
                    break;
                }
                case Method.Post: {
                    call = axios_client.post(this.url, this.body);
                    break;
                }
                case Method.Put: {
                    call = axios_client.put(this.url, this.body);
                    break;
                }
                case Method.Delete: {
                    call = axios_client.delete(this.url);
                    break;
                }
                case Method.Patch: {
                    call = axios_client.patch(this.url, this.body);
                    break;
                }
                default: {
                    throw new Error("Unknown method " + this.method);
                }
            }
            // Pour que Webstorm soit content
            if (!call) return reject(new Error(`Unknown method ${this.method}`));
            call.then(resolve, reject);
        })
    }
}