<template>
  <div class="setup">
    <h1>Bootstrap the app</h1>
    <div class="form">
      <inline-input label="Your nickname:" />
    </div>
  </div>
</template>

<script>
import InlineInput from '../components/InlineInput.vue'

export default {
  name: 'setup',
  components: {
    InlineInput
  }
}
</script>

<style lang="scss" scoped>
  .setup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
