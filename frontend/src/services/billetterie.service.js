import {Request} from "./axios.service"


async function getBilletterieInformations(prestataire_name) {
    console.log(prestataire_name)
    try {
        const res = await Request.get(`/billetterie/${prestataire_name}`).send();

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

async function getTicketsUser(user_id) {
    return await Request.get(`user/${user_id}/tickets`)
        .send();
}

export default {
    getBilletterieInformations, newOrder, getTicketsUser
}