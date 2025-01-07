import LocalSource from '../datasource/controller'

async function loginUser(email, password) {
    return LocalSource.loginUser(email, password)
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