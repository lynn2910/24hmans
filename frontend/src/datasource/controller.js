import {boutiques, prestataires} from "@/datasource/prestataires";
import {users} from "@/datasource/user";
import bcrypt from "bcryptjs";
import {v4 as uuid} from "uuid";
import {admins} from "@/datasource/admin";

/**
 * Obtiens les informations sur le prestataire, s'il existe
 * @param {string} id
 */
function getPrestataire(id) {
    let presta = prestataires.find(p => p.id === id);

    if (!presta) return {error: 1, status: 404, data: "prestataire inexistant"}
    return {error: 0, status: 200, data: presta};
}

function getPrestataireWithPassword(id, password) {
    let prestataire = getPrestataireFromName(id);
    if (prestataire.error) return prestataire;

    prestataire = prestataire.data;
    if (!bcrypt.compareSync(password, prestataire.password)) return {
        error: 1,
        status: 404,
        message: "Prestataire not found"
    }
    else return {error: 0, status: 200, data: prestataire};
}

function getPrestatairesServicesCount() {
    let prestataires = getAllPrestataires();
    if (prestataires.error) return prestataires;
    prestataires = prestataires.data.map(p => ({id: p.id, name: p.name, nb_services: 0}))

    prestataires.forEach((p) => {
        if (boutiques.find((b) => b.prestataire_id === p.id)) {
            p.nb_services++
        }

        // TODO
    })
    return {error: 0, status: 200, data: prestataires};
}

function getAllPrestataires() {
    return {error: 0, status: 200, data: prestataires};
}

/**
 * Obtiens les informations sur le prestataire, s'il existe
 * @param {string} name Le nom du prestataire
 * @returns {{data: string, error: number, status: number}|{data: Prestataire, error: number, status: number}}
 */
function getPrestataireFromName(name) {
    let presta = prestataires
        .find(p =>
            p.name.toLowerCase().replace(/\W/g, '') === name.toLowerCase().replace(/\W/g, ''));

    if (!presta) return {error: 1, status: 404, data: "prestataire inexistant"};
    return {error: 0, status: 200, data: presta};
}

function getBoutiqueInfos(prestataire_id) {
    let boutique = boutiques.find(b => b.prestataire_id === prestataire_id);

    if (!boutique) return {error: 1, status: 404, data: "boutique inexistante"};
    return {error: 0, status: 200, data: boutique};
}

function getShopItemFromName(prestataire_name, item_name) {
    let prestataire = getPrestataireFromName(prestataire_name);
    if (prestataire.error) return {error: 1, status: 404, data: "prestataire inexistant"};
    prestataire = prestataire.data;

    let boutique = getBoutiqueInfos(prestataire.id);
    if (boutique.error) return {error: 1, status: 404, data: "boutique inexistante"};
    boutique = boutique.data;

    let item = boutique.items.find(a => a.name.trim().toLowerCase().replace(/\s+/, '-') === item_name);

    if (!item) return {error: 1, status: 404, data: "Item inexistant"};
    return {error: 0, status: 200, data: item};
}

function loginUser(email, password) {
    let user = users.find(u => u.email === email && bcrypt.compareSync(password, u.hashed_password));

    if (user) return {error: 0, status: 200, data: user}
    else return {error: 1, status: 404, data: "User not found"};
}

/**
 * @param {string} email
 * @param password
 * @param {string} first_name
 * @param {string} last_name
 */
function signupUser(email, password, first_name, last_name) {
    let user = {
        user_id: uuid().toString(),
        created_at: Date.now(),
        hashed_password: password,
        email, first_name, last_name
    }

    users.push(user);

    return {error: 0, status: 200, data: user};
}

function loginAdmin(name, password) {
    let admin = admins.find(u => u.name === name && bcrypt.compareSync(password, u.password));

    if (admin) return {error: 0, status: 200, data: admin};
    else return {error: 1, status: 404, data: "Admin not found"};
}

function getAllUsers() {
    return {error: 0, status: 200, data: users};
}

export default {
    getPrestataire,
    getPrestataireFromName,
    getPrestataireWithPassword,
    getBoutiqueInfos,
    getAllPrestataires,
    getShopItemFromName,
    loginUser,
    signupUser,
    loginAdmin,
    getAllUsers,
    getPrestatairesServicesCount
};