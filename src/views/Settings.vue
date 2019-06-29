<template>
  <div class="settings">
    <h1>Your Location</h1>
    <p>Setup your location (either device or your custom location)</p>
    <div class="form">
      <inline-input label="Longitude" />
      <inline-input label="Latitude" />
      <div class="checkbox">
        <input type="checkbox"/>use real values
      </div>
    </div>
  </div>
</template>
<script>
import InlineInput from '../components/InlineInput.vue'

export default {
  name: 'settings',
  components: {
    InlineInput
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
