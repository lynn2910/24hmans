<template>
	<div>
		<div class="fixed top-0 left-0" v-if="showSnow">
			<div v-for="(s, index) in snowflakes" :key="index"
					 :style="{top: `${s.y}px`, left: `${s.x}px`, background: color, height: `${s.radius}px`, width: `${s.radius}px`}"
					 class="fixed rounded-3xl"
					 style="z-index: 9998">
			</div>
		</div>
		<div class="fixed bottom-10 right-0 flex flex-row justify-start">
			<!-- Bouton -->
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
			<!-- Form -->
			<div v-if="showEditPopup" class="text-black p-4 bg-white rounded-tl-xl snow_popup">
				<!-- Vitesse -->
				<div>
					<h3 class="font-semibold">Vitesse</h3>
					<div class="ml-2">
						<p>Vitesse minimale</p>
						<input type="range" min="0" max="50" step="0.1" v-model="form.speedMin">
						<input type="number" min="0" max="50" step="0.1" v-model="form.speedMin" class="ml-2 w-14">

						<br>
						<p>Vitesse maximale</p>
						<input type="range" min="0" max="10" step="0.1" v-model="form.speedMax">
						<input type="number" min="0" step="0.1" v-model="form.speedMax" class="ml-2 w-14">
					</div>
				</div>
				<!-- Diamètre flocons -->
				<div>
					<h3 class="font-semibold">Diamètre des flocons</h3>
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
				<!-- Vent -->
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
				<!-- Actions -->
				<div class="flex flex-row items-center content-center justify-between pr-3 mt-3 w-72">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
							 class="cursor-pointer"
							 :class="showSnow ? 'fill-green-500' : 'fill-red-500'"
							 @click="stopStartBtnClicked">
						<path
								d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z"></path>
						<path d="M11 2h2v10h-2z"></path>
					</svg>
					<svg class="cursor-pointer fill-red-500"
							 xmlns="http://www.w3.org/2000/svg" width="32" height="32"
							 viewBox="0 0 24 24"
							 @click="createSnowflakes">
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
	name: "Snow",
	data() {
		return {
			snowflakes: [],
			width: window.innerWidth,
			height: window.innerHeight,
			showEditPopup: false,
			showSnow: true,
			looping: false,
			form: {
				speedMin: this.speed[0],
				speedMax: this.speed[1],
				radiusMin: this.radius[0],
				radiusMax: this.radius[1],
				windMin: this.wind[0],
				windMax: this.wind[1],
			},
			applied: {
				speed: this.speed,
				radius: this.radius,
				wind: this.wind
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
		},
		resetToDefaultValues() {
			this.form.speedMin = this.speed[0];
			this.form.speedMax = this.speed[1];
			this.form.radiusMin = this.radius[0];
			this.form.radiusMax = this.radius[1];
			this.form.windMin = this.wind[0];
			this.form.windMax = this.wind[1];
		},
		stopStartBtnClicked() {
			this.showSnow = !this.showSnow;

			if (this.showSnow && !this.looping) {
				this.loop();
			}
		},

		// SNOW EDIT

		createSnowflakes() {
			this.snowflakes = [];
			for (let i = 0; i < this.snowAmount; i++) {
				let newSnowflake = ({
					x: this.getRandom(0, this.width),
					y: -Math.floor(Math.random() * this.height),
					radius: this.getRandom(...this.applied.radius),
					speed: this.getRandom(...this.applied.speed),
					wind: this.getRandom(...this.applied.wind),
				});
				this.snowflakes.push(newSnowflake);
			}
		},

		getRandom(a, b) {
			return a + Math.floor(Math.random() * b);
		},
		documentDimChange() {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
		},
		translateSnowflake(snowflake) {
			snowflake.y += snowflake.speed;
			snowflake.x += snowflake.wind;
		},
		onDown(s) {
			if (s.y < this.height) return;

			s.x = this.getRandom(0, this.width);
			s.y = this.getRandom(-this.height, 0);
			s.speed = this.getRandom(...this.applied.speed);
			s.wind = this.getRandom(...this.applied.wind);
		},
		loop() {
			this.looping = true;
			if (!this.showSnow) {
				this.looping = false;
				return;
			}

			this.snowflakes.forEach((s) => {
				this.translateSnowflake(s);
				this.onDown(s)
			});

			window.requestAnimationFrame(this.loop)
		}
	},
	beforeMount() {
		this.createSnowflakes();
	},
	mounted() {
		this.loop();
	},
	props: {
		snowAmount: {
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
	},
	created() {
		window.addEventListener("resize", this.documentDimChange);
	},
	destroyed() {
		window.removeEventListener("resize", this.documentDimChange);
	},
}
</script>