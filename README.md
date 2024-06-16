# Axpo shop Website

Welcome to our E-Commerce Website project! This project is built using React.js for the frontend, Node.js for the backend, and MongoDB for the database.

## Introduction

This project is an e-commerce website that aims to provide a seamless online shopping experience. Users can browse products, view product details, add items to their cart, and make purchases securely.

## Features

- User Authentication:
  - Sign up and sign in using JSON Web Tokens (JWT) for secure authentication.
- Product Management:
  - Browse products by categories.
  - View detailed information about products.
- Shopping Cart:
  - Add products to the cart.
  - Adjust quantities and remove items from the cart.
- Secure Payment:
  - Secure payment processing integrated for safe transactions.
- Order History:
  - View past orders and their details.
- Flight Bookings
  - You can book your flight from source to destination along with selection of seats

## Getting Started

### Prerequisites

- Node.js and npm: Make sure you have Node.js and npm installed. You can download them from https://nodejs.org/.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ashishume/ecommerce.git
   ```
2. Install the main dependencies in the root folder:
  
    ```
    npm install
    ```
2. Install frontend dependencies:

   ```sh
    cd frontend
    npm install
   ```

3. Create a .env.development.local and .env.production.local files in the frontend directory and configure your environment variables:

   ```
   for prod: REACT_APP_API_BASE_URL= http://prod-server-link/
   for dev: REACT_APP_API_BASE_URL=http://localhost:3000/v1/api/
   ```

4. Install backend dependencies:

   ```sh
    cd backend
    npm install
   ```

5. Create a .env file in the backend directory and configure your environment variables:

   ```
   DB_CONNECTION_STR=mongodb://localhost/your-database-name
   SECRET_KEY=your-secret-key
   ```

6. Start both the servers 

   ```
   # In the root directory
   npm start
   ```

- Screenshots  
![image](https://github.com/ashishume/Axpo-shop-ecommerce/assets/21136600/ea88ffdd-f700-4610-8308-e36403295931)
![image](https://github.com/ashishume/Axpo-shop-ecommerce/assets/21136600/d1234945-bcb6-4485-beb8-7b45d0344ff5)
![image](https://github.com/ashishume/Axpo-shop-ecommerce/assets/21136600/0c3958ce-9803-46a7-89d9-b219d70cc531)
![image](https://github.com/ashishume/Axpo-shop-ecommerce/assets/21136600/dfa32c02-5def-4eac-9f0f-1db40991a37f)
![image](https://github.com/ashishume/Axpo-shop-ecommerce/assets/21136600/fb17698d-f489-451f-90c4-9eb18ecd731a)
![image](https://github.com/ashishume/Axpo-shop-ecommerce/assets/21136600/9f3fe87d-f228-4a8b-bbba-8172c5921e37)
![image](https://github.com/ashishume/Axpo-shop-ecommerce/assets/21136600/9813db47-adf2-4f32-83ff-cffb31608fa1)

