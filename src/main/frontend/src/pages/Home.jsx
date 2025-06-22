import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container-elegant section-padding">
      <div className="text-center animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient font-serif">
          Welcome to Our Bookstore
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-bookstore-dark font-medium max-w-3xl mx-auto leading-relaxed">
          Discover a world of knowledge, imagination, and inspiration in our
          carefully curated collection of books.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card-glass group animate-slide-up">
            <div className="text-center">
              <div className="bg-gradient-to-br from-bookstore-primary to-bookstore-secondary p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-book">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-bookstore-primary font-serif">
                Books
              </h2>
              <p className="mb-6 text-bookstore-dark leading-relaxed">
                Explore our extensive collection of books across various genres,
                from timeless classics to contemporary bestsellers.
              </p>
              <Link
                to="/books"
                className="btn-primary inline-flex items-center"
              >
                Browse Books
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div
            className="card-glass group animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="text-center">
              <div className="bg-gradient-to-br from-bookstore-secondary to-bookstore-accent p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-book">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-bookstore-primary font-serif">
                Authors
              </h2>
              <p className="mb-6 text-bookstore-dark leading-relaxed">
                Meet the brilliant minds behind your favorite stories and
                discover new voices in literature.
              </p>
              <Link
                to="/authors"
                className="btn-primary inline-flex items-center"
              >
                Meet Authors
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div
            className="card-glass group animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="text-center">
              <div className="bg-gradient-to-br from-bookstore-accent to-bookstore-gold p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-book">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-bookstore-primary font-serif">
                Publishers
              </h2>
              <p className="mb-6 text-bookstore-dark leading-relaxed">
                Learn about the publishing houses that bring stories to life and
                shape the literary world.
              </p>
              <Link
                to="/publishers"
                className="btn-primary inline-flex items-center"
              >
                View Publishers
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Featured section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-bookstore-lighter via-white to-bookstore-lighter rounded-2xl shadow-book border border-bookstore-accent">
          <h3 className="text-3xl font-bold mb-6 text-gradient font-serif">
            Why Choose Our Bookstore?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-bookstore-gold text-4xl mb-3">📚</div>
              <h4 className="text-lg font-semibold mb-2 text-bookstore-dark">
                Vast Collection
              </h4>
              <p className="text-bookstore-secondary">
                Thousands of carefully selected books across all genres
              </p>
            </div>
            <div className="text-center">
              <div className="text-bookstore-gold text-4xl mb-3">🚚</div>
              <h4 className="text-lg font-semibold mb-2 text-bookstore-dark">
                Fast Delivery
              </h4>
              <p className="text-bookstore-secondary">
                Quick and reliable shipping to your doorstep
              </p>
            </div>
            <div className="text-center">
              <div className="text-bookstore-gold text-4xl mb-3">💎</div>
              <h4 className="text-lg font-semibold mb-2 text-bookstore-dark">
                Quality Service
              </h4>
              <p className="text-bookstore-secondary">
                Exceptional customer service and support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
