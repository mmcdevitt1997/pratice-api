function foodFactory(food) {
  let foodString = ` <div> <h1> ${food.name}</h1>
                      <h3> ${food.barcode}</h3>`;
    food.ingredients.forEach(ingredients => {
        foodString += `<p>${ingredients.text}</p>`
    })
    foodString += `</div>`
    return foodString
}


function addFoodToDom (foodAsHTML) {
    document.querySelector("#food-list").innerHTML += foodAsHTML
}

fetch("http://localhost:8088/food")
  .then(response => response.json())
  .then(myParsedFoods => {
    myParsedFoods.forEach(food => {
      console.log(food); // Should have a `barcode` property

      // Now fetch the food from the Food API
      fetch(
        `https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`
      )
        .then(response => response.json())
        .then(productInfo => {
          food.ingredients = productInfo.product.ingredients;

          // Produce HTML representation
          const foodAsHTML = foodFactory(food);

          // Add representaiton to DOM
          addFoodToDom(foodAsHTML);
        });
    });
  });
