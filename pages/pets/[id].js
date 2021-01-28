import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/Layout'
import * as pets from '../../lib/repos/pets'
import AddToCartButton from '../../components/AddToCartButton'

export default function Pet({ pet }) {
  return (
    <Layout>
      <Head>
        <title>{pet.name}</title>
      </Head>

      <div>
        <h1 className="text-lg">{pet.name}</h1>
        <img src={pet.photo} />
        <div className="text-gray-500">${pet.price}</div>
        <AddToCartButton pet={pet} />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = pets.getAllIDs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const pet = pets.findByID(params.id)
  return {
    props: {
      pet
    }
  }
}