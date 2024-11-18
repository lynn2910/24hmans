export const ROUNDS = 10;


/**
 * @enum
 * @type {{User: number, Prestataire: number, Admin: number}}
 */
export const Selected = {
    User: 1,
    Prestataire: 2,
    Admin: 3
}

export function transformPrestataireName(name) {
    return name.toLowerCase().trim().replace(/\s+/g, '-')
}