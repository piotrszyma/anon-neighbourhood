<template>
  <div class="settings">
    <h1>Your Location</h1>
    <p>Setup your location (either device or your custom location)</p>

    <div class="form">
      <inline-input @submit="update" label="Longitude" />
      <inline-input @submit="update" label="Latitude" />
      <div class="checkbox">
        <input type="checkbox"/>use real values
      </div>
    </div>
  </div>
</template>
<script>
import browserService from '../services/browserService.js';
import InlineInput from '../components/InlineInput.vue'
import { getLocation, setOwnLocation } from '../services/locationService.js'

export default {
  name: 'settings',
  components: {
    InlineInput
  },
  async created() {
    try {
      const { latitude, longitude } = await browserService.getLocation();
      alert(`
        Longitude: ${latitude}
        Latitude: ${longitude}
      `);
    } catch (error) {
      alert(error);
    }
  },
  methods: {
    update() {
      setOwnLocation(1, 90)
    }
  }
}
</script>

<style lang="scss" scoped>
  .settings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .checkbox {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  p {
    text-align: center;
  }
</style>
