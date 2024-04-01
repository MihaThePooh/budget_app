import * as model from './model.js'
import * as view from './view.js'

// FUNCTIONS
function getTestData() {
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

    return randomData
}

function insertTestData() {
    const randomData = model.getTestData()
    view.renderTestData(randomData)
}

function displayMonth() {
    const monthYear = model.getMonthYear()
    view.renderMonth(monthYear.month, monthYear.year)
}

// ACTIONS
displayMonth()
insertTestData()
view.renderBudget(model.calcBudget())

// Добавление новой записи
view.elements.form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!view.checkEmptyFields()) return

    const formData = view.getFormData()

    const record = model.createRecord(formData)

    // Отображаем запись на странице
    view.renderRecord(record)

    // Посчитать бюджет
    view.renderBudget(model.calcBudget())

    view.clearForm()
    insertTestData()
})

// Удаление записи
document.body.addEventListener('click', function(e) {
    // Кнопка удалить
    if (e.target.closest('button.item__remove')) {
        

        const id = view.removeRecord(e)

        model.deleteRecord(id)

        // Посчитать бюджет
        view.renderBudget(model.calcBudget())
    }
})