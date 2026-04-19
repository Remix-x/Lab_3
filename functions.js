/**
 * @param {Array<Object>} transactions
 * @returns {Array<string>}
 */
function getUniqueTransactionTypes(transactions) {
    const allTypes = transactions.map(t => t.transaction_type);
    const uniqueTypes = new Set(allTypes);
    return [...uniqueTypes];
}

function calculateTotalAmount(transactions){ // Вычисляет сумму всех транзакций.
    return transactions.reduce((total, t) => total + t.transaction_amount, 0);
}

function calculateTotalAmountByDate(transactions, year, month, day) { //Вычисляет общую сумму транзакций за указанный год, месяц и день.
    const filtered = transactions.filter(t => {
        const date = new Date(t.transaction_date);
        const yearMatch = !year || date.getFullYear() === year;
        const monthMatch = month === undefined || (date.getMonth() + 1) === month;
        const dayMatch = !day || date.getDate() === day;

        return yearMatch && monthMatch && dayMatch;
    });

    return calculateTotalAmount(filtered);
}

function getTransactionByType(transactions, type) { // Возвращает транзакции указанного типа (debit или credit).
    return transactions.filter(t => t.transaction_type === type);
}

function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter(t => {
        const current = new Date(t.transaction_date);
        return current >= start && current <= end;
    });
}

function getTransactionsByMerchant(transactions, merchantName) { //  Возвращает массив транзакций, совершенных с указанным merchantName
    return transactions.filter(t => t.merchant_name === merchantName);
}

function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0;
    const total = calculateTotalAmount(transactions); // используем твою функцию
    return total / transactions.length;
}


function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

function calculateTotalDebitAmount(transactions) {
    const debits = getTransactionByType(transactions, 'debit');
    return calculateTotalAmount(debits);
}

// Вспомогательная функция для получения названия месяца
const getMonthName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { month: 'long' }); // Вернет "January", "February" и т.д.
};

function findMostTransactionsMonth(transactions) {
    const monthCounts = transactions.reduce((acc, t) => {
        const month = getMonthName(t.transaction_date);
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
}

function findMostDebitTransactionMonth(transactions) {
    const debits = getTransactionByType(transactions, 'debit');
    return findMostTransactionsMonth(debits);
}

function mostTransactionTypes(transactions) {
    const debitCount = getTransactionByType(transactions, 'debit').length;
    const creditCount = getTransactionByType(transactions, 'credit').length;

    if (debitCount > creditCount) return 'debit';
    if (creditCount > debitCount) return 'credit';
    return 'equal';
}

function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);
    return transactions.filter(t => new Date(t.transaction_date) < targetDate);
}


function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id);
}

function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
}

function runAllFunctions(transactions) {
    console.log("--- Результаты всех функций ---");

    console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
    console.log("Общая сумма:", calculateTotalAmount(transactions));
    
    console.log("Сумма за 2019 год:", calculateTotalAmountByDate(transactions, 2019));
    console.log("Транзакции типа debit:", getTransactionByType(transactions, 'debit'));
    console.log("В диапазоне дат:", getTransactionsInDateRange(transactions, '2019-01-01', '2019-01-31'));
    console.log("Средняя сумма:", calculateAverageTransactionAmount(transactions));
    console.log("В диапазоне сумм (50-150):", getTransactionsByAmountRange(transactions, 50, 150));
    console.log("Общая сумма дебета:", calculateTotalDebitAmount(transactions));
    console.log("Месяц с макс. транзакций:", findMostTransactionsMonth(transactions));
    console.log("Месяц с макс. дебетом:", findMostDebitTransactionMonth(transactions));
    console.log("Каких типов больше:", mostTransactionTypes(transactions));
    console.log("Транзакции до 2019-02-01:", getTransactionsBeforeDate(transactions, '2019-02-01'));
    console.log("Транзакция по ID '1':", findTransactionById(transactions, '1'));
    console.log("Все описания:", mapTransactionDescriptions(transactions));
    
    console.log("--- Проверка завершена ---");
}