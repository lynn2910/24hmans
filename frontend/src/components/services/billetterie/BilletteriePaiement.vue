<template>
    <div>
        <h1 class="text-2xl font-bold my-3">Paiement</h1>
        <div>
            <PaymentInformations></PaymentInformations>
            <p>Service non disponible pour le moment pour des raisons de mention légal</p>
        </div>
        <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Payer et réserver</button>

    </div>
</template>

<script>
import PaymentInformations from "@/components/PaymentInformations.vue";

export default {
    name : "BilletteriePaiement",
    components: {PaymentInformations}


}
</script>