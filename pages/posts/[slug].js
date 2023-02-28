import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import { CMS_NAME } from '../../lib/constants'
import ContentBlock from '../../components/content-block'
import MultiColumn from '../../components/multi-column'

export default function Post({ post, preview }) {
  const router = useRouter()

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />
  }
  const sections = extractEntries(post, 'sectionsCollection');

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={post.hero.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.hero}
                date={post.date}
                author={post.author}
              />
              {
              
              sections.map((section) => {
                switch (section.__typename) {
                  case 'ContentBlock':
                    return <ContentBlock data={section}/>
                  case 'MultiColumn':
                    return <MultiColumn data={section}/>
                }
              })
              }
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)

  return {
    props: {
      preview,
      post: data?.post ?? null,
    },
    revalidate: 10,
  }
}

function extractEntries(data, collection) {
  return data?.[collection]?.items
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true,
  }
}
