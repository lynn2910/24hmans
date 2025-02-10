import LocalSource from '../datasource/controller'
import {defineSessionId, removeSessionId, Request} from "@/services/axios.service";
import {Selected} from "@/utils";

async function loginUser(email, password) {
    console.log("Logging user...")

    // return LocalSource.loginUser(email, password)
    const res = await Request.post("/auth/login")
        .body({
            login: email,
            password: password,
            userType: Selected.User
        })
        .send();

    if (!res.error) defineSessionId(res.data?.code)

    console.log("login res : ", res)

    return res;
}

async function signupUser(email, password, first_name, last_name) {
    // return LocalSource.signupUser(email, password, first_name, last_name)
    const res = await Request.post("/auth/signup")
        .body({email, password, first_name, last_name})
        .send();

    console.log(res)

    return res;
}

async function logoutUser(sessionId) {
    console.log("Closing session...")
    await Request.post("/auth/logout")
        .body({sessionId})
        .send()

    removeSessionId();
    console.log("Session closed")
}

async function getUserCount() {
    // TODO
    return LocalSource.getAllUsers();
}

async function getUserOrders() {
    return await Request.get("/users/@me/orders").send();
}

async function newOrder(order) {
    return await Request.post("/users/@me/orders")
        .body(order)
        .send();
}

export default {
    loginUser,
    signupUser,
    getUserCount,
    getUserOrders,
    newOrder,
    logoutUser
}