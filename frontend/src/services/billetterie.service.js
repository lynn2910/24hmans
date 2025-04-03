import {Request} from "./axios.service"


async function getBilletterieInformations(prestataire_name) {
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

async function newOrder(billetterie_name, order) {
    return await Request.post("/billetterie/:billetterie_name/@me/orders")
        .args({billetterie_name})
        .body(order)
        .send();
}

export default {
    getBilletterieInformations,newOrder
}