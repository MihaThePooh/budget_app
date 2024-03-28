import * as view from './view.js'

// DATA
const budget = []

// FUNCTIONS
function insertTestData() {
    const testData = [
        {type: 'inc', title: 'Фриланс', value: 500},
        {type: 'exp', title: 'Бизнес', value: 1500},
        {type: 'exp', title: 'Транспорт', value: 200},
        {type: 'inc', title: 'Рента', value: 3500},
        {type: 'inc', title: 'Зарплата', value: 10000}
    ]

    function getRandomInt(max) {
        return Math.floor(Math.random() * max)
    }

    const randomIndex = getRandomInt(testData.length)
    const randomData = testData[randomIndex]

    view.renderTestData(randomData)
}

function calcBudget() {
    // Считаем общий доход
    const totalIncome = budget.reduce(function(total, el) {
        if (el.type === 'inc') {
            return total + el.value
        } else {
            return total
        }
    }, 0)

    // Считаем общий расход
    const totalExpense = budget.reduce(function(total, el) {
        if (el.type === 'exp') {
            return total + el.value
        } else {
            return total
        }    
    }, 0)

    const totalBudget = totalIncome - totalExpense

    let expensePercents = 0
    if (totalIncome) {
        expensePercents = Math.round((totalExpense * 100) / totalIncome)
    }

    view.renderBudget( totalBudget, totalIncome, totalExpense, expensePercents )
}

function displayMonth() {
    const now = new Date()
    const year = now.getFullYear()
    const timeFormater = new Intl.DateTimeFormat('ru-RU', { month: 'long' })
    const month = timeFormater.format(now)
    view.renderMonth(month, year)
}

// ACTIONS
displayMonth()
insertTestData()
calcBudget()

// Добавление новой записи
view.elements.form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!view.checkEmptyFields()) return

    // расчёт id
    let id = 1

    if (budget.length > 0) {
        // находим последний элемент массива
        const lastElement = budget[budget.length - 1]
        // находим id последнего элемента
        const lastElementId = lastElement.id
        // сформировать новый id = старый + 1
        id = lastElementId + 1
    }

    const formData = view.getFormData()

    const record = {
        id,
        type: formData.type,
        title: formData.title.trim(),
        value: +formData.value
    }

    // Добавляем запись в данные
    budget.push(record)

    // Отображаем запись на странице
    view.renderRecord(record)

    // Посчитать бюджет
    calcBudget()

    view.clearForm()
    insertTestData()
})

// Удаление записи
document.body.addEventListener('click', function(e) {
    // Кнопка удалить
    if (e.target.closest('button.item__remove')) {
        const recordElement = e.target.closest('li.budget-list__item')

        const id = +recordElement.dataset.id

        const index = budget.findIndex(el => el.id === id)

        // Remove from array
        budget.splice(index, 1)

        // Remove from page
        recordElement.remove()

        // Посчитать бюджет
        calcBudget()
    }
})