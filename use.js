const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');
const filterCategory = document.getElementById('filter-category');

let total = 0;
let expenses = [];

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;

    if (amount <= 0) {
        alert("Please enter a valid expense amount.");
        return;
    }

    const expense = { description, amount, category, date };
    expenses.push(expense);
    addExpenseToList(expense);
    updateTotal(amount);

    expenseForm.reset();
});

filterCategory.addEventListener('input', function() {
    const filterText = filterCategory.value.toLowerCase();
    displayExpenses(expenses.filter(exp => exp.category.toLowerCase().includes(filterText)));
});

function addExpenseToList(expense) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${expense.description}: $${expense.amount.toFixed(2)} (${expense.category}) <button class="delete-btn" onclick="deleteExpense('${expense.description}')">Delete</button>`;
    expenseList.appendChild(listItem);
}

function deleteExpense(description) {
    expenses = expenses.filter(exp => exp.description !== description);
    displayExpenses(expenses);
    updateTotal();
}

function displayExpenses(expensesToDisplay) {
    expenseList.innerHTML = '';
    expensesToDisplay.forEach(addExpenseToList);
}

function updateTotal(amount = 0) {
    total += amount;
    totalAmount.textContent = total.toFixed(2);
}
