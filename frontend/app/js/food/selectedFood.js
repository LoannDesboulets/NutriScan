// Function to update the selected food list
export function updateSelectedFoodItems() {
    const selectedFoodList = document.getElementById("selectedFoodList");
    selectedFoodList.innerHTML = ""; // Clear the list

    // Find all checked items
    const checkboxes = document.querySelectorAll("#foodList input[type='checkbox']:checked");
    checkboxes.forEach((checkbox) => {
        const itemName = checkbox.nextSibling.textContent.trim(); // Get the text of the item

        // Create list item for selected food
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        // Add item name
        const itemNameSpan = document.createElement("span");
        itemNameSpan.textContent = itemName;

        // Add weight input
        const weightInput = document.createElement("input");
        weightInput.type = "number";
        weightInput.min = "0";
        weightInput.value = "100"; // Default weight value in grams
        weightInput.className = "form-control weight-input";
        weightInput.style.width = "80px"; // Adjust width as needed

        // Append elements to the list item
        li.appendChild(itemNameSpan);
        li.appendChild(weightInput);

        // Append list item to selected food list
        selectedFoodList.appendChild(li);
    });
}

// Add event listener to handle check/uncheck of items
export function addCheckboxListeners() {
    const checkboxes = document.querySelectorAll("#foodList input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            updateSelectedFoodItems();
        });
    });
}
