const prisma = require("../db")



function getBilletterie(billetterie_id){
    return prisma.billetteries.findUnique({
        where: {billetterie_id: billetterie_id},
        include: {
            BilletterieCategories: true,
            BilletterieForfaits: true,
            BilletteriePersonnes: true
        },
    });
}

function getBilletterieFromName(billetterie_name){
    return prisma.billetteries.findFirst({
        where: {
            billetterie_label: {
                equals: billetterie_name
            }
        },
        include: {
            BilletterieCategories: true,
            BilletterieForfaits: true,
            BilletteriePersonnes: true
        },
    });
}


module.exports = {
    getBilletterie,
    getBilletterieFromName
};