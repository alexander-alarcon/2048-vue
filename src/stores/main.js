import { defineStore } from 'pinia';

const useMainStore = defineStore('main', {
  state() {
    return {
      message: 'Hello World! from pinia',
    };
  },
});

export default useMainStore;
