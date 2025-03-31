<template>
	<div>
		<div class="fixed top-0 left-0" v-if="showSakura">
			<div v-for="(s, index) in sakuraBlossoms" :key="index"
					 :style="{
                    top: `${s.y}px`,
                    left: `${s.x}px`,
                    height: `${s.radius}px`,
                    width: `${s.radius}px`,
                    backgroundImage: `url(${sakuraImages[s.type].url})`,
                    backgroundSize: 'cover',
                    animationDelay: `${s.delay}s`,
                    transform: `rotate(${s.rotation}deg)`
                 }"
					 class="fixed rounded-full"
					 style="z-index: 9998; pointer-events: none;"
			>
			</div>
		</div>
		<div class="fixed bottom-10 right-0 flex flex-row justify-start">
			<div class="bg-white p-4 rounded-l-xl cursor-pointer w-16 h-16 mt-auto"
					 @click="showEditPopup ? closePopup() : showEditPopup = true">
				<svg class="fill-blue-400" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path
							d="M18.944 10.112C18.507 6.67 15.56 4 12 4 9.244 4 6.85 5.611 5.757 8.15 3.609 8.792 2 10.819 2 13c0 2.757 2.243 5 5 5v-2c-1.654 0-3-1.346-3-3 0-1.403 1.199-2.756 2.673-3.015l.581-.103.192-.559C8.149 7.273 9.895 6 12 6c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-1v2h1c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z"></path>
					<circle cx="15" cy="16" r="1"></circle>
					<circle cx="15" cy="19" r="1"></circle>
					<circle cx="12" cy="18" r="1"></circle>
					<circle cx="12" cy="21" r="1"></circle>
					<circle cx="9" cy="19" r="1"></circle>
					<circle cx="9" cy="16" r="1"></circle>
				</svg>
			</div>
			<div v-if="showEditPopup" class="text-black p-4 bg-white rounded-tl-xl snow_popup">
				<div>
					<h3 class="font-semibold">Vitesse</h3>
					<div class="ml-2">
						<p>Vitesse minimale</p>
						<input type="range" min="0" max="50" step="0.1" v-model="form.speedMin">
						<input type="number" min="0" max="50" step="0.1" v-model="form.speedMin" class="ml-2 w-14">

						<br>
						<p>Vitesse maximale</p>
						<input type="range" min="0" max="50" step="0.1" v-model="form.speedMax">
						<input type="number" min="0" step="0.1" v-model="form.speedMax" class="ml-2 w-14">
					</div>
				</div>
				<div>
					<h3 class="font-semibold">Diamètre des fleurs</h3>
					<div class="ml-2">
						<p>Diamètre minimal</p>
						<input type="range" min="0.1" max="50" step="0.1" v-model="form.radiusMin">
						<input type="number" min="0.1" max="50" step="0.1" v-model="form.radiusMin" class="ml-2 w-14">

						<br>
						<p>Diamètre maximal</p>
						<input type="range" min="0.1" max="10" step="0.1" v-model="form.radiusMax">
						<input type="number" min="0.1" step="0.1" v-model="form.radiusMax" class="ml-2 w-14">
					</div>
				</div>
				<div>
					<h3 class="font-semibold">Vitesse du vent</h3>
					<div class="ml-2">
						<p>Vent minimal</p>
						<input type="range" min="-50" max="50" step="0.1" v-model="form.windMin">
						<input type="number" min="-50" max="50" step="0.1" v-model="form.windMin" class="ml-2 w-14">

						<br>
						<p>Vent maximal</p>
						<input type="range" min="-50" max="50" step="0.1" v-model="form.windMax">
						<input type="number" min="-50" max="50" step="0.1" v-model="form.windMax" class="ml-2 w-14">
					</div>
				</div>
				<div>
					<h3 class="font-semibold">Densité des fleurs</h3>
					<div class="ml-2">
						<p>Nombre de fleurs</p>
						<input type="range" min="10" max="500" step="10" v-model="form.amount">
						<input type="number" min="10" max="500" step="10" v-model="form.amount" class="ml-2 w-14">
					</div>
				</div>
				<div>
					<h3 class="font-semibold">Rotation des fleurs</h3>
					<div class="ml-2">
						<p>Rotation minimale (deg)</p>
						<input type="range" min="-180" max="180" step="1" v-model="form.rotationMin">
						<input type="number" min="-180" max="180" step="1" v-model="form.rotationMin" class="ml-2 w-14">
						<br>
						<p>Rotation maximale (deg)</p>
						<input type="range" min="-180" max="180" step="1" v-model="form.rotationMax">
						<input type="number" min="-180" max="180" step="1" v-model="form.rotationMax" class="ml-2 w-14">
					</div>
				</div>
				<div>
					<h3 class="font-semibold">Probabilités des fleurs</h3>
					<div class="ml-2" v-for="(image, index) in form.sakuraImages" :key="index">
						<p>Probabilité fleur {{ index + 1 }} (%)</p>
						<input type="range" min="0" max="100" step="1" v-model="form.sakuraImages[index].prob">
						<input type="number" min="0" max="100" step="1" v-model="form.sakuraImages[index].prob" class="ml-2 w-14">
					</div>
				</div>
				<div class="flex flex-row items-center content-center justify-between pr-3 mt-3 w-72">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
							 class="cursor-pointer"
							 :class="showSakura ? 'fill-green-500' : 'fill-red-500'"
							 @click="stopStartBtnClicked">
						<path
								d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z"></path>
						<path d="M11 2h2v10h-2z"></path>
					</svg>
					<svg class="cursor-pointer fill-red-500"
							 xmlns="http://www.w3.org/2000/svg" width="32" height="32"
							 viewBox="0 0 24 24"
							 @click="createSakuraBlossoms">
						<path
								d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
					</svg>
					<button class="bg-blue-500 hover:bg-blue-400 rounded py-2 px-3 text-white" @click="applyChanges">Appliquer
					</button>
					<button class="bg-gray-400 hover:bg-gray-300 rounded py-2 px-3 text-white" @click="resetToDefaultValues">
						Réinitialiser
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
			{url: '/flowers/yellow.png', prob: 2},
			{url: '/flowers/fish.png', prob: 5},
			{url: '/flowers/green.png', prob: 2},
			{url: '/flowers/medium1.png', prob: 23},
			{url: '/flowers/medium2.png', prob: 23},
			{url: '/flowers/pink.png', prob: 22},
			{url: '/flowers/white.png', prob: 23},
		];

		return {
			sakuraBlossoms: [],
			width: window.innerWidth,
			height: window.innerHeight,
			showEditPopup: false,
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
				sakuraImages: sakuraImagesList
			},
			applied: {
				speed: this.speed,
				radius: this.radius,
				wind: this.wind,
				amount: this.flowersAmount,
				rotation: this.rotation,
				sakuraImages: sakuraImagesList,
			}
		}
	},
	methods: {
		// POPUP
		closePopup() {
			this.showEditPopup = false;
		},
		applyChanges() {
			this.applied.speed = [this.form.speedMin, this.form.speedMax].sort();
			this.applied.wind = [this.form.windMin, this.form.windMax].sort();
			this.applied.radius = [this.form.radiusMin, this.form.radiusMax].sort();
			this.applied.amount = this.form.amount;
			this.applied.rotation = [this.form.rotationMin, this.form.rotationMax].sort();
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
				let newSakuraBlossom = ({
					x: this.getRandom(0, this.width),
					y: -Math.floor(Math.random() * this.height),
					radius: this.getRandom(...this.applied.radius),
					speed: this.getRandom(...this.applied.speed),
					wind: this.getRandom(...this.applied.wind),
					type: this.getFlowerType(),
					delay: Math.random(),
					rotation: 0,
					rotationSpeed: this.getRandom(...this.applied.rotation)
				});
				this.sakuraBlossoms.push(newSakuraBlossom);
			}
		},

		getRandom(a, b) {
			return a + Math.floor(Math.random() * b);
		},
		documentDimChange() {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
		},
		translateSakuraBlossom(sakuraBlossom) {
			sakuraBlossom.y += sakuraBlossom.speed;
			sakuraBlossom.x += sakuraBlossom.wind;
			sakuraBlossom.rotation = (sakuraBlossom.rotation + sakuraBlossom.rotationSpeed) % 360;
		},
		onDown(s) {
			if (s.y < this.height && (s.x > -20 && s.x < window.innerWidth + 20)) return;

			s.x = this.getRandom(0, this.width);
			s.y = this.getRandom(-this.height, 0);
			s.speed = this.getRandom(...this.applied.speed);
			s.wind = this.getRandom(...this.applied.wind);
			s.rotation = 0;
			s.rotationSpeed = this.getRandom(...this.applied.rotation)
		},
		loop() {
			this.looping = true;
			if (!this.showSakura) {
				this.looping = false;
				return;
			}

			this.sakuraBlossoms.forEach((s) => {
				this.translateSakuraBlossom(s);
				this.onDown(s)
			});

			window.requestAnimationFrame(this.loop)
		}
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
			default: 150
		},
		color: {
			type: String,
			default: "#fff"
		},
		radius: {
			type: Array,
			default: () => [0.5, 3.0]
		},
		speed: {
			type: Array,
			default: () => [1.0, 3.0]
		},
		wind: {
			type: Array,
			default: () => [-0.5, 3.0]
		},
		rotation: {
			type: Array,
			default: () => [-10, 10]
		},
	},
	created() {
		window.addEventListener("resize", this.documentDimChange);
	},
	destroyed() {
		window.removeEventListener("resize", this.documentDimChange);
	},
}
</script>
