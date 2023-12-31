import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapProvider from '@/helpers/BootstrapProvider';
const inter = Inter({ subsets: ['latin'] })
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from '@/context/userContext';


export const metadata = {
  title: 'Next Full Demo',
  description: 'Full featured Next Js Demo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <BootstrapProvider>
          <UserContextProvider>
            <ToastContainer />
            {children}
          </UserContextProvider>
        </BootstrapProvider>
      </body>

    </html>
  )
}
