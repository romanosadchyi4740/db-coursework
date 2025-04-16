//package com.coursework.bookstore_api.config;
//
//import com.coursework.bookstore_api.model.*;
//import com.coursework.bookstore_api.repository.*;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//import java.util.Random;
//
//@Component
//@RequiredArgsConstructor
//public class DataSeeder implements CommandLineRunner {
//    private final AuthorRepository authorRepository;
//    private final BookRepository bookRepository;
//    private final CustomerRepository customerRepository;
//    private final GenreRepository genreRepository;
//    private final LanguageRepository languageRepository;
//    private final OrderRepository orderRepository;
//    private final PublisherRepository publisherRepository;
//    private final ReviewRepository reviewRepository;
//
//    private final Random random = new Random();
//
//    @Override
//    public void run(String... args) throws Exception {
//        // Check if data already exists
//        if (authorRepository.count() > 0) {
//            return; // Data already seeded
//        }
//
//        // Seed authors
//        List<Author> authors = seedAuthors();
//
//        // Seed publishers
//        List<Publisher> publishers = seedPublishers();
//
//        // Seed languages
//        List<Language> languages = seedLanguages();
//
//        // Seed genres
//        List<Genre> genres = seedGenres();
//
//        // Seed customers
//        List<Customer> customers = seedCustomers();
//
//        // Seed books
//        List<Book> books = seedBooks(authors, publishers, languages, genres);
//
//        // Seed reviews
//        seedReviews(customers, books);
//
//        // Seed orders
//        seedOrders(customers);
//
//        System.out.println("Data seeding completed successfully!");
//    }
//
//    private List<Author> seedAuthors() {
//        List<Author> authors = new ArrayList<>();
//
//        String[] firstNames = {"John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Laura", "William", "Emma"};
//        String[] lastNames = {"Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"};
//
//        for (int i = 0; i < 10; i++) {
//            Author author = new Author();
//            author.setFirstName(firstNames[i]);
//            author.setLastName(lastNames[i]);
//            authors.add(authorRepository.save(author));
//        }
//
//        return authors;
//    }
//
//    private List<Publisher> seedPublishers() {
//        List<Publisher> publishers = new ArrayList<>();
//
//        String[] publisherNames = {
//            "Penguin Random House", "HarperCollins", "Simon & Schuster", "Hachette Book Group",
//            "Macmillan Publishers", "Scholastic", "Wiley", "Oxford University Press",
//            "Cambridge University Press", "Pearson Education"
//        };
//
//        for (String name : publisherNames) {
//            Publisher publisher = new Publisher();
//            publisher.setPublisherName(name);
//            publishers.add(publisherRepository.save(publisher));
//        }
//
//        return publishers;
//    }
//
//    private List<Language> seedLanguages() {
//        List<Language> languages = new ArrayList<>();
//
//        String[] languageNames = {
//            "English", "Spanish", "French", "German", "Italian",
//            "Portuguese", "Russian", "Japanese", "Chinese", "Arabic"
//        };
//
//        for (String name : languageNames) {
//            Language language = new Language();
//            language.setLanguage(name);
//            languages.add(languageRepository.save(language));
//        }
//
//        return languages;
//    }
//
//    private List<Genre> seedGenres() {
//        List<Genre> genres = new ArrayList<>();
//
//        String[] genreNames = {
//            "Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery",
//            "Thriller", "Romance", "Biography", "History", "Science"
//        };
//
//        for (String name : genreNames) {
//            Genre genre = new Genre();
//            genre.setGenreName(name);
//            genres.add(genreRepository.save(genre));
//        }
//
//        return genres;
//    }
//
//    private List<Customer> seedCustomers() {
//        List<Customer> customers = new ArrayList<>();
//
//        String[] firstNames = {"Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "George", "Hannah", "Ian", "Julia"};
//        String[] lastNames = {"Anderson", "Baker", "Clark", "Davis", "Evans", "Foster", "Green", "Harris", "Irwin", "Jackson"};
//
//        for (int i = 0; i < 10; i++) {
//            Customer customer = new Customer();
//            customer.setFirstName(firstNames[i]);
//            customer.setLastName(lastNames[i]);
//            customer.setUsername(firstNames[i].toLowerCase() + "." + lastNames[i].toLowerCase() + "@example.com");
//            customer.setPassword("password" + i);
//            customers.add(customerRepository.save(customer));
//        }
//
//        return customers;
//    }
//
//    private List<Book> seedBooks(List<Author> authors, List<Publisher> publishers, List<Language> languages, List<Genre> genres) {
//        List<Book> books = new ArrayList<>();
//
//        String[] titles = {
//            "The Great Adventure", "Mystery of the Lost City", "Journey to the Stars", "The Hidden Truth",
//            "Secrets of the Past", "Future Horizons", "The Last Hope", "Eternal Darkness",
//            "Dawn of a New Era", "Beyond the Horizon", "Whispers in the Wind", "Shadows of Destiny",
//            "Echoes of Time", "Forgotten Realms", "The Silent Witness"
//        };
//
//        for (int i = 0; i < 15; i++) {
//            Book book = new Book();
//            book.setTitle(titles[i]);
//
//            // Add 1-3 random authors
//            List<Author> bookAuthors = new ArrayList<>();
//            int authorCount = random.nextInt(3) + 1;
//            for (int j = 0; j < authorCount; j++) {
//                bookAuthors.add(authors.get(random.nextInt(authors.size())));
//            }
//            book.setAuthors(bookAuthors);
//
//            // Add 1-2 random genres
//            List<Genre> bookGenres = new ArrayList<>();
//            int genreCount = random.nextInt(2) + 1;
//            for (int j = 0; j < genreCount; j++) {
//                bookGenres.add(genres.get(random.nextInt(genres.size())));
//            }
//            book.setGenres(bookGenres);
//
//            // Set random price between 10 and 50
//            book.setPrice(10 + random.nextDouble() * 40);
//
//            // Set random stock between 5 and 100
//            book.setNumberInStock(5 + random.nextInt(96));
//
//            // Set random publisher
//            book.setPublisher(publishers.get(random.nextInt(publishers.size())));
//
//            // Set random language
//            book.setLanguage(languages.get(random.nextInt(languages.size())));
//
//            books.add(bookRepository.save(book));
//        }
//
//        return books;
//    }
//
//    private void seedReviews(List<Customer> customers, List<Book> books) {
//        String[] reviewTexts = {
//            "Great book, highly recommend!", "Couldn't put it down!", "A masterpiece!",
//            "Interesting plot but slow pacing.", "Not what I expected, but still enjoyable.",
//            "A must-read for fans of the genre.", "Disappointing ending.", "Brilliant writing!",
//            "Characters felt one-dimensional.", "Will definitely read more from this author!"
//        };
//
//        // Create 20 reviews
//        for (int i = 0; i < 20; i++) {
//            Review review = new Review();
//            review.setText(reviewTexts[random.nextInt(reviewTexts.length)]);
//            review.setReviewer(customers.get(random.nextInt(customers.size())));
//            reviewRepository.save(review);
//        }
//    }
//
//    private void seedOrders(List<Customer> customers) {
//        // Create 15 orders
//        for (int i = 0; i < 15; i++) {
//            Order order = new Order();
//            order.setAmount(20 + random.nextDouble() * 180); // Random amount between 20 and 200
//            order.setPaymentDate(new Date()); // Current date
//            order.setCustomer(customers.get(random.nextInt(customers.size())));
//            orderRepository.save(order);
//        }
//    }
//}