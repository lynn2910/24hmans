import LocalSource from '../datasource/controller'

function loginAdmin(name, password) {
    return LocalSource.loginAdmin(name, password)
}

export default {loginAdmin}