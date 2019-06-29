<template>
  <div class="input">
    <p>{{ label }}</p>
    <input :value="value" @input="handleInput"/>
    <button @click="handleOk">OK</button>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    value: String
  },
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value)
    },
    handleOk (event) {
      this.$emit('submit')
    }
  }
}
</script>
<style lang="scss" scoped>
    p {
      font-size: 1.2rem;
      text-align: center;
    }

    input {
      border: none;
      border-bottom: 1px solid #9edbbd;
      font-size: 1.5rem;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      box-shadow: 10px 10px 45px -10px rgba(0,0,0,0.31);
      background: none;
    }
    button {
      border: 0;
      font-size: 1rem;
      height: 35.8px;
      padding: 0 0.5rem;
      position: absolute;
      cursor: pointer;
      background: none;
    }
</style>
