import LocalSource from '../datasource/controller'

async function loginUser(email, password) {
    return LocalSource.loginUser(email, password)
}

async function signupUser(email, password, first_name, last_name) {
    return LocalSource.signupUser(email, password, first_name, last_name)
}

export default {loginUser, signupUser}