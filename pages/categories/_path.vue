<template>
  <div v-if="category">
    <Category :category="category" :error="error" />
  </div>
</template>

<script>
import { getProductsByCategory } from '~/plugins/graphql-shopify'
import Category from '~/components/Category.vue'

export default {
  components: {
    Category,
  },
  async asyncData(context) {
    const categoryPath = context.params.path

    try {
      const res = await getProductsByCategory(categoryPath)
      return {
        category: res.collectionByHandle,
      }
    } catch (e) {
      console.log(e)
    }
  },
  data() {
    return {
      category: {},
      error: null,
    }
  },
}
</script>
