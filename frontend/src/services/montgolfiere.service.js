import { Request } from "@/services/axios.service";

/**
 * @returns {Promise<{ error: (0 | 1), status: number, data: { montgolfiere_id: string, prestataire_id: string, enabled: boolean }[] }>}
 */
async function getAvailableMontgolfieres() {
    return await Request.get('/montgolfiere/available').send();
}

async function getMontgolfiere(montgolfiere_id) {
    return await Request.get('/montgolfiere/:montgolfiere_id')
        .args({ montgolfiere_id })
        .send();
}

async function getMontgolfiereSessions(montgolfiere_id) {
    return await Request.get('/montgolfiere/:montgolfiere_id/sessions')
        .args({ montgolfiere_id })
        .send();
}

async function createMontgolfiereSession(montgolfiere_id, session_details) {
    return await Request.post('/montgolfiere/:montgolfiere_id/sessions')
        .args({ montgolfiere_id })
        .body(session_details)
        .send();
}

async function updateMontgolfiereSession(montgolfiere_id, session_id, updated_session) {
    return await Request.patch('/montgolfiere/:montgolfiere_id/sessions/:session_id')
        .args({ montgolfiere_id, session_id })
        .body(updated_session)
        .send();
}

async function deleteMontgolfiereSession(montgolfiere_id, session_id) {
    return await Request.delete('/montgolfiere/:montgolfiere_id/sessions/:session_id')
        .args({ montgolfiere_id, session_id })
        .send();
}

async function registerUserInMontgolfiereSession(montgolfiere_id, session_id, registering_details) {
    return await Request.post('/montgolfiere/:montgolfiere_id/sessions/:session_id/register')
        .args({ montgolfiere_id, session_id })
        .body(registering_details)
        .send();
}

export default {
    getAvailableMontgolfieres,
    getMontgolfiere,
    getMontgolfiereSessions,
    createMontgolfiereSession,
    updateMontgolfiereSession,
    deleteMontgolfiereSession,
    registerUserInMontgolfiereSession
};
