import {Request} from "@/services/axios.service";
import {Selected} from "@/utils";

async function loginAdmin(name, password) {
    return await Request.post("/auth/login")
        .body({
            login: name,
            password,
            role: Selected.Admin
        })
        .send();
}

export default {loginAdmin}