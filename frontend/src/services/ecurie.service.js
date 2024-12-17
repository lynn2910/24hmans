import LocalSource from "@/datasource/controller"
async function getAllEcurieParticipants(presta_id){
    return LocalSource.getAllEcurieParticipants(presta_id);
}

async function tirageAuSort(presta_id, count = 10) {
    try {
        // Récupérer tous les participants de l'écurie
        let res = await LocalSource.getAllEcurieParticipants(presta_id);

        if (res.error || !res.data || res.data.length === 0) {
            console.error("Aucun participant trouvé.");
            return [];
        }

        let participants = res.data;


        let tirage = [];
        for(let i =0; i< count; i++){
            let notSelectedParticipants = participants.filter(p => !tirage.includes(p));

            tirage.push(
                notSelectedParticipants[Math.floor(Math.random()*notSelectedParticipants.length)]
            )
        }

        console.log("Participants sélectionnés :", tirage);
        return tirage;
    } catch (error) {
        console.error("Erreur lors du tirage au sort :", error);
        return [];
    }
}
export default {
    getAllEcurieParticipants,
    tirageAuSort
}