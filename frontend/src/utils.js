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

/**
 * Process the input color the better color to contrast the text accordingly
 * @param {string} hexColor A hexadecimal color code with the format "xxxxxx" or "#xxxxxx"
 * @returns {string} Either 'black' or 'white'
 */
export function getOptimalTextColor(hexColor) {
    hexColor = hexColor.replace('#', '');

    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? 'black' : 'white';
}

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const TINY_MCE_API_KEY = "71o0l2wimwuifufnyayze8asmn0ekpued2g3oeybyznm5cnw"