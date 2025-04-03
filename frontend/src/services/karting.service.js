import {Request} from "@/services/axios.service";

/**
 * @returns {Promise<{error: (0|1), status: number, data: {karting_id: number, prestataire_id: string}[]}>}
 */
async function getAvailableKartings() {
    return await Request.get('/karting/available').send();
}

async function getKarting(karting_id) {
    return await Request.get('karting/:karting_id')
        .args({karting_id})
        .send()
}

async function createKartingCircuit(karting_id, circuit_details) {
    return await Request.post('/karting/:karting_id/circuit')
        .args({karting_id})
        .body(circuit_details)
        .send();
}

async function getKartingCircuit(karting_id, circuit_id) {
    return await Request.get('/karting/:karting_id/circuit/:circuit_id')
        .args({karting_id, circuit_id})
        .send();
}

async function updateKartingCircuit(karting_id, circuit_id, updated_circuit) {
    return await Request.patch('/karting/:karting_id/circuit/:circuit_id')
        .args({karting_id, circuit_id})
        .body(updated_circuit)
        .send();
}

async function deleteCircuit(karting_id, circuit_id) {
    return await Request.delete("/karting/:karting_id/circuit/:circuit_id")
        .args({karting_id, circuit_id})
        .send();
}

async function getKartingSessions(karting_id) {
    return await Request.get('/karting/:karting_id/sessions')
        .args({karting_id})
        .send();
}

async function createKartingSession(karting_id, session_details) {
    return await Request.post('/karting/:karting_id/sessions')
        .args({karting_id})
        .body(session_details)
        .send();
}

async function updateKartingSessions(karting_id, session_id, updated_session) {
    return await Request.patch('/karting/:karting_id/sessions/:session_id')
        .args({karting_id, session_id})
        .body(updated_session)
        .send();
}

async function deleteKartingSession(karting_id, session_id) {
    return await Request.delete('/karting/:karting_id/sessions/:session_id')
        .args({karting_id, session_id})
        .send();
}

async function registerUserInSession(karting_id, session_id, registering_details) {
    return await Request.post("/karting/:karting_id/sessions/:session_id/register")
        .args({karting_id, session_id})
        .body(registering_details)
        .send();
}

export {
    getAvailableKartings,
    getKarting,
    createKartingCircuit,
    getKartingCircuit,
    updateKartingCircuit,
    deleteCircuit,
    getKartingSessions,
    createKartingSession,
    updateKartingSessions,
    deleteKartingSession,
    registerUserInSession
}