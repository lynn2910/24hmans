<script>

import PrestataireDashboardTemplate from "@/components/dashboard/prestataire/PrestataireDashboardTemplate.vue";
import EcurieService from "@/services/ecurie.service";
import {mapState} from "vuex";
import {transformPrestataireName} from "@/utils";

export  default {
    components: {PrestataireDashboardTemplate},
    computed:{
        ...mapState("login", ["loggedInUser"])
    },
    data(){
        return {participants:[], selectedParticipants: []}
    },
    async beforeMount(){
        let res = await EcurieService.getAllEcurieParticipants(transformPrestataireName(this.loggedInUser.name));

        if (!res.error) {
            this.participants = res.data;
        } else{
            console.error(`cannot get participant: ${res.data}`)
        }
    },
    methods: {
        async handleTirage() {
            this.selectedParticipants = await EcurieService.tirageAuSort(
                transformPrestataireName(this.loggedInUser.name)
            );
        },
    },
}
</script>

<template>
    <PrestataireDashboardTemplate current-page="home">
        <div>
            <h2 style="font-size: 2em; font-weight: bold; margin-left: 20px; margin: 20px 0;">
                Liste des Participants
            </h2>

            <ul v-if="participants.length > 0" style="margin-left: 20px;">
                <li v-for="participant in participants" :key="participant.email">
                    {{ participant.lastname }} - {{ participant.name }} -
                    ({{ new Date(participant.time).toLocaleString() }})
                </li>
            </ul>
            <p v-else style="margin-left: 20px;">
                Aucun participant trouvé pour ce prestataire.
            </p>

            <button @click="handleTirage" style="margin-left: 20px; margin-top: 20px;">Tirage au sort</button>

            <div v-if="selectedParticipants.length > 0" style="margin-left: 20px; margin-top: 20px;">
                <h3>Participants sélectionnés :</h3>
                <ul>
                    <li v-for="participant in selectedParticipants" :key="participant.email">
                        {{ participant.lastname }} - {{ participant.name }} -
                        ({{ new Date(participant.time).toLocaleString() }})
                    </li>
                </ul>
            </div>
        </div>
    </PrestataireDashboardTemplate>
</template>
