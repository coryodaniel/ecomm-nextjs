
import NavBar from './Navbar'
export const siteTitle = 'K9 Cloners'

export default function Layout({ children }) {
  return (
    <>
      <NavBar title={siteTitle} />
      <main className="md:container md:mx-auto px-4">{children}</main>
    </>
  )
}