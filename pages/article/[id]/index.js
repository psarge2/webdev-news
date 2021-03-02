import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../styles/Layout.module.css'

const article = ({article}) => {
  // const router = useRouter()
  // const { id } = router.query
  return (
    <>
      <div className={styles.container}>
        <h1>{article.title}</h1>
        <p>{article.body_markdown}</p>
        <br />
        <Link href='/'>Go Back</Link>
      </div>

    </>
  )
}

export const getStaticProps = async (context) => {
  const res = await fetch(`https://dev.to/api/articles/${context.params.id}`)

  const article = await res.json()

  return {
    props: {
      article
    }
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`https://dev.to/api/articles`)
  //https://jsonplaceholder.typicode.com/posts/

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
