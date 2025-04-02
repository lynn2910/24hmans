import {Request} from "./axios.service"

async function getBilletterieInformations(prestataire_name) {
    return Request.get(`/billetterie/${prestataire_name}`)
        .send()
}

export default {
    getBilletterieInformations,
}