// https://shopify.dev/docs/storefront-api/reference/common-objects/image
const fragmentImage = `
fragment FragmentImage on Image {
  width
  height
  originalSrc
  transformedSrc(preferredContentType: WEBP)
  altText
}
`
// https://shopify.dev/docs/storefront-api/reference/products/collection
const fragmentCollection = `
fragment FragmentCollection on Collection {
  id
  handle
  description
  title
}
`

// https://shopify.dev/docs/storefront-api/reference/products/product

const fragmentProduct = `
${fragmentCollection}

${fragmentImage}

fragment FragmentProduct on Product {
  id
  handle
  tags
  images(first: 8) {
    edges {
      node {
        ...FragmentImage
      }
    }
  }
  description
  priceRange {
    maxVariantPrice {
      amount
      currencyCode
    }
  }
  collections(first: 8) {
    edges {
      node {
        ...FragmentCollection
      }
    }
  }
  title
}
`

const fragmentCollectionWithProducts = `
${fragmentProduct}

fragment FragmentCollectionWithProducts on Collection {
  ...FragmentCollection
  products(first: 10) {
    edges {
      node {
        ...FragmentProduct
      }
    }
  } 
}
`

async function sendQuery(query) {
  const url = new URL(process.env.storeUrl)
  const graphQLQuery = `${url.origin}/api/2021-01/graphql.json`

  return await fetch(graphQLQuery, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_TOKEN,
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
}

export async function getProducts(tag = 'All', first = 50) {
  const productQuery = `
  ${fragmentProduct}
  {
    products(query: "tag:${tag}", first: ${first}) {
      edges {
        node{
          ...FragmentProduct
        }
      }
    }
  }
  `
  return await sendQuery(productQuery)
}

export async function getProductBySlug(handle) {
  const query = `
  ${fragmentProduct}
  {
    productByHandle(handle: "${handle}") {
      ...FragmentProduct
    }
  }
  `
  return await sendQuery(query)
}

export async function getProductsByCategory(handle) {
  const query = `
    ${fragmentCollectionWithProducts}
    {
      collectionByHandle(handle: "${handle}") {
        ...FragmentCollectionWithProducts
      }
    }
  `

  return await sendQuery(query)
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
