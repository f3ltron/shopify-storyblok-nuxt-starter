<template>
  <div v-if="category" class="max-w-screen my-20 container mx-auto">
    <div v-if="error">{{ error }}</div>
    <template v-else>
      <h1 class="text-4xl font-semibold text-gray-800 md:text-5xl">
        {{ category.title }}
      </h1>
      <ProductSlider :products="getProducts" />
    </template>
  </div>
</template>

<script>
// import { getProductsByCategory } from '~/plugins/graphql-shopify'

export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
    error: Error,
  },
  computed: {
    getProducts() {
      return this.category.products
        ? this.category.products.edges.map((e) => e.node)
        : []
    },
  },
  // TODO: why calling again category infos in mounted here
  async mounted() {
    // const activeFunction = this.category.path
    //   ? getProductsByPath
    //   : getProductsByCategory
    // const activeParam = this.category.path
    //   ? this.category.path
    //   : this.category.id
    // const res = await activeFunction(activeParam)
    // if (res) {
    //   this.products = res.site.route.node.products.edges.map((e) => e.node)
    // }
  },
}
</script>
