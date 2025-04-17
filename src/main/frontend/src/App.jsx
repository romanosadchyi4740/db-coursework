import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Books from './pages/Books'
import BookDetails from './pages/BookDetails'
import Authors from './pages/Authors'
import AuthorDetails from './pages/AuthorDetails'
// import Publishers from './pages/Publishers'
// import PublisherDetails from './pages/PublisherDetails'
// import Customers from './pages/Customers'
// import CustomerDetails from './pages/CustomerDetails'
// import Orders from './pages/Orders'
// import OrderDetails from './pages/OrderDetails'
// import Reviews from './pages/Reviews'
// import ReviewDetails from './pages/ReviewDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:id" element={<AuthorDetails />} />
          {/*<Route path="/publishers" element={<Publishers />} />*/}
          {/*<Route path="/publishers/:id" element={<PublisherDetails />} />*/}
          {/*<Route path="/customers" element={<Customers />} />*/}
          {/*<Route path="/customers/:id" element={<CustomerDetails />} />*/}
          {/*<Route path="/orders" element={<Orders />} />*/}
          {/*<Route path="/orders/:id" element={<OrderDetails />} />*/}
          {/*<Route path="/reviews" element={<Reviews />} />*/}
          {/*<Route path="/reviews/:id" element={<ReviewDetails />} />*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App