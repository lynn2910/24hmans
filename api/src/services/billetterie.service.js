const prisma = require("../db")


function getBilletterie(prestataire_id){
    return prisma.billetteries.findFirst({
        where: {prestataire_id: prestataire_id},
        include: {
            BilletterieCategories: true,
            BilletterieForfaits: true,
            BilletteriePersonnes: true,
            prestataire: true,
        },
    });
}




module.exports = {
    getBilletterie,
};