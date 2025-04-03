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
    return Request.post('/ecurie/:presta_id/winner')
        .args({ presta_id })
        .params({ year })
        .send();
}

export default {
    getAllEcurieParticipants,
    tirageAuSort,
    YearsRecup
}