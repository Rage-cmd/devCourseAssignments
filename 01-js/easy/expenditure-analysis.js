/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let result = [];

  let categoryMap = {};
  for (let i=0; i<transactions.length; ++i) {
    currentCategory = transactions[i].category;
    categoryMap[currentCategory] = categoryMap.hasOwnProperty(currentCategory) ? categoryMap[currentCategory] + transactions[i].price : transactions[i].price;
  }

  const allCategories = Object.keys(categoryMap);
  // console.log(allCategories)
  for (let i = 0; i < allCategories.length; ++i) {
    // console.log(key)
    const categoryCount = {}
    categoryCount['totalSpent'] = categoryMap[allCategories[i]]
    categoryCount['category'] = allCategories[i]
    result.push(categoryCount);
  }
  return result;
}

transactions = [
  {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	},
  {
		id: 2,
		timestamp: 1656076800001,
		price: 15,
		category: 'Clothes',
		itemName: 'T-shirt',
	},
  {
		id: 3,
		timestamp: 1656076800002,
		price: 20,
		category: 'Food',
		itemName: 'Pasta',
	}
]

console.log(calculateTotalSpentByCategory(transactions));

module.exports = calculateTotalSpentByCategory;
