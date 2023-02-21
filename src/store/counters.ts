// Utilities
import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid';
import { useStorage } from '@vueuse/core'

export interface Counter {
  id: string,
  last: string,
  name: string,
}

export const useCountersStore = defineStore('counters', {
  state: () => ({
    data: useStorage<Counter[]>('dayssince_counters', [])
  }),
  actions: {
    addCounter() {
      this.data.push({
        id: uuid(),
        last: new Date().toISOString(),
        name: `Counter #${this.data.length}`,
      });
    },
    removeCounter(id: string) {
      const index = this.data.findIndex((el) => el.id === id);
      if(index < 0) {
        return;
      }

      this.data.splice(index, 1);
    },
    updateCounter(id: string, partial: Partial<Omit<Counter, 'id'>>) {
      const index = this.data.findIndex((el) => el.id === id);
      if(index < 0) {
        return;
      }

      this.data.splice(index, 1, { ...this.data[index], ...partial })
    }
  }
})
