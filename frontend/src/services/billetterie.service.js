import {Request} from "./axios.service"


async function getBilletterieInformations(prestataire_name) {
    console.log(prestataire_name)
    try {
        const res = await Request.get(`/billetterie/${prestataire_name}`);

        if (res && res.data) {
            return res.data;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

async function newOrder(billetterie_id, order) {
    return await Request.post(`/billetterie/${billetterie_id}/@me/orders`)
        .body(order)
        .send();
}

export default {
    getBilletterieInformations,newOrder
}