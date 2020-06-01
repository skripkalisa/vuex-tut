<template lang="pug">
  .home
    img(src="", alt="alt")
    ComponentProductList
    ComponentShoppingCart
</template>
<script>
// @ is an alias to /src
import ComponentProductList from '@/components/ComponentProductList.vue'
import ComponentShoppingCart from '@/components/ComponentShoppingCart.vue'

export default {
  name: 'Home',
  components: {
    ComponentProductList,
    ComponentShoppingCart,
  },
}
</script>
<style lang="stylus" scoped></style>
