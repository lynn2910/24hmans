import LocalSource from '../datasource/controller'

async function loginUser(email, password) {
    return LocalSource.loginUser(email, password)
}

export default {loginUser}