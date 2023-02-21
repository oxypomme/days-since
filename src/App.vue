<template>
  <v-app>
    <v-main>
      <v-app-bar density="compact" rounded>
        <v-app-bar-title>
          Days since ___
        </v-app-bar-title>

        <template #append>
          <v-btn
            icon="mdi-plus"
            color="green"
            @click="counters.addCounter()"
          />
        </template>
      </v-app-bar>

      <v-container>
        <v-row>
          <v-col v-for="counter in counters.data" :key="counter.id" cols="4">
            <Counter :counter="counter" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Counter from './components/Counter.vue'
import { useCountersStore } from './store/counters';

const counters = useCountersStore();
</script>
