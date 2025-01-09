const uuid = require("uuid").v4;
const prisma = require("../db")
const e = require("express");


function getAllBilletteries(){
    return prisma.billetteries.findMany({
        select: {
            billetterie_id: true,
            billetterie_label: true,
        },
        where: {
            enabled: true,
        },
    });
}

function getBilletterieById(billetterie_id){
    return prisma.billetteries.findUnique({
        select: {
            billetterie_id: true,
            billetterie_label: true,
        },
        where: {
            billetterie_id: {
                equals: billetterie_id,
            },
        },
    });
}

//
//
// CATEGORIES
//
//
function getAllBilletterieCategories(billetterie_id) {
    return prisma.billetterieCategories.findMany({
        select: {
            category_label: true,
            category_id: true,
            billetterie_id: true,
        },
        where: {
            billetterie: {
                enabled: true
            },
            OR: [
                {
                    billetterie_id: {
                        equals: billetterie_id,
                    },
                },
                {
                    billetterie: {
                        prestataire: {
                            referencer: {
                                equals: billetterie_id,
                            },
                        },
                    },
                },
            ],
        },
    });
}

function getBilletterieCategoryById(category_id, billetterie_id){
    return prisma.billetterieCategories.findUnique({
        select: {
            category_label: true,
            category_id: true,
            billetterie_id: true,
        },
        where: {
            category_id: {
              equals: category_id,
            },
            billetterie: {
                enabled: true
            },
            OR: [
                {
                    billetterie_id: {
                        equals: billetterie_id,
                    },
                },
                {
                    billetterie: {
                        prestataire: {
                            referencer: {
                                equals: billetterie_id,
                            },
                        },
                    },
                },
            ],
        },
    });
}

//
//
// FORFAITS
//
//

function getAllBilletterieForfaits(billetterie_id){
    return prisma.billetterieForfaits.findMany({
        select: {
            forfait_label: true,
            forfait_id: true,
            billetterie_id: true,
        },
        where: {
            billetterie: {
                enabled: true
            },
            OR: [
                {
                    billetterie_id: {
                        equals: billetterie_id,
                    },
                },
                {
                    billetterie: {
                        prestataire: {
                            referencer: {
                                equals: billetterie_id,
                            },
                        },
                    },
                },
            ],
        },
    });
}

function getBilletterieForfaitById(forfait_id, billetterie_id){
    return prisma.billetterieForfaits.findUnique({
        select: {
            forfait_label: true,
            forfait_id: true,
            billetterie_id: true,
        },
        where: {
            forfait_id: {
                equals: forfait_id,
            },
            billetterie: {
                enabled: true
            },
            OR: [
                {
                    billetterie_id: {
                        equals: billetterie_id,
                    },
                },
                {
                    billetterie: {
                        prestataire: {
                            referencer: {
                                equals: billetterie_id,
                            },
                        },
                    },
                },
            ],
        },
    });
}

//
//
// PERSONNES
//
//

function getAllBilletteriePersonnes(billetterie_id){
    return prisma.billetteriePersonnes.findMany({
        select: {
            personne_label: true,
            personne_id: true,
            billetterie_id: true,
        },
        where: {
            billetterie: {
                enabled: true
            },
            OR: [
                {
                    billetterie_id: {
                        equals: billetterie_id,
                    },
                },
                {
                    billetterie: {
                        prestataire: {
                            referencer: {
                                equals: billetterie_id,
                            },
                        },
                    },
                },
            ],
        },
    });
}

function getBilletteriePersonneById(personne_id, billetterie_id){
    return prisma.billetteriePersonnes.findUnique({
        select: {
            personne_label: true,
            personne_id: true,
            billetterie_id: true,
        },
        where: {
            personne_id: {
                equals: personne_id
            },
            billetterie: {
                enabled: true
            },
            OR: [
                {
                    billetterie_id: {
                        equals: billetterie_id,
                    },
                },
                {
                    billetterie: {
                        prestataire: {
                            referencer: {
                                equals: billetterie_id,
                            },
                        },
                    },
                },
            ],
        },
    });
}


module.exports = {
    getAllBilletteries,
    getBilletterieById,
    getAllBilletterieCategories,
    getBilletterieCategoryById,
    getAllBilletterieForfaits,
    getBilletterieForfaitById,
    getAllBilletteriePersonnes,
    getBilletteriePersonneById,
}