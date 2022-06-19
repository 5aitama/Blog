<script setup lang="ts">
import HStack from "@/components/HStack.vue";
</script>

<script lang="ts">
import { defineComponent, VueElement } from "vue";
import { marked } from "marked";
import type Database from "@/assets/types";

export default defineComponent({
    data() {
        return {
            markdown: "",
        };
    },
    computed: {
        htmlMarkdown() { return marked(this.markdown); }
    },

    async mounted() {
        let db: Database = await fetch("/Blog/db.json").then(res => res.json()).catch(_ => {})
        let article = db.articles.find(article => article.slug == this.$route.params.id);

        if (!article) {
            // Return to home page
            return
        }

        this.markdown = article.content;
    }
});
</script>
<template>
    <HStack class="container">
        <div ref="content" class="article-content" v-html="htmlMarkdown"></div>
    </HStack>
</template>

<style scoped>
    .container {
        height: 100%;
        box-sizing: border-box;
        padding-top: 100px;
        overflow-y: auto;
    }

    .article-content {
        box-sizing: border-box;
        padding: 0 40px;
        width: 100%;
        min-width: 300px;
        max-width: 700px;
    }
</style>

<style>
    .article-content p img {
        border: none;
        border-radius: 5px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        margin: 20px 0;
        width: 100%;
        object-fit: cover;
    }
</style>
