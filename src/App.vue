<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HStack from './components/HStack.vue';
</script>

<template>
	<header>
		<HStack>
			<nav>
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/">Projects</RouterLink>
				<RouterLink to="/">Contact</RouterLink>
			</nav>
		</HStack>
	</header>

	<RouterView />
</template>

<style>
@import "@/assets/base_theme.css";
</style>

<style scoped>
header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1;
}

nav {
	padding: 20px;
	height: 50px;
	line-height: 50px;
}

nav a {
	color: var(--font-color);
	text-decoration: none;
	background: var(--secondary-color);
	padding: 10px 20px;
	border: 1px solid rgba(255, 255, 255, 0.05);
	border-top-width: 2px;
	border-bottom-width: 2px;
	font-weight: 500;
	transition: background 0.2s;

	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	-moz-backdrop-filter: blur(10px);
}

nav a:hover {
	background: var(--primary-color);
}

nav a:first-child {
	border-left-width: 2px;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 25px;
}

nav a:last-child {
	border-right-width: 2px;
	border-top-right-radius: 15px;
	border-bottom-right-radius: 25px;
}
</style>
