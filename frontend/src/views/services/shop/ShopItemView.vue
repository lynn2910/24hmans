<script>

import {defineComponent} from "vue";
import ItemBigView from "@/components/services/shop/ItemBigView.vue";

export default defineComponent({
	components: {ItemBigView}
})
</script>

<template>
	<ItemBigView :item_name="$route.params.item_name"
							 :prestataire_name="$route.params.prestataire_name"></ItemBigView>
</template>