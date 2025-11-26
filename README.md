
# Product Management App - AlienSoft Frontend Technical Test

This project is a mini Product Management App built as a solution to the AlienSoft Technologies Frontend Technical Test. It is developed using Vue 3, Pinia, Vue Router, and Tailwind CSS, and it communicates with the public API at `dummyjson.com`.

Now configured for deployment to GitHub Pages.

## Objective

The primary goal of this application is to demonstrate proficiency in modern frontend technologies by building a functional and well-structured Vue.js application. The app supports user authentication, product browsing, and product management features.

## Features

-   **User Authentication:** Secure login using the DummyJSON authentication API. Session is persisted using `localStorage`.
-   **Product Catalog:** Fetches and displays a list of products in a clean, table-based layout.
-   **Search Functionality:** Allows users to search for products by title.
-   **View Product Details:** Users can click on a product to see a dedicated page with its full details.
-   **Add New Product:** A form to add a new product to the catalog.
-   **Delete Product:** Ability to delete a product from its details page.
-   **State Management:** Centralized state management is handled by Pinia, with separate stores for authentication and products.
-   **Protected Routes:** Navigation is guarded to ensure that only authenticated users can access product-related pages.
-   **Responsive Design:** The UI is built with Tailwind CSS and is responsive, providing a good user experience on different screen sizes.

## Tech Stack

-   **Vue 3:** The core framework, using the Composition API.
-   **Vite:** For fast development and optimized builds.
-   **Vue Router:** For client-side routing.
-   **Pinia:** For robust and type-safe state management.
-   **Tailwind CSS:** For utility-first styling.
-   **Axios:** For making HTTP requests to the DummyJSON API.
-   **TypeScript:** For type safety and improved developer experience.

## Project Structure

The `src` directory is organized to maintain a clean separation of concerns:

-   `api/`: Contains the configured Axios client (`client.ts`), including an interceptor to automatically attach the auth token to requests.
-   `assets/`: For global styles.
-   `components/`: For reusable Vue components.
-   `pages/`: Contains the top-level view components for each route.
    -   `login/`: Login page.
    -   `products/`: Product list, product detail, and new product pages.
-   `router/`: Vue Router configuration, including route definitions and navigation guards.
-   `stores/`: Pinia store modules (`auth.ts`, `products.ts`).

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd product-management-app
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Environment Configuration

This project does not require any special environment variables. The API base URL (`https://dummyjson.com`) is hardcoded in the API client.

## Assumptions & Design Choices

-   **Primary Color:** The primary color `#000080` has been used for key interactive elements like buttons, links, and headings to align with the mockups.
-   **Authentication:** The auth token and user data are persisted in `localStorage` to keep the user logged in between sessions. The session is restored automatically when the app loads.
-   **API Client:** An Axios interceptor is used to inject the `Bearer` token into the headers of authenticated requests, centralizing the logic and keeping the component and store code clean.
-   **Error Handling:** Basic error handling is in place. For instance, the login form displays a clear message on failure, and the stores manage an `error` state for API-related issues.
-   **UI Library:** No external Tailwind UI component library was used; all components are built from scratch using utility classes.
