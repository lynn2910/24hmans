<template>
	<div class="fixed top-0 left-0">
		<div v-for="(s, index) in snowflakes" :key="index"
				 :style="{top: `${s.y}px`, left: `${s.x}px`, background: color, height: `${s.radius}px`, width: `${s.radius}px`}"
				 class="fixed rounded-3xl"
				 style="z-index: 9999">
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
			height: window.innerHeight
		}
	},
	methods: {
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
			s.y = 0; //this.getRandom(0, this.height);
		},
		loop() {
			this.snowflakes.forEach((s) => {
				this.translateSnowflake(s);
				this.onDown(s)
			});

			window.requestAnimationFrame(this.loop)
		}
	},
	beforeMount() {
		for (let i = 0; i < this.snowAmount; i++) {
			let newSnowflake = ({
				x: this.getRandom(0, this.width),
				y: -Math.floor(Math.random() * this.height),
				radius: this.getRandom(...this.radius),
				speed: this.getRandom(...this.speed),
				wind: this.getRandom(...this.wind),
			});
			this.snowflakes.push(newSnowflake);
		}
		console.log(this.snowflakes);
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