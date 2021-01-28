import Head from 'next/head'
import Layout, { siteTitle } from '../../../components/Layout'
import baseUrl from '../../../lib/utils/baseUrl'
import * as orders from '../../../lib/repos/orders'

//TODO: Auth :D
function Order({ order }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h1 className="text-2xl">Thanks for your order!</h1>
        <ul>
          <li>Charge ID: {order.id}</li>
          <li>Total: ${order.total}</li>
        </ul>
      </section>
    </Layout >
  )
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  const orderId = params.id
  const order = await orders.get(orderId)

  // Pass data to the page via props
  return { props: { order } }
}

export default Order