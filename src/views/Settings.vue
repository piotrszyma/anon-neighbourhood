<template>
  <div class="settings">
    <h1>Your Location</h1>
    <p>Setup your location (either device or your custom location)</p>

    <div class="form">
      <inline-input v-model="longitude" label="Longitude" />
      <inline-input v-model="latitude" label="Latitude" />
      <div class="checkbox">
        <input v-model="useRealValues" type="checkbox"/>use real values
      </div>
    </div>
  </div>
</template>
<script>
import browserService from '../services/browserService.js';
import InlineInput from '../components/InlineInput.vue'
import { getLocation, setOwnLocation } from '../services/locationService.js'
import storageService from '../services/storageService';
import consts from '../consts';
import locationService from '../services/locationService.js'

export default {
  name: 'settings',
  components: {
    InlineInput
  },
  data: function() {
    return {
      longitude: "0",
      latitude: "0",
      useRealValues: storageService.get(consts.useRealValuesStorageKey) || true,
      locationUpdater: () => {}
    }
  },
  methods: {
    async updateLocation() {
      try {
        const latitude = "51.11"
        const   longitude = "17.03"
        // const { latitude, longitude } = await browserService.getLocation();
        this.longitude = longitude;
        this.latitude = latitude;
        // storageService.set(consts.yourLatitudeStorageKey, latitude);
        // storageService.set(consts.yourLongitudeStorageKey, longitude);
        storageService.set(consts.yourSetStorageKey, locationService.computeCoordinates(latitude, longitude));
      } catch (error) {
        console.error(error);
        this.$notify({
          group: 'main',
          type: 'warn',
          title: 'Error when fetching location.',
          text: error,
          timeout: 5000,
        });
      }
    },
    startLocationUpdater() {
      console.log('Starting location updater');
      this.locationUpdater = setInterval(() => {
        this.updateLocation();
        this.$notify({
          group: 'main',
          text: 'Fetching location...',
          timeout: 1000,
        });
        console.log('Fetching location...');
      }, 5000);
    },
    stopLocationUpdater() {
      console.log('Stoping location updater');
      clearInterval(this.locationUpdater);
    }
  },
  watch: {
    useRealValues: {
      immediate: true,
      handler (shouldUseNow, wasUsingEarlier) {
        console.log('Location updater setting changed into: ', shouldUseNow);
        storageService.set(consts.useRealValuesStorageKey, shouldUseNow);
        if (shouldUseNow && !wasUsingEarlier) {
          this.startLocationUpdater();
        } else if(!shouldUseNow && wasUsingEarlier) {
          this.stopLocationUpdater();
        }
      }
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
