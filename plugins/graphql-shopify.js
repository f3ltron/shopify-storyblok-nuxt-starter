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

const query = `
query ProductsById {
    site {
      products(entityIds: [], first: 50) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  }
  
fragment ProductFields on Product {
  id
  entityId
  name
  sku
  path
  description
  addToCartUrl
  addToWishlistUrl
  categories {
    edges {
      node {name}
    }
  }
  defaultImage {
    img320px: url(width: 320)
    img640px: url(width: 640)
    img960px: url(width: 960)
    img1280px: url(width: 1280)
    altText
  }
  prices {
    price {
      value
      currencyCode
    }
  }
}`

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
