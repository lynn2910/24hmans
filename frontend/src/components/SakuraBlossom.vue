<template>
	<div>
		<div class="fixed top-0 left-0" v-if="showSakura">
			<div
					v-for="(s, index) in sakuraBlossoms"
					:key="index"
					:style="{
          top: `${s.y}px`,
          left: `${s.x}px`,
          height: `${s.radius}px`,
          width: `${s.radius}px`,
          backgroundImage: `url(${sakuraImages[s.type].url})`,
          backgroundSize: 'cover',
          animationDelay: `${s.delay}s`,
          transform: `rotate(${s.rotation}deg)`,
        }"
					class="fixed rounded-full"
					style="z-index: 9998; pointer-events: none;"
			>
			</div>
		</div>
		<div class="fixed bottom-10 right-0 flex flex-col md:flex-row justify-start items-end">
			<div
					class="bg-pink-100 p-3 rounded-l-lg cursor-pointer w-14 h-14 mt-auto hover:bg-pink-200 transition duration-300 flex items-center justify-center shadow-md"
					@click="showEditPopup ? closePopup() : showEditPopup = true"
			>
				<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-pink-600"
				>
					<path d="M12 20h9"></path>
					<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 22l-4 1 1-4L16.5 3.5z"></path>
				</svg>
			</div>

			<div class="text-gray-800 p-4 bg-pink-50 rounded-tl-lg shadow-md md:w-auto flex flex-row gap-5 w-auto"
					 v-if="showEditPopup">
				<div class="flex flex-col gap-3">
					<div class="flex flex-col space-y-2">
						<h3 class="font-semibold text-sm">Probabilités des fleurs</h3>
						<div v-for="(image, index) in form.sakuraImages" :key="index"
								 class="flex flex-col sm:flex-row items-start sm:items-center gap-1">
							<p class="w-28 text-xs">Probabilité fleur {{ image.name || (index + 1) }} (%)</p>
							<input
									type="range"
									min="0"
									max="100"
									step="1"
									v-model="form.sakuraImages[index].prob"
									class="w-full sm:w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
							/>
							<input
									type="number"
									min="0"
									max="100"
									step="1"
									v-model="form.sakuraImages[index].prob"
									class="w-16 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
							/>
						</div>
					</div>
					<div class="flex flex-col space-y-2">
						<h3 class="font-semibold text-sm">Vitesse du vent</h3>
						<div class="flex flex-col sm:flex-row items-start sm:items-center gap-1">
							<p class="w-28 text-xs">Vent minimal</p>
							<input
									type="range"
									min="-50"
									max="50"
									step="0.1"
									v-model="form.windMin"
									class="w-full sm:w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
							/>
							<input
									type="number"
									min="-50"
									max="50"
									step="0.1"
									v-model="form.windMin"
									class="w-16 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
							/>
						</div>
						<div class="flex flex-col sm:flex-row items-start sm:items-center gap-1">
							<p class="w-28 text-xs">Vent maximal</p>
							<input
									type="range"
									min="-50"
									max="50"
									step="0.1"
									v-model="form.windMax"
									class="w-full sm:w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
							/>
							<input
									type="number"
									min="-50"
									max="50"
									step="0.1"
									v-model="form.windMax"
									class="w-16 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
							/>
						</div>
					</div>
				</div>

				<div class="flex flex-col gap-3">
					<div class="grid grid-cols-1 grid-rows-2 gap-3">
						<div class="flex flex-col space-y-2">
							<h3 class="font-semibold text-sm">Vitesse</h3>
							<div class="flex flex-col sm:flex-row items-start sm:items-center gap-1">
								<p class="w-28 text-xs">Vitesse minimale</p>
								<input
										type="range"
										min="0"
										max="50"
										step="0.1"
										v-model="form.speedMin"
										class="w-full sm:w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
								/>
								<input
										type="number"
										min="0"
										max="50"
										step="0.1"
										v-model="form.speedMin"
										class="w-16 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
								/>
							</div>
							<div class="flex flex-col sm:flex-row items-start sm:items-center gap-1">
								<p class="w-28 text-xs">Vitesse maximale</p>
								<input
										type="range"
										min="0"
										max="50"
										step="0.1"
										v-model="form.speedMax"
										class="w-full sm:w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
								/>
								<input
										type="number"
										min="0"
										max="50"
										step="0.1"
										v-model="form.speedMax"
										class="w-16 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
								/>
							</div>
						</div>
						<div class="flex flex-col space-y-2">
							<h3 class="font-semibold text-sm">Diamètre des fleurs</h3>
							<div class="flex flex-col sm:flex-row items-start sm:items-center gap-1">
								<p class="w-28 text-xs">Diamètre minimal</p>
								<input
										type="range"
										min="0.1"
										max="50"
										step="0.1"
										v-model="form.radiusMin"
										class="w-full sm:w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
								/>
								<input
										type="number"
										min="0.1"
										max="50"
										step="0.1"
										v-model="form.radiusMin"
										class="w-16 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
								/>
							</div>
							<div class="flex flex-col sm:flex-row items-start sm:items-center gap-1">
								<p class="w-28 text-xs">Diamètre maximal</p>
								<input
										type="range"
										min="0.1"
										max="50"
										step="0.1"
										v-model="form.radiusMax"
										class="w-full sm:w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
								/>
								<input
										type="number"
										min="0.1"
										max="50"
										step="0.1"
										v-model="form.radiusMax"
										class="w-16 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
								/>
							</div>
						</div>
						<div class="flex flex-col space-y-2">
							<h3 class="font-semibold text-sm">Rotation des fleurs</h3>
							<div class="flex flex-col sm:flex-row items-start sm:items-center gap-1">
								<p class="w-28 text-xs">Rotation minimale (deg)</p>
								<input
										type="range"
										min="-180"
										max="180"
										step="1"
										v-model="form.rotationMin"
										class="w-full sm:w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
								/>
								<input
										type="number"
										min="-180"
										max="180"
										step="1"
										v-model="form.rotationMin"
										class="w-16 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
								/>
							</div>
							<div class="flex flex-col sm:flex-row items-start sm:items-center gap-1">
								<p class="w-28 text-xs">Rotation maximale (deg)</p>
								<input
										type="range"
										min="-180"
										max="180"
										step="1"
										v-model="form.rotationMax"
										class="w-full sm:w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
								/>
								<input
										type="number"
										min="-180"
										max="180"
										step="1"
										v-model="form.rotationMax"
										class="w-16 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
								/>
							</div>
						</div>
						<div class="flex flex-col space-y-2 py-4">
							<h3 class="font-semibold text-sm">Densité des fleurs</h3>
							<div class="flex flex-col sm:flex-row items-start sm:items-center gap-1">
								<p class="w-28 text-xs">Nombre de fleurs</p>
								<input
										type="range"
										min="10"
										max="500"
										step="10"
										v-model="form.amount"
										class="w-full sm:w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
								/>
								<input
										type="number"
										min="10"
										max="500"
										step="10"
										v-model="form.amount"
										class="w-16 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs"
								/>
							</div>
						</div>
					</div>

				</div>

				<div class="flex flex-col items-center content-center justify-start gap-3 pt-3 mt-3">
					<div class="flex flex-row justify-between w-full">
						<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								class="cursor-pointer"
								:class="showSakura ? 'fill-green-500' : 'fill-red-500'"
								@click="stopStartBtnClicked"
						>
							<path
									d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z"></path>
							<path d="M11 2h2v10h-2z"></path>
						</svg>
						<svg
								class="cursor-pointer fill-red-500 hover:fill-red-600 transition duration-300"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								@click="createSakuraBlossoms"
						>
							<path
									d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
						</svg>
					</div>
					<button
							class="w-full bg-blue-500 hover:bg-blue-600 rounded py-2 px-3 text-white transition duration-300 font-semibold text-xs"
							@click="applyChanges"
					>Appliquer
					</button>
					<button
							class="w-full bg-gray-400 hover:bg-gray-500 rounded py-2 px-3 text-white transition duration-300 font-semibold text-xs"
							@click="resetToDefaultValues"
					>Réinitialiser
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SakuraBlossom",
	data() {
		const sakuraImagesList = [
			{url: '/flowers/yellow.png', prob: 1, name: "Jaune"},
			{url: '/flowers/fish.png', prob: 0.5, name: "🐟"},
			{url: '/flowers/green.png', prob: 1, name: "Verte"},
			{url: '/flowers/medium1.png', prob: 25, name: "Rose pale 1"},
			{url: '/flowers/medium2.png', prob: 25, name: "Rose pale 2"},
			{url: '/flowers/pink.png', prob: 23, name: "Rose"},
			{url: '/flowers/white.png', prob: 24.5, name: "Blanche"},
		];

		return {
			sakuraBlossoms: [],
			width: window.innerWidth,
			height: window.innerHeight,
			showEditPopup: true,
			showSakura: true,
			looping: false,
			sakuraImages: sakuraImagesList,
			form: {
				speedMin: this.speed[0],
				speedMax: this.speed[1],
				radiusMin: this.radius[0],
				radiusMax: this.radius[1],
				windMin: this.wind[0],
				windMax: this.wind[1],
				amount: this.flowersAmount,
				rotationMin: this.rotation[0],
				rotationMax: this.rotation[1],
				sakuraImages: sakuraImagesList,
			},
			applied: {
				speed: this.speed,
				radius: this.radius,
				wind: this.wind,
				amount: this.flowersAmount,
				rotation: this.rotation,
				sakuraImages: sakuraImagesList,
			},
		};
	},
	methods: {
		// POPUP
		closePopup() {
			this.showEditPopup = false;
		},
		applyChanges() {
			this.applied.speed = [this.form.speedMin, this.form.speedMax].sort((a, b) => a - b);
			this.applied.wind = [this.form.windMin, this.form.windMax].sort((a, b) => a - b);
			this.applied.radius = [this.form.radiusMin, this.form.radiusMax].sort((a, b) => a - b);
			this.applied.amount = this.form.amount;
			this.applied.rotation = [this.form.rotationMin, this.form.rotationMax].sort((a, b) => a - b);
			this.applied.sakuraImages = [...this.form.sakuraImages]; // Copy the array
			this.createSakuraBlossoms();
		},
		resetToDefaultValues() {
			this.form.speedMin = this.speed[0];
			this.form.speedMax = this.speed[1];
			this.form.radiusMin = this.radius[0];
			this.form.radiusMax = this.radius[1];
			this.form.windMin = this.wind[0];
			this.form.windMax = this.wind[1];
			this.form.amount = this.flowersAmount;
			this.form.rotationMin = this.rotation[0];
			this.form.rotationMax = this.rotation[1];
			this.form.sakuraImages = [...this.sakuraImages]; // Reset to the original prop
		},
		stopStartBtnClicked() {
			this.showSakura = !this.showSakura;

			if (this.showSakura && !this.looping) {
				this.loop();
			}
		},

		// SAKURA EDIT
		getFlowerType() {
			const rand = Math.random() * 100;
			let cumulativeProbability = 0;
			for (let i = 0; i < this.applied.sakuraImages.length; i++) {
				cumulativeProbability += this.applied.sakuraImages[i].prob;
				if (rand <= cumulativeProbability) {
					return i;
				}
			}
			return this.applied.sakuraImages.length - 1;
		},

		createSakuraBlossoms() {
			this.sakuraBlossoms = [];
			for (let i = 0; i < this.applied.amount; i++) {
				let newSakuraBlossom = {
					x: this.getRandom(0, this.width),
					y: -Math.floor(Math.random() * this.height),
					radius: this.getRandom(...this.applied.radius),
					speed: this.getRandom(...this.applied.speed),
					wind: this.getRandom(...this.applied.wind),
					type: this.getFlowerType(),
					delay: Math.random(),
					rotation: 0,
					rotationSpeed: this.getRandom(...this.applied.rotation),
				};
				this.sakuraBlossoms.push(newSakuraBlossom);
			}
		},

		getRandom(a, b) {
			return a + Math.floor(Math.random() * (b - a + 1)); // Corrected Math.random() range
		},
		documentDimChange() {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
		},
		translateSakuraBlossom(sakuraBlossom) {
			sakuraBlossom.wind += this.getRandom(-0.001, 0.001);
			sakuraBlossom.speed += this.getRandom(0, 0.001);

			sakuraBlossom.y += sakuraBlossom.speed + (Math.random());
			sakuraBlossom.x += sakuraBlossom.wind + (Math.random());
			sakuraBlossom.rotation = (sakuraBlossom.rotation + sakuraBlossom.rotationSpeed) % 360;
		},
		onDown(s) {
			if (s.y < this.height && (s.x > -20 && s.x < window.innerWidth + 20)) return;

			s.x = this.getRandom(0, this.width);
			s.y = this.getRandom(-this.height, 0);
			s.speed = this.getRandom(...this.applied.speed);
			s.wind = this.getRandom(...this.applied.wind);
			s.rotation = 0;
			s.rotationSpeed = this.getRandom(...this.applied.rotation);
		},
		loop() {
			this.looping = true;
			if (!this.showSakura) {
				this.looping = false;
				return;
			}

			this.sakuraBlossoms.forEach((s) => {
				this.translateSakuraBlossom(s);
				this.onDown(s);
			});

			window.requestAnimationFrame(this.loop);
		},
	},
	beforeMount() {
		this.createSakuraBlossoms();
	},
	mounted() {
		this.loop();
	},
	props: {
		flowersAmount: {
			type: Number,
			default: 150,
		},
		color: {
			type: String,
			default: "#fff",
		},
		radius: {
			type: Array,
			default: () => [0.5, 3.0],
		},
		speed: {
			type: Array,
			default: () => [1.0, 3.0],
		},
		wind: {
			type: Array,
			default: () => [-0.5, 3.0],
		},
		rotation: {
			type: Array,
			default: () => [-10, 10],
		},
	},
	created() {
		window.addEventListener("resize", this.documentDimChange);
	},
	destroyed() {
		window.removeEventListener("resize", this.documentDimChange);
	},
};
</script>
