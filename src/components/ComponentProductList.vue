<template lang="pug"> 
#product-list
  h1 Product List
  img(v-if="loading" src="@/assets/spinner.gif" )
  ul(v-else )
    li(v-for="product in products" :key="product.key") {{product.title}} - {{product.price | currency}} - {{product.inventory}}
      button.btn.btn-primary(:disabled="!productIsInStock(product)" @click="addProductToCart(product)") Add to cart
</template>
<script>
//import shop from '@/api/shop'
//import store from '@/store/index' - use this.$store instead
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    //- not needed due to the global store
    return {
      loading: false,
      productIndex: 1,
    }
  },
  created() {
    // this.products = products direct with local data
    this.loading = true
    // replaced by mapActions
    //this.$store.dispatch('fetchProducts').then(() => (this.loading = false))
    this.fetchProducts().then(() => (this.loading = false))
  },
  methods: {
    ...mapActions({
      fetchProducts: 'fetchProducts',
      addProductToCart: 'addProductToCart',
    }),
    // replaced by mapActions
    // addProductToCart(product) {
    //   this.$store.dispatch('addProductToCart', product)
    // },
  },
  // computed: mapState({
  //   products: (state) => state.products,
  //example code
  // firstProduct: state => state.products[0],
  // specificProduct(state){
  //   return state.products[this.productIndex]
  // }
  // }),
  computed: {
    ...mapState({
      products: (state) => state.products,
    }),
    ...mapGetters({
      productIsInStock: 'productIsInStock',
    }),
    // replaced by mapState
    //products() {
    ///return this.$store.getters.availableProducts
    //   return this.$store.state.products
    // },
    // replaced by mapGetters
    // productIsInStock() {
    //   return this.$store.getters.productIsInStock
    // },
  },
  props: {},
}
</script>
<style lang="stylus" scoped>
li
  display flex
  list-style  none

.btn
  margin 0 20px
</style>
