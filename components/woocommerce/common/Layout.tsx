import { CommerceProvider } from '@woocommerce'
import { FC, Fragment } from 'react'
const Layout: FC = ({ children }) => {
  return <CommerceProvider>{children}</CommerceProvider>
}

export default Layout
