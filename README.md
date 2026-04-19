# Lab_3
**Cranopol Andrei, I2502**
# Основы работы с массивами, функциями и объектами в JavaScript
Цель работы:
Изучить основы работы с массивами и функциями в JavaScript, применяя их для обработки и анализа транзакций.

## Первый этап.
Создаем файл main в котором будет находиться массив объектов с разными данными. Для примера возьмем готовый массив.

<img width="680" height="900" alt="image" src="https://github.com/user-attachments/assets/4c860808-5fe2-4d26-b610-5a59b8d0a0ab" />

## Второй этап.
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
## Этап третий.
### Чтобы проверить все функции я написал функцию, которая будет выводить в консоль все функции:
```js
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
```
### Результаты консоли:
<img width="1162" height="611" alt="image" src="https://github.com/user-attachments/assets/64f124e8-d09f-42b3-8483-b84a957c3450" />

---

<img width="1162" height="609" alt="image" src="https://github.com/user-attachments/assets/4e95c510-79d5-4a2d-a973-3483fc60ec6a" />

---

<img width="1159" height="598" alt="image" src="https://github.com/user-attachments/assets/6cea5f54-8d25-4212-9f6a-2ec1bf02d1f1" />

---

<img width="1151" height="602" alt="image" src="https://github.com/user-attachments/assets/975c1587-3f1c-429c-b299-f6e0b7a5884d" />

---

<img width="1168" height="484" alt="image" src="https://github.com/user-attachments/assets/4f9c6520-3ebc-4a01-b668-fb72fe5f40b8" />

---

### Результат только с одной транзакцией:
<img width="1175" height="652" alt="image" src="https://github.com/user-attachments/assets/d77e34f2-b050-43b6-b179-70f112af7926" />

### Результат работы с пустым массивом:
<img width="1194" height="284" alt="image" src="https://github.com/user-attachments/assets/c86e1750-8092-4560-9543-e11fa4904c9a" />

## 1. Какие методы массивов можно использовать для обработки объектов в JavaScript?

При работе с массивами объектов в JavaScript чаще всего используются встроенные методы, которые позволяют удобно обрабатывать данные без написания классических циклов.

Метод `map()` применяется, когда нужно преобразовать каждый элемент массива. Например, если у вас есть массив пользователей, можно получить только их имена, создав новый массив.

Метод `filter()` используется для отбора элементов по определённому условию. Он возвращает новый массив, в который попадают только те объекты, которые соответствуют заданному критерию.

Метод `reduce()` позволяет свести весь массив к одному значению. Это может быть число (например, сумма), объект или даже новый массив. Этот метод часто применяют для агрегирования данных.

Также полезен метод `find()`, который возвращает первый элемент, подходящий под условие, и методы `some()` и `every()`, которые проверяют, удовлетворяет ли хотя бы один или все элементы массива определённому условию. Метод `forEach()` используется для простого перебора элементов, когда не требуется возвращать новый массив.

---

### 2. Как сравнивать даты в строковом формате в JavaScript?

В JavaScript даты в строковом формате можно сравнивать несколькими способами, но важно учитывать формат строки.

Самый надёжный способ — преобразовать строку в объект `Date`. После этого даты можно сравнивать с помощью операторов `>` или `<`, так как они сравниваются по времени.

Если строки находятся в формате ISO (`YYYY-MM-DD`), их можно сравнивать напрямую как обычные строки. Это работает потому, что такой формат упорядочен от старших значений к младшим (сначала год, затем месяц, затем день).

Также можно преобразовать дату в числовой формат (timestamp) с помощью метода `getTime()`, после чего сравнивать уже числа.

Если же дата записана в нестандартном формате, например `DD.MM.YYYY`, её необходимо сначала разобрать и вручную привести к корректному виду перед сравнением.

---

### 3. В чем разница между map(), filter() и reduce() при работе с массивами объектов?

Методы `map()`, `filter()` и `reduce()` часто используются вместе, но выполняют разные задачи.

`map()` нужен для преобразования данных. Он проходит по каждому элементу массива и возвращает новый массив той же длины, но с изменёнными значениями.

`filter()` применяется для отбора данных. Он также проходит по массиву, но возвращает только те элементы, которые удовлетворяют условию. В результате длина массива может уменьшиться.

`reduce()` используется для объединения всех элементов массива в одно итоговое значение. Это наиболее универсальный метод, который позволяет реализовать сложные операции, такие как подсчёт суммы, группировка или создание структуры данных.

Если кратко:
- `map()` — изменяет каждый элемент массива
- `filter()` — отбирает нужные элементы
- `reduce()` — собирает всё в одно значение




