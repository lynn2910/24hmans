<template>
	<div class="mt-36">
		<h1 class="font-bold text-3xl text-center mb-10">{{ $t('bonuses.personal_data.title') }}</h1>

		<div class="mx-10 md:mx-40">
			<h2 class="text-xl font-bold my-5">{{ $t('bonuses.personal_data.introduction.title') }}</h2>

			<p>{{ $t('bonuses.personal_data.introduction.text') }}</p>

			<h2 class="text-xl font-bold my-5">{{ $t('bonuses.personal_data.data_collection.title') }}</h2>

			<p><strong>{{ $t('bonuses.personal_data.data_collection.collected_data') }}</strong>
				{{ $t('bonuses.personal_data.data_collection.collected_data_text') }}</p>

			<p><strong>{{ $t('bonuses.personal_data.data_collection.data_use') }}</strong></p>

			<div class="ml-5">
				<p><strong>{{ $t('bonuses.personal_data.data_collection.site_functionality') }}</strong>
					{{ $t('bonuses.personal_data.data_collection.site_functionality_text') }}</p>
				<p><strong>{{ $t('bonuses.personal_data.data_collection.personalization') }}</strong>
					{{ $t('bonuses.personal_data.data_collection.personalization_text') }}</p>
			</div>

			<h2 class="text-xl font-bold my-5">{{ $t('bonuses.personal_data.cookies.title') }}</h2>

			<p>{{ $t('bonuses.personal_data.cookies.text') }}</p>

			<h2 class="text-xl font-bold my-5">{{ $t('bonuses.personal_data.data_storage.title') }}</h2>

			<p>{{ $t('bonuses.personal_data.data_storage.text') }}</p>

			<h2 class="text-xl font-bold my-5">{{ $t('bonuses.personal_data.data_sharing.title') }}</h2>

			<p>{{ $t('bonuses.personal_data.data_sharing.text') }}</p>

			<h2 class="text-xl font-bold my-5">{{ $t('bonuses.personal_data.data_security.title') }}</h2>

			<p>{{ $t('bonuses.personal_data.data_security.text') }}</p>

			<h2 class="text-xl font-bold my-5">{{ $t('bonuses.personal_data.your_rights.title') }}</h2>

			<p>{{ $t('bonuses.personal_data.your_rights.text') }}</p>

			<div class="ml-5 flex flex-col justify-start gap-3">
				<p><strong>{{ $t('bonuses.personal_data.your_rights.access_right') }}</strong>
					{{ $t('bonuses.personal_data.your_rights.access_right_text') }}</p>
				<p><strong>{{ $t('bonuses.personal_data.your_rights.rectification_right') }}</strong>
					{{ $t('bonuses.personal_data.your_rights.rectification_right_text') }}</p>
				<p><strong>{{ $t('bonuses.personal_data.your_rights.erasure_right') }}</strong>
					{{ $t('bonuses.personal_data.your_rights.erasure_right_text') }}</p>
				<p><strong>{{ $t('bonuses.personal_data.your_rights.opposition_right') }}</strong>
					{{ $t('bonuses.personal_data.your_rights.opposition_right_text') }}</p>
				<p><strong>{{ $t('bonuses.personal_data.your_rights.limitation_right') }}</strong>
					{{ $t('bonuses.personal_data.your_rights.limitation_right_text') }}</p>
				<p><strong>{{ $t('bonuses.personal_data.your_rights.portability_right') }}</strong>
					{{ $t('bonuses.personal_data.your_rights.portability_right_text') }}</p>
			</div>

			<br>
			<p>{{ $t('bonuses.personal_data.your_rights.contact_text') }} <a class="underline text-blue-400"
																																			 href="mailto:cedric.colin35@gmail.com">cedric.colin35@gmail.com</a>
			</p>

			<h2 class="text-xl font-bold my-5">{{ $t('bonuses.personal_data.policy_changes.title') }}</h2>

			<p>{{ $t('bonuses.personal_data.policy_changes.text') }}</p>

			<h2 class="text-xl font-bold my-5">{{ $t('bonuses.personal_data.contact.title') }}</h2>

			<p>{{ $t('bonuses.personal_data.contact.text') }} <a class="underline text-blue-400"
																													 href="mailto:cedric.colin35@gmail.com">cedric.colin35@gmail.com</a>
			</p>

			<hr class="my-10">
			<p>{{ $t('bonuses.personal_data.edited') }}</p>
		</div>

		<FooterComponent></FooterComponent>
	</div>
</template>

<script>
import FooterComponent from "@/components/navigation/footer/FooterComponent.vue";

export default {
	name: "DonneesPersonnelles",
	components: {FooterComponent},
}
</script>