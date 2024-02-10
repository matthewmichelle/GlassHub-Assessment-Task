# Glasshub Project

Glasshub Project is a web application that facilitates the uploading, storage, and display of images alongside their geolocation on a Google Map.

## Technologies Used 

- **Node.js**: A JavaScript runtime for server-side logic.
- **Express.js**: A web application framework for Node.js.
- **PostgreSQL**: An open-source relational database management system.


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
    PORT=3000
    NODE_ENV=development
    DB_HOST=localhost
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_DATABASE=
    ```

5. Start the migration:

    ```bash
    npm run migrate
    ```  

6. Start the server:

    ```bash
    npm run dev 
    ```

7. Access the application in your browser at [http://localhost:3000/api-docs](http://localhost:3000).

8. Access the api documentaion in your browser at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Usage

- Upload images using the provided from front-end application.
- Uploaded images will be stored in the database along with their geolocation data (if available).
- View the uploaded images displayed on a Google Map using  or from front-end application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.