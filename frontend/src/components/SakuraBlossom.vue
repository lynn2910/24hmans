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
			<div class="bg-[#e7cac8] p-4 rounded-l-xl cursor-pointer w-16 h-16 mt-auto"
					 @click="showEditPopup ? closePopup() : showEditPopup = true">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1"
						 viewBox="0 0 455.069 455.069" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
					<g id="SVGRepo_iconCarrier"> <g> <path style="fill:#FF8882;"
																								 d="M175.224,215.095c2.56-7.88-1.75-16.35-9.63-18.91c-7.88-2.56-16.34,1.76-18.9,9.63 c-2.56,7.88,1.75,16.35,9.63,18.91C164.204,227.285,172.664,222.965,175.224,215.095z M195.204,276.585 c-6.7-4.87-16.08-3.39-20.95,3.32c-4.87,6.7-3.38,16.08,3.32,20.95c6.7,4.87,16.08,3.38,20.95-3.32 C203.394,290.835,201.904,281.455,195.204,276.585z M227.534,177.085c8.28,0,15-6.71,15-15c0-8.28-6.72-15-15-15s-15,6.72-15,15 C212.534,170.375,219.254,177.085,227.534,177.085z M259.864,276.585c-6.7,4.87-8.19,14.25-3.32,20.95 c4.87,6.7,14.25,8.19,20.95,3.32c6.7-4.87,8.19-14.25,3.32-20.95C275.944,273.195,266.564,271.715,259.864,276.585z M241.804,227.455c-1.95-6.02-7.61-10.37-14.27-10.37s-12.32,4.35-14.27,10.37c-0.47,1.46-0.73,3.01-0.73,4.63 c0,8.29,6.72,15,15,15s15-6.71,15-15C242.534,230.465,242.274,228.915,241.804,227.455z M279.844,215.095 c2.56,7.87,11.02,12.19,18.9,9.63s12.19-11.03,9.63-18.91c-2.56-7.87-11.02-12.19-18.9-9.63 C281.594,198.745,277.284,207.215,279.844,215.095z M454.764,212.905c4.2,39.91-35.69,61.43-81.81,66.43 c34.37,31.15,53.99,72.01,27.14,101.83c-12.61,14-29.29,22.13-46.64,24.24c-7.36,15.84-20.25,29.2-37.46,36.86 c-36.66,16.33-69.45-14.96-88.46-57.28c-19.01,42.32-51.8,73.61-88.46,57.28c-17.21-7.66-30.1-21.02-37.46-36.86 c-17.35-2.11-34.03-10.24-46.64-24.24c-26.85-29.82-7.23-70.68,27.14-101.83c-46.12-5-86.01-26.52-81.81-66.43 c1.97-18.74,10.69-35.12,23.48-47.02c-3.35-17.15-0.78-35.53,8.64-51.85c20.07-34.75,64.99-28.71,105.24-5.65 c-9.49-45.4-1.36-89.99,37.89-98.34c18.43-3.91,36.71-0.68,51.98,7.81c15.27-8.49,33.55-11.72,51.98-7.81 c39.25,8.35,47.38,52.94,37.89,98.34c40.25-23.06,85.17-29.1,105.24,5.65c9.42,16.32,11.99,34.7,8.64,51.85 C444.074,177.785,452.794,194.165,454.764,212.905z"></path>
						<circle style="fill:#FF382E;" cx="297.163" cy="393.131" r="7.5"></circle>
						<circle style="fill:#FF382E;" cx="267.163" cy="363.131" r="7.5"></circle>
						<circle style="fill:#FF382E;" cx="402.215" cy="215.629" r="7.5"></circle>
						<path style="fill:#FFFFFF;"
									d="M289.292,219.905l-4.635-14.266l-49.623,16.124v-52.177h-15v52.177l-49.624-16.124l-4.635,14.266 l49.624,16.124l-30.669,42.212l12.135,8.816l30.669-42.211l30.669,42.211l12.135-8.816l-30.669-42.212L289.292,219.905z"></path>
						<circle style="fill:#FFC743;" cx="227.534" cy="232.086" r="15"></circle>
						<circle style="fill:#FF382E;" cx="227.534" cy="162.086" r="15"></circle>
						<circle style="fill:#FF382E;" cx="160.96" cy="210.455" r="15"></circle>
						<circle style="fill:#FF382E;" cx="186.389" cy="288.717" r="15"></circle>
						<circle style="fill:#FF382E;" cx="268.679" cy="288.717" r="15"></circle>
						<circle style="fill:#FF382E;" cx="294.108" cy="210.455" r="15"></circle> </g> </g></svg>
			</div>
			<div v-if="showEditPopup" class="text-black p-4 bg-[#e7cac8] rounded-tl-xl snow_popup">
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
			{url: '/flowers/yellow.png', prob: 1},
			{url: '/flowers/fish.png', prob: 0.5},
			{url: '/flowers/green.png', prob: 1},
			{url: '/flowers/medium1.png', prob: 25},
			{url: '/flowers/medium2.png', prob: 25},
			{url: '/flowers/pink.png', prob: 23},
			{url: '/flowers/white.png', prob: 24.5},
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
			sakuraBlossom.wind += this.getRandom(-0.001, 0.001)
			sakuraBlossom.speed += this.getRandom(0, 0.001)

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
