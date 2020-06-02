<template lang="pug"> 
#shopping-cart
  h1 Shopping Cart
  ul
    li(v-for="product in products" :key="product.key") {{product.title}} - {{product.price | currency}} - {{product.quantity}}
  p Total: {{total | currency}}
  button.btn.btn-primary(@click="checkout") Checkout
  p(v-if="checkoutStatus" ) {{checkoutStatus}}
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions('cart', ['checkout']),
  },

  computed: {
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotal',
    }),

    // replaced by mapGetters
    // products() {
    //   return this.$store.getters.cartProducts
    // },
    // total() {
    //   return this.$store.getters.cartTotal
    // },
    ...mapState('cart', {
      checkoutStatus: (state) => state.checkoutStatus,
    }),
  },
  props: {},
}
</script>
<style lang="stylus" scoped>
li
  display flex
  list-style  none
</style>
