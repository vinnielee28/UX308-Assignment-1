let currentState = welcoming;
let order = {};

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput(){
  currentState = welcoming;  
  order = {};
}

function welcoming() {
  let aReturn = [];
  currentState = choosingItem;
  aReturn.push("Welcome to Vinnie's TakeOut!");
  aReturn.push("What would you like? (ramen or quesadilla)");
  return aReturn;
}

function choosingItem(sInput) {
  let aReturn = [];

  if (sInput.toLowerCase().includes("ramen") || sInput.toLowerCase().includes("quesadilla")) {
    order.item = sInput;
    currentState = choosingSize;
    aReturn.push("What size would you like? (small, medium, large)");
  } else {
    aReturn.push("Please choose ramen or quesadilla.");
  }

  return aReturn;
}

function choosingSize(sInput) {
  let aReturn = [];
  order.size = sInput;
  currentState = choosingTopping;
  aReturn.push("Choose a topping (corn, chicken, veggies)");
  return aReturn;
}

function choosingTopping(sInput) {
  let aReturn = [];
  order.topping = sInput;
  currentState = upsellDrink;
  aReturn.push("Would you like a drink? (yes/no)");
  return aReturn;
}

function upsellDrink(sInput) {
  let aReturn = [];

  if (sInput.toLowerCase().startsWith("y")) {
    currentState = choosingDrink;
    aReturn.push("What drink would you like? (pop, water, juice)");
  } else {
    currentState = finishOrder;
    aReturn.push(...finishOrder());
  }

  return aReturn;
}

function choosingDrink(sInput) {
  let aReturn = [];
  order.drink = sInput;
  currentState = finishOrder;
  aReturn.push(...finishOrder());
  return aReturn;
}

function finishOrder() {
  let aReturn = [];

  let summary = `${order.size} ${order.item} with ${order.topping}`;
  if (order.drink) {
    summary += ` and a ${order.drink}`;
  }

  aReturn.push("Order Summary:");
  aReturn.push(summary);
  aReturn.push("Thank you for your order!");

  currentState = welcoming;
  order = {};

  return aReturn;
}