// DATA
const budget = []

// DOM
const form = document.querySelector('#form')
const type = document.querySelector('#type')
const title = document.querySelector('#title')
const value = document.querySelector('#value')
const incomesList = document.querySelector('#incomes-list')
const expensesList = document.querySelector('#expenses-list')

// FUNCTIONS
function insertTestData() {
    const testData = [
        {type: 'inc', title: 'Фриланс', value: 500},
        {type: 'exp', title: 'Бизнес', value: 1500},
        {type: 'exp', title: 'Транспорт', value: 200},
        {type: 'inc', title: 'Рента', value: 3500},
        {type: 'inc', title: 'Зарплата', value: 100000}
    ]

    function getRandomInt(max) {
        return Math.floor(Math.random() * max)
    }

    const randomIndex = getRandomInt(testData.length)
    const randomData = testData[randomIndex]

    type.value = randomData.type
    title.value = randomData.title
    value.value = randomData.value
}

function clearForm() {
    form.reset()
}

// ACTIONS
insertTestData()

form.addEventListener('submit', (e) => {
    e.preventDefault()

    // Проверка формы на заполненность
    if (title.value.trim() === '') {
        title.classList.add('form__input--error')
        return
    } else {
        title.classList.remove('form__input--error')
    }
    if (value.value.trim() === '' || +value.value <= 0) {
        value.classList.add('form__input--error')
        return
    } else {
        value.classList.remove('form__input--error')
    }

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

    const record = {
        id,
        type: type.value,
        title: title.value.trim(),
        value: value.value
    }

    // Добавляем запись в данные
    budget.push(record)

    // Отображаем запись Доход 
    if (record.type === 'inc') {
        const html = `<li class="budget-list__item item item--income" data-id="${record.id}">
                        <div class="item__title">${record.title}</div>
                        <div class="item__right">
                        <div class="item__amount">+ ${record.value}</div>
                        <button class="item__remove">
                            <img src="./img/circle-green.svg" alt="delete" />
                        </button>
                        </div>
                    </li>`

        incomesList.insertAdjacentHTML('afterbegin', html)
    }

    // Отображаем запись Расход 
    if (record.type === 'exp') {
        const html = `<li class="budget-list__item item item--expense" data-id="${record.id}>
                        <div class="item__title">${record.title}</div>
                        <div class="item__right">
                        <div class="item__amount">- ${record.value}</div>
                        <button class="item__remove">
                            <img src="./img/circle-red.svg" alt="delete" />
                        </button>
                        </div>
                    </li>`

        expensesList.insertAdjacentHTML('afterbegin', html)
    }

    clearForm()
    insertTestData()
})
