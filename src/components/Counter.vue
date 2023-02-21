<template>
  <v-card>
    <template #title>
      <div class="d-flex align-center">
        <span class="mr-2">Days since</span>

        <v-text-field
          :model-value="counter.name"
          variant="underlined"
          @update:model-value="counters.updateCounter(counter.id, { name: $event })"
        />

        <v-btn
          color="error"
          variant="text"
          icon="mdi-close"
          @click="counters.removeCounter(counter.id)"
        />
      </div>
    </template>

    <template #text>
      <v-menu width="125" :close-on-content-click="false">
        <template #activator="{ props }">
          <div class="text-center pt-6">
            <span
              style="font-size: 7rem;"
              v-bind="props"
            >
            {{ daysSince }}
            </span>
          </div>
        </template>

        <v-card>
          <template #text>
            <v-form>
              <v-text-field
                :model-value="lastDate"
                :error="!!lastDateError"
                :error-messages="lastDateError"
                label="Last Date"
                variant="underlined"
                hint="DD/MM/YYYY"
                @update:model-value="updateLastDate"
              />
            </v-form>
          </template>
        </v-card>
      </v-menu>

    </template>

    <template #actions>
      <v-btn
        block
        color="success"
        variant="flat"
        @click="lastDate = today.toISOString()"
      >
        Well... It happened...
      </v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCountersStore, type Counter } from '@/store/counters';

const today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);

const props = defineProps<{ counter: Counter }>();

const counters = useCountersStore();

const actualLast = ref('');
const lastDateError = ref('');

const daysSince = computed(() => {
  const diff = today.getTime() - new Date(props.counter.last).getTime();
  const days = diff / (1000 * 3600 * 24);
  return Math.abs(days).toFixed(0)
})
const lastDate = computed({
  get: () => actualLast.value || new Date(props.counter.last).toLocaleDateString(),
  set: (v: string) => {
    const d = new Date(v);

    if(Number.isNaN(d.getTime())) {
      lastDateError.value = 'Date is not valid';
      return;
    }

    if(d.getTime() > today.getTime() && d.getDate() !== today.getDate()) {
      lastDateError.value = 'Date is in the future';
      return;
    }

    actualLast.value = '';
    lastDateError.value = '';
    counters.updateCounter(props.counter.id, { last: d.toISOString() })
  }
})


const updateLastDate = (raw: string) => {
  const [day, month, year] = raw.split('/', 3);
  actualLast.value = raw;
  lastDate.value = `${year}-${month}-${day}T00:00:00.000Z`;
}
</script>

<style scoped>

</style>