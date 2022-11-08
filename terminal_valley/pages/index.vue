<template>
  <div style="min-width: 20%; display: flex; flex-direction: column">
    <h2>Terminal Valley</h2>
    <div class="container">
      <div class="fetch-api">
        <h3>Fetch API</h3>
        <button class="start-button" @click="loadResults()">{{logs.length > 0 ? "Restart" : "Start Game"}}</button>
        <p>{{ result }}</p>
        <div v-for="log in logs" :key="log.id">
          <p>{{ log.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GameApi from "~~/api/resources/GameApi";
import { ref } from "vue";

export default {
  setup() {
    const logs = ref({});
    const result = ref("");
    const loadResults = async () => {
      const apiRes = await GameApi.index();
      logs.value = apiRes.logs;
      result.value = apiRes.result;
    };

    return {
      logs,
      result,
      loadResults,
    };
  },
};
</script>

<style lang="css" scoped>

.start-button {
  cursor: pointer;
  color: #1cc49d;
  background-color: #1b2f31;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3em;
  width: 8em;
  font-size: large;
  font-weight: 600;
}
</style>