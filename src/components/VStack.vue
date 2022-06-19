<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        align: { type: String, required: false }
    },
});
</script>

<template>
    <div :style="{ 'justify-content': align ?? 'center' }">
        <slot></slot>
    </div>
</template>

<style scoped>

div {
    /* background-color: black; */
    display: flex;
    flex-direction: column;
    height: 100%;
}

</style>