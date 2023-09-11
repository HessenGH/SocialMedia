import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Head from 'next/head'
const Layout = ({children,title}) => {
  return (
    
      <>

      <Head>
  
   <title>{title}</title>
      </Head>
      <Header/>
      <main style={{minHeight:'70vh'}}>
        {children}
      </main>
      <Footer/>
      </>
  )
}

Layout.defaultProps={
    title:"social Media app",

}

export default Layout
