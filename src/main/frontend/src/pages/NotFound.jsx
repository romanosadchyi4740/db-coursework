import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-xl mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound