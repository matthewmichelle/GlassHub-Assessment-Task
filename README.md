# Glasshub Project

Glasshub Project is a web application that facilitates the uploading, storage, and display of images alongside their geolocation on a Google Map.

## Technologies Used 

- **Node.js**: A JavaScript runtime for server-side logic.
- **Express.js**: A web application framework for Node.js.
- **Vue.js**: A progressive JavaScript framework for building user interfaces.
- **PostgreSQL**: An open-source relational database management system.
- **Axios**: A promise-based HTTP client for the browser and Node.js.

## Getting Started

To run this application locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd GlassHub-Assessment-Task
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the PostgreSQL database:

    - Create a new database.

4. Set up environment variables:

    Create a `.env` file in the root directory of the project and add the following variables:

    ```plaintext
    DB_HOST=localhost
    DB_USER=your_postgres_username
    DB_PASSWORD=your_postgres_password
    DB_DATABASE=your_database_name
    ```

5. Start the server:

    ```bash
    npm run dev 
    ```

6. Access the application in your browser at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

7. Access the api documentaion in your browser at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Usage

- Upload images using the provided from front-end application.
- Uploaded images will be stored in the database along with their geolocation data (if available).
- View the uploaded images displayed on a Google Map using  or from front-end application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.