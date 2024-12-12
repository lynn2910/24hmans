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
        return {participants:[]}
    },
    async beforeMount(){
        let res = await EcurieService.getAllEcurieParticipants(transformPrestataireName(this.loggedInUser.name));

        if (!res.error) {
            this.participants = res.data;
        } else{
            console.error(`cannot get participant: ${res.data}`)
        }
    }
}
</script>

<template>
    <PrestataireDashboardTemplate current-page="home">
        <div>
            <h2>Liste des Participants</h2>

            <ul v-if="participants.length > 0">
                <li v-for="participant in participants" :key="participant.email">
                    {{participant.lastname}} - {{ participant.name }} - ({{ new Date(participant.time).toLocaleString() }})
                </li>
            </ul>
            <p v-else>Aucun participant trouvé pour ce prestataire.</p>
        </div>
    </PrestataireDashboardTemplate>
</template>
