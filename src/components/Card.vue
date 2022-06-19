<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title:      { type: String, required: true },
        date:       { type: String, required: true },
        shortDesc:  { type: String, required: true },
        slug:       { type: String, required: true },
    },

    mounted() {
        (this.$refs.readmore as HTMLButtonElement).onclick = () => {
            this.$router.push({ name: 'article', params: { id: this.slug } })
        }
    }
});
</script>

<template>
    <div>
        <img src="@/assets/wtf.png" />
        <span>{{ date }}</span>
        <h1>{{ title }}</h1>
        <!-- <p>{{ shortDesc }}</p> -->
        <button ref="readmore">Read more...</button>
    </div>
</template>

<style scoped>
div {
    position: relative;
    background-color: var(--primary-color);
    border:         2px solid rgba(255, 255, 255, 0.02);
    margin:         20px;
    margin-bottom:  50px;
    padding:        10px;
    padding-bottom: 40px;
    border-radius:  10px;
    text-align:     center;
    width:          250px;
}

div h1 {
    margin: 0;
    font-size: 1.2rem;
}

div span {
    margin-top: 10px;
    display: block;
    font-size: 0.75rem;
    color: rgb(88, 88, 88);
    font-weight: bold;
}

div img {
    height: 100px;
    margin-top: -70px;
}

div button {
    color: rgb(255, 102, 82);
    cursor: pointer;
    font-size: 0.9rem;

    background-color: var(--primary-color);
    border: 2px solid rgba(255, 255, 255, 0.02);
    padding: 10px;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    font-weight: bold;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
}

div button:hover {
    /* background-color: rgb(46, 46, 46); */
    color: var(--text-color);
    border-color: rgb(255, 102, 82);
}
</style>