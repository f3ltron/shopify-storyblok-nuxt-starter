async function sendQuery(query) {
  const url = new URL(process.env.storeUrl)
  const graphQLQuery = `${url.origin}/graphql`

  return await fetch(graphQLQuery, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY.TOKEN,
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
}

// export async getStoreSettings() {

// }

// export async function getCategories() {}

// export async function categoriesByIds(ids) {}

// export async function getCategoryPath(id) {}

// export async function getProductCount() {}

// export async function getProducts() {}

// export async function getProductsById(){}

// export async function getProductById(productId){}

// export async function getProductBySlug(slug){}

// export async function getProductsByPath(path) {}

// export async function getProductsByCategory(id) {}
