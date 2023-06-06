<template>
  <h1>{{ msg }}</h1>
  <div class="result">count is: {{ bears }}</div>
  <pre class='code'>{{ loading ? 'loading...' : JSON.stringify(list) }}</pre>
  <div class="btn-box">
    <button type="button" @click="handleIncrease">increase</button>
    <button type="button" @click="handleReduce">reduce</button>
    <button type="button" @click="handleFetch">fetch</button>
    <button type="button" @click="handleReset">reset</button>
  </div>
</template>

<script setup lang="js">
import { ref, defineProps } from "vue"
import { storeToRefs } from 'pinia';
import { useCountStore } from '../store/modules/count';

defineProps()

const countStore = useCountStore();
const { bears, loading, list } = storeToRefs(countStore);

const handleIncrease = () => {
  countStore.increase();
}

const handleReduce = () => {
  countStore.reduce();
}

const handleFetch = () => {
  countStore.updateList(1);
}

const handleReset = () => {
  countStore.reset();
}
</script>