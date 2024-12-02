<template>
    <div class="grid grid-cols-2 m-32 h-[70%] bg-emerald-400 bg-opacity-5 border border-gray-700 rounded-2xl">
        <!-- Etapes -->
        <div>
            <!-- Indicateur de l'étape où nous sommes -->
            <!-- Là, c'est un peu technique quand on ne connait pas trop le CSS-->
            <!-- 3 étapes-->
            <div class="py-10 pl-11 pr-11 mb-9 flex flex-row items-center static w-full justify-between border-b border-b-gray-700">
                <div class="flex flex-row items-center content-center cursor-pointer" @click="changeStep(Etape.TypeBillet)">
                    <div class="bg-blue-600 text-white h-10 w-10 rounded-full flex flex-col items-center justify-center" :class="{'bg-opacity-15': currentStep!==Etape.TypeBillet}">
                        <p class="font-bold" :class="currentStep===Etape.TypeBillet?'text-white': 'text-blue-500'">1</p>
                    </div>
                    <div class="ml-2 flex flex-col content-center justify-center">
                        <h2 class="font-bold leading-none">Etapes 1</h2>
                        <p class="text-gray-400">Selectionner le type de billet</p>
                    </div>
                </div>

                <div class="flex flex-row items-center content-center cursor-pointer" @click="changeStep(Etape.Date)">
                    <div class="bg-blue-600 text-white h-10 w-10 rounded-full flex flex-col items-center justify-center" :class="{'bg-opacity-15': currentStep!==Etape.Date}">
                        <p class="font-bold " :class="currentStep===Etape.Date?'text-white': 'text-blue-500'">2</p>
                    </div>
                    <div class="ml-2 flex flex-col content-center justify-center">
                        <h2 class="font-bold leading-none">Etapes 2</h2>
                        <p class="text-gray-400">Selectionner la date</p>
                    </div>
                </div>

                <div class="flex flex-row items-center content-center cursor-pointer" @click="changeStep(Etape.Personne)">
                    <div class="bg-blue-600 text-white h-10 w-10 rounded-full flex flex-col items-center justify-center" :class="{'bg-opacity-15': currentStep!==Etape.Personne}">
                        <p class="font-bold " :class="currentStep===Etape.Personne?'text-white': 'text-blue-500'">3</p>
                    </div>
                    <div class="ml-2 flex flex-col content-center justify-center">
                        <h2 class="font-bold leading-none">Etapes 3</h2>
                        <p class="text-gray-400">Selectionner les personnes</p>
                    </div>
                </div>
                <div class="flex flex-row items-center content-center cursor-pointer" @click="changeStep(Etape.Paiement)">
                    <div class="bg-blue-600 text-white h-10 w-10 rounded-full flex flex-col items-center justify-center" :class="{'bg-opacity-15': currentStep!==Etape.Paiement}">
                        <p class="font-bold " :class="currentStep===Etape.Paiement?'text-white': 'text-blue-500'">4</p>
                    </div>
                    <div class="ml-2 flex flex-col content-center justify-center">
                        <h2 class="font-bold leading-none">Etapes 4</h2>
                        <p class="text-gray-400">Paiement</p>
                    </div>
                </div>
            </div>


            <!-- Contenu direct de l'étape -->
            <div class="p-11 pt-0">

                <BilletterieTypeBillet v-if="currentStep === Etape.TypeBillet" @category="typeBilletSelected(categories)" :categories="categories">

                </BilletterieTypeBillet>
                <BilletterieDateSelection v-if="currentStep === Etape.Date"></BilletterieDateSelection>
                <BilletteriePersonneSelection v-if="currentStep === Etape.Personne"></BilletteriePersonneSelection>
                <BilletteriePaiement v-if="currentStep === Etape.Paiement"></BilletteriePaiement>
            </div>
        </div>
        <!-- Résumé -->
        <div class="p-11 border-l border-l-gray-700">
            <slot name="resume"></slot>
        </div>
    </div>
</template>


<script>
import PrestataireService from "@/services/prestataire.service";
import BilletterieTypeBillet from "@/components/services/billetterie/BilletterieTypeBillet.vue";
import BilletterieDateSelection from "@/components/services/billetterie/BilletterieDateSelection.vue";
import BilletteriePersonneSelection from "@/components/services/billetterie/BilletteriePersonneSelection.vue";
import BilletteriePaiement from "@/components/services/billetterie/BilletteriePaiement.vue";

/**
 * @enum
 * @type {{Paiement: number, TypeBillet: number, Personne: number, Date: number}}
 */
const Etape = {
    TypeBillet : 0,
    Date : 1,
    Personne : 2,
    Paiement : 3
}

export default {
    name: "Billetterie",
    components: {BilletteriePaiement, BilletteriePersonneSelection, BilletterieDateSelection, BilletterieTypeBillet},
    data(){
        return {
            Etape,
            categories : [],
            prestataire: null,
            currentStep : Etape.TypeBillet,
            selectedTypeBillet : null
        }
    },
    async beforeMount() {
        let res = await PrestataireService.getPrestataireFromName(this.$route.params['prestataire_name']);
        if (!res.error){
            this.prestataire = res.data;

            res = await PrestataireService.getAllCategoryTicket(this.prestataire.id);

            if (! res.error){
                this.categories = res.data;
            } else {
                console.error(res.data);
            }
        } else {
            console.error(`Cannot get prestataire: ${res.data}`)
        }
    },
    methods : {
        changeStep(new_step){
            this.currentStep = new_step;
        },
        typeBilletSelected(category){
            this.selectedTypeBillet = category;
            this.changeStep(Etape.Date);
        }
    },
};

</script>

