import LocalSource from "@/datasource/controller"
async function getAllEcurieParticipants(presta_id){
    return LocalSource.getAllEcurieParticipants(presta_id);
}
export default {
    getAllEcurieParticipants
}