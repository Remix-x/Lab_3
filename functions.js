
/**
 * Возвращает уникальные типы транзакций.
 * @param {Object[]} transactions - Массив транзакций.
 * @returns {string[]} Массив уникальных типов транзакций.
 */
function getUniqueTransactionTypes(transactions) {
    const allTypes = transactions.map(t => t.transaction_type);
    const uniqueTypes = new Set(allTypes);
    return [...uniqueTypes];
}

/**
 * Считает общую сумму всех транзакций.
 * @param {Object[]} transactions - Массив транзакций.
 * @returns {number} Общая сумма.
 */
function calculateTotalAmount(transactions) {
    return transactions.reduce((total, t) => total + t.transaction_amount, 0);
}

/**
 * Считает сумму транзакций за указанный период (год, месяц, день).
 * @param {Object[]} transactions
 * @param {number} [year]
 * @param {number} [month]
 * @param {number} [day]
 * @returns {number} Сумма отфильтрованных транзакций.
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
 * Возвращает транзакции по типу (debit / credit).
 * @param {Object[]} transactions
 * @param {string} type
 * @returns {Object[]} Отфильтрованные транзакции.
 */
function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
}

/**
 * Возвращает транзакции в диапазоне дат.
 * @param {Object[]} transactions
 * @param {string} startDate
 * @param {string} endDate
 * @returns {Object[]} Отфильтрованные транзакции.
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
 * Возвращает транзакции по названию магазина.
 * @param {Object[]} transactions
 * @param {string} merchantName
 * @returns {Object[]} Отфильтрованные транзакции.
 */
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(t => t.merchant_name === merchantName);
}

/**
 * Считает среднюю сумму транзакций.
 * @param {Object[]} transactions
 * @returns {number} Среднее значение.
 */
function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0;
    const total = calculateTotalAmount(transactions);
    return total / transactions.length;
}

/**
 * Фильтрует транзакции по диапазону суммы.
 * @param {Object[]} transactions
 * @param {number} minAmount
 * @param {number} maxAmount
 * @returns {Object[]} Отфильтрованные транзакции.
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(
        t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount
    );
}

/**
 * Считает общую сумму дебетовых транзакций.
 * @param {Object[]} transactions
 * @returns {number} Сумма дебета.
 */
function calculateTotalDebitAmount(transactions) {
    const debits = getTransactionByType(transactions, 'debit');
    return calculateTotalAmount(debits);
}

/**
 * Возвращает название месяца из даты.
 * @param {string} dateStr
 * @returns {string} Название месяца.
 */
const getMonthName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { month: 'long' });
};

/**
 * Находит месяц с наибольшим количеством транзакций.
 * @param {Object[]} transactions
 * @returns {string} Название месяца.
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
 * Находит месяц с наибольшим количеством дебетовых транзакций.
 * @param {Object[]} transactions
 * @returns {string} Название месяца.
 */
function findMostDebitTransactionMonth(transactions) {
    const debits = getTransactionByType(transactions, 'debit');
    return findMostTransactionsMonth(debits);
}

/**
 * Определяет, каких транзакций больше: debit или credit.
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
 * Возвращает транзакции до указанной даты.
 * @param {Object[]} transactions
 * @param {string} date
 * @returns {Object[]} Отфильтрованные транзакции.
 */
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);
    return transactions.filter(t => new Date(t.transaction_date) < targetDate);
}

/**
 * Ищет транзакцию по ID.
 * @param {Object[]} transactions
 * @param {string} id
 * @returns {Object|undefined} Найденная транзакция.
 */
function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id);
}

/**
 * Возвращает список описаний транзакций.
 * @param {Object[]} transactions
 * @returns {string[]} Список описаний.
 */
function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
}

/**
 * Запускает и выводит результаты всех функций.
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
    console.log("Транзакции до даты:", getTransactionsBeforeDate(transactions, '2019-02-01'));
    console.log("Транзакция по ID:", findTransactionById(transactions, '1'));
    console.log("Все описания:", mapTransactionDescriptions(transactions));
    
    console.log("--- Проверка завершена ---");
}
