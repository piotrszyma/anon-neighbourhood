<template>
  <div class="home">
    <h1>Find your neighbour</h1>
    <div class="form">
      <inline-input v-model="anonNickname" label="Anon's nickname:" />
    </div>
  </div>
</template>
<script>
import InlineInput from '../components/InlineInput.vue'
import storageService from '../services/storageService';
import consts from '../consts';

const ANON_NICKNAME_KEY = 'anonNickname';

export default {
  name: 'home',
  components: {
    InlineInput
  },
  data: function () {
    return {
      anonNickname: storageService.get(consts.AnonNicknameStorageKey) || ''
    }
  },
  watch: {
    anonNickname(newValue) {
      storageService.set(consts.AnonNicknameStorageKey, newValue);
    }
  }
}
</script>
<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      font-size: 1.2rem;
      text-align: center;
    }

    input {
      border: none;
      border-bottom: 2px solid #2c3e50;
      font-size: 1.2rem;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      box-shadow: 10px 10px 45px -10px rgba(0,0,0,0.31);
      background: none;
    }
  }

</style>
