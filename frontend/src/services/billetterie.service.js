import {Request} from "./axios.service"

async function getBilletterieInformations(prestataire_id, is_presta = false) {
    // return LocalSource.getBoutiqueInfos(prestataire_id, is_presta)

    return Request.get("/billetterie/:id")
        .args({id: prestataire_id})
        .send()
}

export default {
    getBilletterieInformations,
}