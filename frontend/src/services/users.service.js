import LocalSource from '../datasource/controller'
import {Request, defineSessionId} from "@/services/axios.service";
import {Selected} from "@/utils";

async function loginUser(email, password) {
    // return LocalSource.loginUser(email, password)
    const res = await Request.post("/auth/login")
        .body({
            login: email,
            password: password,
            userType: Selected.User
        })
        .send();

    console.log(res)

    if (res.error) {
        return res;
    }

    defineSessionId(res.data.code);
    return {error: 0, status: 200, data: res.data.user};
}

async function signupUser(email, password, first_name, last_name) {
    return LocalSource.signupUser(email, password, first_name, last_name)
}

async function getUserCount() {
    return LocalSource.getAllUsers();
}

async function getUserOrders(user_id) {
    return LocalSource.getUserOrders(user_id);
}

async function newOrder(order) {
    return LocalSource.newOrder(order);
}

export default {
    loginUser,
    signupUser,
    getUserCount,
    getUserOrders,
    newOrder
}