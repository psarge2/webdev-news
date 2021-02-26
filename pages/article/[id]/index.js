import Link from 'next/link'
import { useRouter } from 'next/router'

const article = ({article}) => {
  // const router = useRouter()
  // const { id } = router.query
  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href='/'>Go Back</Link>
    </>
  )
}

export const getStaticProps = async (context) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)

  const article = await res.json()

  return {
    props: {
      article
    }
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`)

  const articles = await res.json()

  //array of article ids
  const ids = articles.map(article => article.id)

  const paths = ids.map(id => ({params: {id: id.toString()}}))
  //{params: {id: '1', id: '2'}}

  return{
    paths,
    fallback: false //returns a 404 page if path does not exist
  }
}

export default article
