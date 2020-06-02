import shop from '@/api/shop'
export default {
  namespaced: true,
  state: {
    // = data
    items: [],
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
  },
  mutations: {
    // purpose is to alter the state
    setProducts(state, products) {
      // update Products
      state.items = products
    },

    decrementProductInventory(state, product) {
      product.inventory--
    },
  },
  getters: {
    // = computed
    availableProducts(state) {
      //, getters
      //console.log(getters)
      return state.items.filter((product) => product.inventory > 0)
    },

    productIsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    },
  },
}
