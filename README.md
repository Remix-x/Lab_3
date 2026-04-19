# Lab_3
**Cranopol Andrei, I2502**
### Основы работы с массивами, функциями и объектами в JavaScript
Цель работы:
Изучить основы работы с массивами и функциями в JavaScript, применяя их для обработки и анализа транзакций.

Первый этап.
Создаем файл main в котором будет находиться массив объектов с разными данными. Для примера возьмем готовый массив.

<img width="680" height="900" alt="image" src="https://github.com/user-attachments/assets/4c860808-5fe2-4d26-b610-5a59b8d0a0ab" />

Второй этап.
Нужно реализовать функции для работы с этим массивом:<br>
1.Функция, которая возвращает только уникальные типы транзакций:
```js 
function getUniqueTransactionTypes(transactions) { //Возвращает массив уникальных типов транзакций.
    const allTypes = transactions.map(t => t.transaction_type);
    const uniqueTypes = new Set(allTypes);
    return [...uniqueTypes];
```

2.Функция, которая вычисляет сумму всех транзакций
```js
function calculateTotalAmount(transactions){ // Вычисляет сумму всех транзакций.
    return transactions.reduce((total, t) => total + t.transaction_amount, 0);
}
```
3. Функция, которая вычисляет общую сумму транзакций за указанный год, месяц и день.
```js
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
```
4.Функция, которая возвращает транзакции указанного типа (debit или credit).
```js
function getTransactionByType(transactions, type) { // Возвращает транзакции указанного типа (debit или credit).
    return transactions.filter(t => t.transaction_type === type);
}
```
5. Функция, которая возвращает массив транзакций, проведенных в указанном диапазоне дат от startDate до endDate.
```js
function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter(t => {
        const current = new Date(t.transaction_date);
        return current >= start && current <= end;
    });
}
```
6.Функция, которая возвращает массив транзакций, совершенных с указанным merchantName
```js
function getTransactionsByMerchant(transactions, merchantName) { //  Возвращает массив транзакций, совершенных с указанным merchantName
    return transactions.filter(t => t.merchant_name === merchantName);
}
```
7. Функция, которая возвращает среднее значение транзакций.
```js
function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0;
    const total = calculateTotalAmount(transactions); // используем твою функцию
    return total / transactions.length;
}
```
8.Функция, которая возвращает массив транзакций с суммой в заданном диапазоне от minAmount до maxAmount
```js
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}
```
9. Функция, которая вычисляет общую сумму дебетовых транзакций.

```js
function calculateTotalDebitAmount(transactions) {
    const debits = getTransactionByType(transactions, 'debit');
    return calculateTotalAmount(debits);
}
```
10. Функция, которая возвращает месяц, в котором было больше всего транзакций
```js
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
```
11. Функция, которая возвращает месяц, в котором было больше дебетовых транзакций.
```js
function findMostDebitTransactionMonth(transactions) {
    const debits = getTransactionByType(transactions, 'debit');
    return findMostTransactionsMonth(debits);
}
```
12. Функция, которая возвращает каких транзакций больше всего
```js
function mostTransactionTypes(transactions) {
    const debitCount = getTransactionByType(transactions, 'debit').length;
    const creditCount = getTransactionByType(transactions, 'credit').length;

    if (debitCount > creditCount) return 'debit';
    if (creditCount > debitCount) return 'credit';
    return 'equal';
}
```
13. Функция, которая возвращает массив транзакций, совершенных до указанной даты
```js
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);
    return transactions.filter(t => new Date(t.transaction_date) < targetDate);
}
```
14. Функция, которая возвращает транзакцию по ее уникальному идентификатору (id)
```js
function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id);
}
```
15. Функция, которая возвращает новый массив, содержащий только описания транзакций
```js
function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
}
```

