import LocalSource from "@/datasource/controller"
import {Request} from "@/services/axios.service";

async function getAllEcurieParticipants(presta_id, year){
    //return LocalSource.getAllEcurieParticipants(presta_id);
    return await Request.get('/ecurie/:presta_id/participants')
        .args({presta_id})
        .params({year})
        .send()
}

async function YearsRecup(){
    return await Request.get('ecurie/participants/years')
        .send()
}

async function tirageAuSort(presta_id, year, count = 10) {
    try {
        // Récupérer tous les participants de l'écurie
        let res = await LocalSource.getAllEcurieParticipants(presta_id);

        if (res.error || !res.data || res.data.length === 0) {
            console.error("Aucun participant trouvé.");
            return [];
        }

        // Filtrer les participants par année
        let participants = res.data.filter(p => new Date(p.time).getFullYear() === year);

        if (participants.length === 0) {
            console.error(`Aucun participant trouvé pour l'année ${year}.`);
            return [];
        }
        let tirage = [];
        let maxTirage = Math.min(count, participants.length);

        for (let i = 0; i < maxTirage; i++) {
            let notSelectedParticipants = participants.filter(p => !tirage.includes(p));

            if (notSelectedParticipants.length === 0) break;

            let randomIndex = Math.floor(Math.random() * notSelectedParticipants.length);
            tirage.push(notSelectedParticipants[randomIndex]);
        }

        console.log(`Participants sélectionnés pour ${year}:`, tirage);
        return tirage;
    } catch (error) {
        console.error("Erreur lors du tirage au sort :", error);
        return [];
    }
}

export default {
    getAllEcurieParticipants,
    tirageAuSort,
    YearsRecup
}