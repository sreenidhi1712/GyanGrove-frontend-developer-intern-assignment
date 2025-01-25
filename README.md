# Dynamic Inventory Management App

## Description

This is a simple inventory management application built with **React.js**, **Redux Toolkit**, and **Tailwind CSS**. The app displays a table of items in stock and allows users to:

- Add new items to the inventory.
- Edit and delete existing items.
- Filter the table by item category.
- Sort items by quantity.
- Highlight low-stock items (e.g., quantity below 10).
- Show only products that are in stock (quantity greater than 0).

The app is fully responsive, ensuring a seamless experience on both desktop and mobile devices. Initially, dummy JSON data is used to populate the inventory, which can be modified or extended.

---

## Features

- **Add Products**: Users can add new items to the inventory with fields like name, category, price, and quantity.
- **Edit Products**: Existing items can be updated, modifying their properties like name, category, price, or quantity.
- **Delete Products**: Items can be removed from the inventory.
- **Filter by Category**: The inventory can be filtered by category to view specific types of items.
- **Sort by Quantity**: The items can be sorted by quantity to prioritize stock levels.
- **Low-Stock Highlighting**: Products with a quantity below 10 are highlighted to easily spot low-stock items.
- **Stock Availability**: Only products with a quantity above 0 are displayed in the table.

---

## Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **Redux Toolkit**: Used for state management and handling actions like adding, updating, and deleting products.
- **Tailwind CSS**: A utility-first CSS framework for styling the app, ensuring a responsive and clean design.
- **Dummy JSON Data**: Used to populate the inventory initially, simulating real data in the app.

---


## Installation

To get started with the  Dynamic Inventory Management Table project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sreenidhi1712/GyanGrove-frontend-developer-intern-assignment.git
 
2. **Install dependencies:**

    ```
    npm install

3. **Start the development server:**

    ```
    npm run dev

4. **Open your web browser and navigate to:**

    http://localhost:5173/