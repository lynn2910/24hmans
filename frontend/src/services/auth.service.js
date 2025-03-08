import {Request} from "@/services/axios.service";

async function getAuthentificationInformations() {
    return await Request.get('/users/@me').send();
}

export default {getAuthentificationInformations}