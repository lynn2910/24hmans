const prisma = require("../db")

function getAdmin(admin_id) {
    return prisma.admin.findUnique({
        where: {admin_id}
    })
}

module.exports = {
    getAdmin,
}