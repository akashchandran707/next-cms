const POST_GRAPHQL_FIELDS_DETAILS = `
slug
title
hero {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
sectionsCollection {
  items {
    ...on MultiColumn {
      __typename
      background
      headerTag
      header
      headerContent {
        json
      }
      columnsCollection {
        items {
          headerTag
          header
          content {
            json
          }
        }
      }
    }
    ...on ContentBlock {
      __typename
      background
      headerTag
      header
      content {
        json
      }
    }
  }
}
footer{
  __typename
}
`
const POST_GRAPHQL_FIELDS = `
slug
title
excerpt
hero {
  url
}
date
author {
  name
  picture {
    url
  }
}
`

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
}

function extractItem(fetchResponse, collection) {
  return fetchResponse?.data?.[collection]?.items?.[0]
}

function extractEntries(fetchResponse, collection) {
  return fetchResponse?.data?.[collection]?.items
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      optimizedComboCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS_DETAILS}
        }
      }
    }`,
    true
  )
  return extractItem(entry, 'optimizedComboCollection')
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      optimizedComboCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS_DETAILS}
        }
      }
    }`
  )
  return extractEntries(entries, 'optimizedComboCollection')
}

export async function getAllPostsForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      optimizedComboCollection(order: date_DESC, preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractEntries(entries, 'optimizedComboCollection')
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      optimizedComboCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS_DETAILS}
        }
      }
    }`,
    preview
  )
  const entries = await fetchGraphQL(
    `query {
      optimizedComboCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS_DETAILS}
        }
      }
    }`,
    preview
  )
  return {
    post: extractItem(entry, 'optimizedComboCollection'),
    morePosts: extractEntries(entries, 'optimizedComboCollection'),
  }
}
