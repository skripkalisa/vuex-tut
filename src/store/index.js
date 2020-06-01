import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // = data
    products: [],
    //{id, quantity}
    cart: [],
    setCheckoutStatus: null,
  },
  getters: {
    // = computed
    availableProducts(state) {
      //, getters
      //console.log(getters)
      return state.products.filter((product) => product.inventory > 0)
    },
    cartProducts(state) {
      return state.cart.map((cartItem) => {
        const product = state.products.find(
          (product) => product.id === cartItem.id
        )
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity,
        }
      })
    },
    cartTotal(state, getters) {
      //verbose method
      // let total = 0
      // getters.cartProducts.forEach((product) => {
      //   total += product.price * product.quantity
      // })
      // return total

      // short method
      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
    },
    productIsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    },
  },

  mutations: {
    // purpose is to alter the state
    setProducts(state, products) {
      // update Products
      state.products = products
    },
    // const cartItem = {id:123, quantity: 2}
    // pushProductToCart(state, cartItem){ state.cart.push(cartItem)}
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1,
      })
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++
    },
    decrementProductInventory(state, product) {
      product.inventory--
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    },
    emptyCart(state) {
      state.cart = []
    },
  },
  actions: {
    // = methods
    // make the call
    // run setProducts mutation
    // context.commit() - to commit a mutition
    // context.state() - to alter the state
    /*     fetchProducts(context) {
      shop.getProducts((products) => {
        context.commit('setProducts', products)
      })
    }, */
    fetchProducts({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts((products) => {
          commit('setProducts', products)
          resolve()
          reject('Error occured')
        })
      })
    },
    addProductToCart({ state, getters, commit }, product) {
      if (getters.productIsInStock(product)) {
        // find Cart item
        const cartItem = state.cart.find((item) => item.id === product.id)
        if (!cartItem) {
          // pushProductToCart
          commit('pushProductToCart', product.id)
        } else {
          //incrementItemQuantity
          commit('incrementItemQuantity', cartItem)
        }
        commit('decrementProductInventory', product)
      }
    },
    checkout({ state, commit }) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    },
    // An example action
    // addToCart(context, product) {
    //   if (product.inventory > 0) {
    //     context.commit('pushProductToCart', product)
    //   } else {
    //      show out of stock message
    //   }
    // },
  },
  modules: {},
})
