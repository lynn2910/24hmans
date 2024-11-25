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

/**
 *     // if (score <= 1) return PasswordSecurity.Shit;
 *     // if (score <= 2) return PasswordSecurity.Bad;
 *     // if (score <= 3) return PasswordSecurity.Good;
 *     // if (score <= 4) return PasswordSecurity.VeryGood;
 *     // return PasswordSecurity.God;
 * @param {string} password The password to evaluate
 * @returns {number} The score given to the password
 */
export function evaluatePasswordSecurity(password) {
    if (!password) return -1;

    let score = 0;
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (length >= 12) score += 2;
    else if (length >= 8) score += 1;

    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumbers) score++;
    if (hasSpecialChars) score++;

    return score;
}

export function passwordScoreColor(score) {
    if (score === -1) return 'text-gray-500 bg-gray-100';
    switch (score) {
        case 0:
            return 'bg-red-500';
        case 1:
            return 'bg-red-500';
        case 2:
            return 'bg-yellow-500';
        case 3:
            return 'bg-green-500';
        default:
            return 'bg-blue-500';
    }
}