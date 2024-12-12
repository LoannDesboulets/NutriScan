// Import necessary modules

// These modules should handle specific parts of the logic
import { displayFoodItems, filterFoodItems } from './food/foodDisplay.js'; // Import food list functions
import { updateSelectedFoodItems, addCheckboxListeners } from './food/selectedFood.js'; // Import functions for selected food
import { toggleDarkMode } from './theme/themeToggle.js'; // Import dark mode toggle function

async function getFoodItems() {
    try {
        // Make the request to minio endpoint
        const response = await fetch('http://localhost:5000/minio/minio/ciqual/objects');

        // Check if the response is successful (status code 200)
        if (!response.ok) {
            throw new Error('Failed to fetch food items');
        }

        // Parse the response as JSON
        const data = await response.json();
        const foodItems = data.objects;

        // Get the <ul> element where we will display the food items
        const foodList = document.getElementById('foodList');

        // // Loop through the food items and create <li> elements for each one
        // foodItems.forEach(item => {
        //     const listItem = document.createElement('li');
        //     listItem.textContent = `${item.name}`;
        //     foodList.appendChild(listItem);
        // });

        displayFoodItems(foodItems);
        addCheckboxListeners();
    } catch (error) {
        console.error('Error fetching food items:', error);
    }
}


// Initial setup when the page loads
document.addEventListener("DOMContentLoaded", () => {
    // Display the food list and set up listeners
    getFoodItems();
    
    // Check if dark mode was previously enabled and set the state
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Set up the dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', toggleDarkMode);
});
