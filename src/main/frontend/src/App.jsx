import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Books from './pages/Books'
import BookDetails from './pages/BookDetails'
import BookCreate from './pages/BookCreate'
import BookEdit from './pages/BookEdit'
import Authors from './pages/Authors'
import AuthorDetails from './pages/AuthorDetails'
import AuthorCreate from './pages/AuthorCreate'
import AuthorEdit from './pages/AuthorEdit'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import OrderHistory from './pages/OrderHistory'
import Publishers from './pages/Publishers'
import PublisherDetails from './pages/PublisherDetails'
import Customers from './pages/Customers'
// import CustomerDetails from './pages/CustomerDetails'
import Orders from './pages/Orders'
// import OrderDetails from './pages/OrderDetails'
import NotFound from './pages/NotFound'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/new" element={<BookCreate />} />
            <Route path="/books/edit/:id" element={<BookEdit />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/authors/new" element={<AuthorCreate />} />
            <Route path="/authors/edit/:id" element={<AuthorEdit />} />
            <Route path="/authors/:id" element={<AuthorDetails />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/publishers" element={<Publishers />} />
            <Route path="/publishers/:id" element={<PublisherDetails />} />
            <Route path="/customers" element={<Customers />} />
            {/*<Route path="/customers/:id" element={<CustomerDetails />} />*/}
            <Route path="/orders" element={<Orders />} />
            {/*<Route path="/orders/:id" element={<OrderDetails />} />*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  )
}

export default App
