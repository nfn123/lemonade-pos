// Setup Questions for New Location
// Asked when cashier or kitchen logs in to a location for the first time

const setupQuestions = [
  {
    id: 1,
    question: "Which fruits are currently available at this location?",
    type: "multiselect",
    options: [
      "Strawberry",
      "Mango",
      "Blueberry",
      "Watermelon",
      "Mixed Berries",
      "Pineapple",
      "Raspberry",
      "Blackberry",
      "Peach",
      "Papaya",
      "Coconut",
      "Lemon",
      "Lime",
      "Orange",
      "Passion Fruit"
    ],
    required: true
  },
  {
    id: 2,
    question: "Are there any OTHER fruits you'd like to add to the menu?",
    type: "text",
    placeholder: "Enter custom fruits separated by commas",
    required: false
  },
  {
    id: 3,
    question: "Do you have chocolate chips available as a topping?",
    type: "boolean",
    required: true
  },
  {
    id: 4,
    question: "Are there any OTHER toppings you have to add to the menu?",
    type: "text",
    placeholder: "Enter custom toppings separated by commas",
    required: false
  },
  {
    id: 5,
    question: "Confirm pricing - Mini cups: $1.00, Regular cups: $2.75. Is this correct?",
    type: "boolean",
    required: true
  }
];

module.exports = setupQuestions;
