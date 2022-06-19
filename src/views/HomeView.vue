<script setup lang="ts">
import AnimatedBackground from "@/js/animated-background";
import Context 	from "@/js/gfx/context";
import HStack 	from "@/components/HStack.vue";
import VStack 	from "@/components/VStack.vue";
import Card		from "@/components/Card.vue";
import { defineComponent } from "vue";
</script>

<script lang="ts">
import type Database from "@/assets/types";

export default defineComponent({
	data() {
		return {
			db: {} as Database,
		}
	},

	async mounted() {
		const canvas = this.$refs.main_canvas as HTMLCanvasElement;
		new AnimatedBackground(new Context(canvas)).start();

		this.db = await fetch("/Blog/db.json").then(res => res.json()).catch(_ => {})
	},
});
</script>

<template>
	<div class="content">
		<canvas id="main-canvas" ref="main_canvas"></canvas>
		<VStack class="main">
			<HStack>
				<VStack :style="{ 'text-align': 'center' }">
					<img class="profile" src="@/assets/profile.png" />
					<h1>Hi 👋, I'm 5aitama</h1>
					<p>And welcome to my devblog 🧪📝</p>
				</VStack>
			</HStack>
		</VStack>
	</div>
	<div style="padding-top: 20px;background: var(--secondary-color)">
		<HStack>
			<Card v-for="article in db.articles" 
				:title="article.title" 
				:date="article.date" 
				:short-desc="article.description" 
				:slug="article.slug"
			/>
			
		</HStack>
	</div>
</template>

<style scoped>

.content {
	position: relative;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}

.main {
	position: absolute;
	width: 100%;
	height: 100%;
}

p, h1 {
	margin: 4px 0;
}

.profile {
	height: 300px;
	margin-bottom: 20px;
}

#main-canvas {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 0;
}
</style>