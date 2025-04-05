import { Request } from "@/services/axios.service";

// Configuration
const VOL_INTERVALLE = 1; // Intervalle entre les vols en heures (1h ou 2h)
const CAPACITE_MONTGOLFIERE = 10; // Capacité maximale par vol



/**
 * Récupère toutes les montgolfières disponibles.
 * @returns {Promise<{error: (0|1), status: number, data: {montgolfiere_id: string, prestataire_id: string}[]}>}
 */
async function getAvailableMontgolfieres() {
    try {
        return await Request.get('/montgolfiere/available').send();
    } catch (error) {
        console.error('Erreur lors de la récupération des montgolfières disponibles', error);
        throw error;
    }
}

/**
 * Récupère les détails d'une montgolfière par ID.
 * @param {string} montgolfiere_id - L'ID de la montgolfière.
 * @returns {Promise<Object>} - Détails de la montgolfière.
 */
async function getMontgolfiere(montgolfiere_id) {
    try {
        return await Request.get(`/montgolfiere/${montgolfiere_id}`).send();
    } catch (error) {
        console.error(`Erreur lors de la récupération de la montgolfière ${montgolfiere_id}`, error);
        throw error;
    }
}

/**
 * Crée une session pour une montgolfière spécifique.
 * @param {string} montgolfiere_id - L'ID de la montgolfière.
 * @param {Object} session_details - Détails de la session (jour, heure, etc.).
 * @returns {Promise<Object>} - Réponse de l'API après la création.
 */
async function createMontgolfiereSession(montgolfiere_id, session_details) {
    try {
        // Vérification de la capacité avant la création de la session
        const existingSessions = await getMontgolfiereSessions(montgolfiere_id);
        if (existingSessions.length >= CAPACITE_MONTGOLFIERE) {
            throw new Error('Capacité maximale de la montgolfière atteinte.');
        }

        // Création de la session
        return await Request.post(`/montgolfiere/${montgolfiere_id}/session`)
            .body(session_details)
            .send();
    } catch (error) {
        console.error(`Erreur lors de la création de la session pour ${montgolfiere_id}`, error);
        throw error;
    }
}

/**
 * Récupère les sessions d'une montgolfière par ID.
 * @param {string} montgolfiere_id - L'ID de la montgolfière.
 * @returns {Promise<Object[]>} - Liste des sessions disponibles pour la montgolfière.
 */
async function getMontgolfiereSessions(montgolfiere_id) {
    try {
        return await Request.get(`/montgolfiere/${montgolfiere_id}/sessions`).send();
    } catch (error) {
        console.error(`Erreur lors de la récupération des sessions de ${montgolfiere_id}`, error);
        throw error;
    }
}

/**
 * Enregistre un utilisateur dans une session de montgolfière.
 * @param {string} montgolfiere_id - L'ID de la montgolfière.
 * @param {string} session_id - L'ID de la session.
 * @param {Object} registering_details - Détails de l'inscription.
 * @returns {Promise<Object>} - Réponse de l'API après l'inscription.
 */
async function registerUserInMontgolfiereSession(montgolfiere_id, session_id, registering_details) {
    try {
        // Vérification si la session est pleine
        const session = await getMontgolfiereSession(montgolfiere_id, session_id);
        if (session.data.length >= CAPACITE_MONTGOLFIERE) {
            throw new Error('La session est déjà pleine.');
        }

        // Inscription de l'utilisateur
        return await Request.post(`/montgolfiere/${montgolfiere_id}/session/${session_id}/register`)
            .body(registering_details)
            .send();
    } catch (error) {
        console.error(`Erreur lors de l'inscription à la session ${session_id} de ${montgolfiere_id}`, error);
        throw error;
    }
}

/**
 * Récupère les détails d'une session de montgolfière par ID.
 * @param {string} montgolfiere_id - L'ID de la montgolfière.
 * @param {string} session_id - L'ID de la session.
 * @returns {Promise<Object>} - Détails de la session.
 */
async function getMontgolfiereSession(montgolfiere_id, session_id) {
    try {
        return await Request.get(`/montgolfiere/${montgolfiere_id}/session/${session_id}`).send();
    } catch (error) {
        console.error(`Erreur lors de la récupération de la session ${session_id} de ${montgolfiere_id}`, error);
        throw error;
    }
}

/**
 * Met à jour une session de montgolfière.
 * @param {string} montgolfiere_id - L'ID de la montgolfière.
 * @param {string} session_id - L'ID de la session.
 * @param {Object} updated_session - Détails de la session mise à jour.
 * @returns {Promise<Object>} - Réponse de l'API après mise à jour.
 */
async function updateMontgolfiereSession(montgolfiere_id, session_id, updated_session) {
    try {
        return await Request.patch(`/montgolfiere/${montgolfiere_id}/session/${session_id}`)
            .body(updated_session)
            .send();
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de la session ${session_id} de ${montgolfiere_id}`, error);
        throw error;
    }
}

/**
 * Supprime une session de montgolfière.
 * @param {string} montgolfiere_id - L'ID de la montgolfière.
 * @param {string} session_id - L'ID de la session.
 * @returns {Promise<Object>} - Réponse de l'API après suppression.
 */
async function deleteMontgolfiereSession(montgolfiere_id, session_id) {
    try {
        return await Request.delete(`/montgolfiere/${montgolfiere_id}/session/${session_id}`).send();
    } catch (error) {
        console.error(`Erreur lors de la suppression de la session ${session_id} de ${montgolfiere_id}`, error);
        throw error;
    }
}

export {
    getAvailableMontgolfieres,
    getMontgolfiere,
    createMontgolfiereSession,
    getMontgolfiereSessions,
    registerUserInMontgolfiereSession,
    getMontgolfiereSession,
    updateMontgolfiereSession,
    deleteMontgolfiereSession
};
