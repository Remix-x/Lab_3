/**
 * Returns unique transaction types.
 * @param {Object[]} transactions - Array of transactions.
 * @returns {string[]} Array of unique transaction types.
 */
function getUniqueTransactionTypes(transactions) {
    const allTypes = transactions.map(t => t.transaction_type);
    const uniqueTypes = new Set(allTypes);
    return [...uniqueTypes];
}

/**
 * Calculates total amount of all transactions.
 * @param {Object[]} transactions - Array of transactions.
 * @returns {number} Total amount.
 */
function calculateTotalAmount(transactions) {
    return transactions.reduce((total, t) => total + t.transaction_amount, 0);
}

/**
 * Calculates total amount filtered by date (year, month, day).
 * @param {Object[]} transactions
 * @param {number} [year]
 * @param {number} [month]
 * @param {number} [day]
 * @returns {number} Total amount for filtered transactions.
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
    const filtered = transactions.filter(t => {
        const date = new Date(t.transaction_date);

        const yearMatch = !year || date.getFullYear() === year;
        const monthMatch = month === undefined || (date.getMonth() + 1) === month;
        const dayMatch = !day || date.getDate() === day;

        return yearMatch && monthMatch && dayMatch;
    });

    return calculateTotalAmount(filtered);
}

/**
 * Returns transactions by type.
 * @param {Object[]} transactions
 * @param {string} type
 * @returns {Object[]} Filtered transactions.
 */
function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
}

/**
 * Returns transactions within a date range.
 * @param {Object[]} transactions
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Object[]} Filtered transactions.
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return transactions.filter(t => {
        const current = new Date(t.transaction_date);
        return current >= start && current <= end;
    });
}

/**
 * Returns transactions by merchant name.
 * @param {Object[]} transactions
 * @param {string} merchantName
 * @returns {Object[]} Filtered transactions.
 */
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(t => t.merchant_name === merchantName);
}

/**
 * Calculates average transaction amount.
 * @param {Object[]} transactions
 * @returns {number} Average amount.
 */
function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0;
    const total = calculateTotalAmount(transactions);
    return total / transactions.length;
}

/**
 * Filters transactions by amount range.
 * @param {Object[]} transactions
 * @param {number} minAmount
 * @param {number} maxAmount
 * @returns {Object[]} Filtered transactions.
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(
        t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount
    );
}

/**
 * Calculates total debit amount.
 * @param {Object[]} transactions
 * @returns {number} Total debit amount.
 */
function calculateTotalDebitAmount(transactions) {
    const debits = getTransactionByType(transactions, 'debit');
    return calculateTotalAmount(debits);
}

/**
 * Returns month name from date string.
 * @param {string} dateStr
 * @returns {string} Month name.
 */
const getMonthName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { month: 'long' });
};

/**
 * Finds month with most transactions.
 * @param {Object[]} transactions
 * @returns {string} Month name.
 */
function findMostTransactionsMonth(transactions) {
    const monthCounts = transactions.reduce((acc, t) => {
        const month = getMonthName(t.transaction_date);
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(monthCounts).reduce((a, b) =>
        monthCounts[a] > monthCounts[b] ? a : b
    );
}

/**
 * Finds month with most debit transactions.
 * @param {Object[]} transactions
 * @returns {string} Month name.
 */
function findMostDebitTransactionMonth(transactions) {
    const debits = getTransactionByType(transactions, 'debit');
    return findMostTransactionsMonth(debits);
}

/**
 * Compares number of debit and credit transactions.
 * @param {Object[]} transactions
 * @returns {string} 'debit' | 'credit' | 'equal'
 */
function mostTransactionTypes(transactions) {
    const debitCount = getTransactionByType(transactions, 'debit').length;
    const creditCount = getTransactionByType(transactions, 'credit').length;

    if (debitCount > creditCount) return 'debit';
    if (creditCount > debitCount) return 'credit';
    return 'equal';
}

/**
 * Returns transactions before a given date.
 * @param {Object[]} transactions
 * @param {string} date
 * @returns {Object[]} Filtered transactions.
 */
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);
    return transactions.filter(t => new Date(t.transaction_date) < targetDate);
}

/**
 * Finds transaction by ID.
 * @param {Object[]} transactions
 * @param {string} id
 * @returns {Object|undefined} Found transaction.
 */
function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id);
}

/**
 * Returns only transaction descriptions.
 * @param {Object[]} transactions
 * @returns {string[]} Descriptions array.
 */
function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
}

/**
 * Runs and logs all functions.
 * @param {Object[]} transactions
 */
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
