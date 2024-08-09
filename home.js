const baseUrl = 'https://66b47fde9f9169621ea332aa.mockapi.io/';
const value = localStorage.getItem('value');
const apiUrl = baseUrl + value;

const resources = [
    'VacuumCleaner', 'Fridge', 'FoodProcessor', 'iron', 'Freezer', 'Tv',
    'Ariston', 'Steik', 'waffli', 'Blender', 'Mikser', 'Vitishka', 'Washing',
    'Condis', 'Microvol', 'Duhovka', 'Plita', 'Teplovintel', 'Coffe', 'frity',
    'Socovij', 'Miasorubka', 'Electriplita', 'Chainik', 'Nagrevatel', 'Vstoemyi',
    'Otparivatel', 'PosydaMashine'
];
const cards = document.querySelector(".cards")

function Products(resource) {
    fetch(baseUrl + resource)
        .then(response => response.json())
        .then((data) => {   
            for (const el of data) {
                console.log(data);
                cards.innerHTML += `            <div class="card1"> 
                    <div class="top-content">
                        <img src="${el.image}" alt="">
                    </div>
                    <div class="bottom-content">
                        <h1><span>Названия:</span> ${el.name}</h1>
                        <h4><span>Модель:</span> ${el.model}</h4>
                        <h4 class="price"><span>Цена:</span> ${el.price}</h4>
                        <h4><span>Стана производство:</span> ${el.country}</h4>
                            <button class="open-modal" onclick="OpenModal(${el.id}, '${el.name}', '${el.image}', '${el.model}', '${el.price}', '${el.country}', '${el.description}', '${el.values}')"
                            >Изменить</button>
                    </div>
                </div>`

            }


        })

}
for (const el of resources) {
    Products(el)


}

// Dom
const modal = document.querySelector(".modal")
const button = document.querySelector(".open-modal")
const modelModal = document.querySelector("#model-modal")
const closeModalBtn = document.querySelector('.close-modal')
const nameModal = document.querySelector('#name-modal')
const priceModal = document.querySelector('#price-modal')
const countryModal = document.querySelector('#country-modal')
const imageModal = document.querySelector('#image-modal')
const descriptionModal = document.querySelector('#description')
const saveButton = document.querySelector(".save-button")
const errorMes = document.querySelector('.errormes')




// function Edit(id) {
//     alert('ID продукта: ' + id);
// }
let currentResource = '';
function OpenModal(id, name, image, model, price, country, description, values) {
    modal.style.display = "block";
    modelModal.value = model
    nameModal.value = name
    priceModal.value = price
    descriptionModal.value = description
    imageModal.value = image
    countryModal.value = country
    currentResource = values;


    saveButton.setAttribute('data-id', id);



}

closeModalBtn.addEventListener('click', () => {
    modal.style.display = "none";


} )

function Update(event, id) {
    event.preventDefault();

    const updatedData = {
        name: nameModal.value,
        model: modelModal.value,
        price: priceModal.value,
        country: countryModal.value,
        image: imageModal.value,
        description: descriptionModal.value,
        values: currentResource
    };

    fetch(`${baseUrl}${currentResource}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);

        // Закрыть модальное окно после обновления
        modal.style.display = "none";
    })

}

// Вызовите функцию Update при нажатии кнопки для сохранения изменений
saveButton.addEventListener('click', (event) => {
    // Получаем элементы ввода из модального окна
    const inputs = [nameModal, modelModal, priceModal, countryModal, imageModal, descriptionModal];
    let allFilled = true;

    // Проверяем, заполнены ли все поля
    inputs.forEach(input => {
        if (!input.value.trim()) {
            allFilled = false;
            input.style.border = '2px solid red'; // Применяем красную рамку к пустым полям
        } else {
            input.style.border = ''; // Убираем красную рамку, если поле заполнено
        }
    });

    if (allFilled) {
        const id = saveButton.getAttribute('data-id');
        Update(event, id); // Вызываем функцию обновления, если все поля заполнены
    } else {
        // Показываем сообщение об ошибке, если какие-то поля пустые
        errorMes.innerHTML = `<h4 style="color: red; 
        margin-top: 20px;">Заполните все поля формы</h4>`;
    }
});





