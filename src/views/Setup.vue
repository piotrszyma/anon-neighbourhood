<template>
  <div class="setup">
    <h1>Your nickname</h1>
    <div class="form">
      <inline-input v-model="yourNickname"  label="Your nickname:" />
    </div>
  </div>
</template>

<script>
import InlineInput from '../components/InlineInput.vue'
import storageService from '../services/storageService';
import consts from '../consts';

export default {
  name: 'setup',
  components: {
    InlineInput
  },
  data() {
    return {
      yourNickname: storageService.get(consts.yourNicknameStorageKey) || ''
    }
  },
  watch: {
    yourNickname(newValue) {
      storageService.set(consts.yourNicknameStorageKey, newValue);
    }
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
