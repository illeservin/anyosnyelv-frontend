import fetch from 'cross-fetch';

const WP_ENDPOINT = import.meta.env.WP_ENDPOINT;

async function wpFetch(query, variables = {}) {
  const res = await fetch(WP_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error('WPGraphQL error ' + res.status);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

export async function getPosts({ first = 20, after = null } = {}) {
  const q = `
    query AllPosts($first:Int!, $after:String) {
      posts(first:$first, after:$after, where:{ status: PUBLISH }) {
        pageInfo { endCursor hasNextPage }
        nodes {
          id
          slug
          title
          date
          excerpt
          categories { nodes { name slug } }
          featuredImage {
            node {
              sourceUrl
              mediaDetails {
                width
                height
                sizes { name sourceUrl width height }
              }
            }
          }
        }
      }
    }
  `;
  const data = await wpFetch(q, { first, after });
  return data.posts;
}

export async function getPostBySlug(slug) {
  const q = `
    query PostBySlug($slug:ID!) {
      post(id:$slug, idType:SLUG) {
        id
        slug
        title
        content
        excerpt
        date
        modified
        author { node { name } }
        categories { nodes { name slug } }
        featuredImage {
          node {
            sourceUrl
            mediaDetails {
              width
              height
              sizes { name sourceUrl width height }
            }
          }
        }
      }
    }
  `;
  const data = await wpFetch(q, { slug });
  return data.post;
}

export function pickBestImage(node) {
  if (!node?.featuredImage?.node) return null;
  const media = node.featuredImage.node;
  const sizes = media.mediaDetails?.sizes || [];
  const pick = sizes.find(s => s.width >= 1600) || sizes.find(s => s.width >= 1200) || { sourceUrl: media.sourceUrl, width: media.mediaDetails?.width, height: media.mediaDetails?.height };
  return pick;
}
