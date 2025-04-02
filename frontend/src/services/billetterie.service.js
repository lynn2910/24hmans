import {Request} from "./axios.service"


async function getBilletterieInformations(prestataire_name) {
    try {
        const res = await Request.get(`/billetterie/${prestataire_name}`);
        console.log("🛠 Réponse brute API :", res);  // Vérifie toute la réponse Axios

        if (res && res.data) {
            console.log("✅ Données API retournées :", res.data);
            return res.data;
        } else {
            console.error("❌ Pas de données valides reçues.");
            return null;
        }
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des infos billetterie :", error);
        return null;
    }
}

export default {
    getBilletterieInformations,
}