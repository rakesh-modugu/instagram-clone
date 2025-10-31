# Insta Share App (Built with Modern React Hooks)

This project is my hands-on journey into building a modern, responsive web application using React. It's an Instagram-inspired social media app where users can log in, view a feed of posts, see user stories, and check out their own and other users' profiles.

My primary goal was to move beyond older class-based components and build the entire application using **modern React Hooks (`useState`, `useEffect`, `useContext`)** for state management and handling side effects.

This app demonstrates my ability to build a secure, multi-page, and interactive application from the ground up, consuming a live API and focusing on a clean, reusable component structure.

## Key Features

  * **Modern React Hooks:** Managed all component-level and global state efficiently using React Hooks. This includes:
      * `useState` for managing local component state (like form inputs and search queries).
      * `useEffect` for fetching data from the API and handling component side effects.
  * **Secure Authentication:** Implemented a complete authentication flow (login/logout). User credentials are verified, and a `jwt_token` is stored in cookies using `js-cookie` to manage the session.
  * **Protected Routes:** Ensured secure access to private pages. Users who are not logged in are automatically redirected to the login page, protecting routes like Home, Profile, and User Details.
  * **Dynamic Routing:** Built a multi-page experience using `react-router-dom` (v5), including dynamic routes to display specific user profiles based on their ID (e.g., `/users/:userId`).
  * **Live API Integration:** Fetched all data (user stories, posts, profile details) from an external API using the browser's `fetch` API.
  * **Asynchronous Data Handling:** Gracefully managed asynchronous operations by displaying a loader component while data is being fetched and showing specific error messages if the API call fails.
  * **Interactive UI:** Created an interactive feed where users can like and unlike posts. This action triggers a `POST` request to the server, and the UI updates instantly.
  * **Responsive Design:** Designed a fully responsive, mobile-first UI using CSS3 that adapts perfectly to all screen sizes, from small phones to large desktops.

## What I Learned

Building this project taught me several critical front-end development skills:

  * The power and simplicity of **React Hooks** for managing state and replacing traditional lifecycle methods.
  * How to build a secure front-end **authentication system** from scratch using cookies and protected routes.
  * Best practices for **fetching and handling API data**, including managing loading, success, and failure states.
  * How to implement **dynamic routing** to create detailed, data-driven pages.
  * The importance of breaking down a complex UI into small, **reusable, and functional components** for a clean and maintainable codebase.

## Technologies Used

  * **React** (v17)
  * **React Hooks** (useState, useEffect)
  * **React Router DOM** (v5)
  * **JavaScript (ES6+)**
  * **js-cookie** (for token-based authentication)
  * **React Icons**
  * **React Slick** (for the stories carousel)
  * **CSS3** (for styling and responsive media queries)

## Setup Instructions

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/insta-share.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd insta-share
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm start
    ```
5.  Open `http://localhost:3000` to view it in the browser.
