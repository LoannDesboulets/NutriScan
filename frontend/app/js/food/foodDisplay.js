// List of food items
// export const foodItems = [
//     "Haricots en conserve", "Nouilles instantanées", "Pizza surgelée", "Macaroni au fromage en boîte",
//     "Chips de pomme de terre", "Saucisses", "Pop-corn micro-ondable", "Céréales pour le petit-déjeuner",
//     "Purée de pommes de terre instantanée", "Soupe en conserve", "Barres énergétiques", "Sandwichs préemballés",
//     "Légumes en conserve", "Frites surgelées", "Tranches de fromage traité", "Biscuits en paquet",
//     "Chili en conserve", "Repas surgelés", "Barres de granola en paquet", "Nuggets de poulet", "Sodas",
//     "Thé glacé en bouteille", "Jus d'orange", "Eau en bouteille", "Boissons énergétiques", "Boissons sportives",
//     "Café", "Chocolat chaud", "Limonade", "Smoothies en bouteille", "Soda", "Milkshakes", "Eau aromatisée",
//     "Jus de fruits", "Sodas diététiques", "Thé vert", "Boissons alcoolisées (bière, vin, cocktails)",
//     "Café glacé", "Eau pétillante", "Eau de coco"
// ];

// Function to display the food items in the list
export function displayFoodItems(foodItems) {
    const foodList = document.getElementById("foodList");
    foodList.innerHTML = ''; // Clear the list before adding items

    foodItems.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" class="food-item"> ${item.name}`;
        foodList.appendChild(li);
    });
}

// Function to filter food items based on the search bar input
export function filterFoodItems() {
    const searchQuery = document.getElementById("searchBar").value.toLowerCase();
    const filteredItems = foodItems.filter(item => item.toLowerCase().includes(searchQuery));

    const foodList = document.getElementById("foodList");
    foodList.innerHTML = ''; // Clear the list

    filteredItems.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" class="food-item"> ${item}`;
        foodList.appendChild(li);
    });

    // Reapply event listeners for new items
    addCheckboxListeners();
}
