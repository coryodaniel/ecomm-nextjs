import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import { getAllPetsData } from '../lib/repos/pets'
import Card from '../components/Card'

export default function Home({ allPetsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h1 className="text-2xl">Freshly Cloned Pets</h1>
        <ul>
          {allPetsData.map((pet) => <Card key={pet.id} pet={pet} />)}
        </ul>
      </section>
    </Layout >
  )
}

export async function getStaticProps() {
  const allPetsData = getAllPetsData()
  return {
    props: {
      allPetsData
    }
  }
}