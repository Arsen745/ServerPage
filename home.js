const baseUrl = 'https://66b47fde9f9169621ea332aa.mockapi.io/';
const value = localStorage.getItem('value');
const apiUrl = baseUrl + value;

const resources = [
    'VacuumCleaner', 'Fridge', 'iron', 'Freezer', 'Tv',
    'Ariston', 'Mikser', 'Vitishka', 'Washing',
    'Condis', 'Microvol', 'Duhovka', 'Plita',
    'Electriplita', 'Chainik', 'Nagrevatel', 'Vstoemyi',

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
                            >Изменить<i class="bi bi-pencil-square"></i></button>
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


})

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
            modal.style.display = "none";
            const successContainer = document.querySelector('.success');

            // Функция для показа контейнера
            function showSuccess() {
                successContainer.classList.add('show');
                successContainer.classList.remove('hide');
            }
            showSuccess();

            // Функция для скрытия контейнера
            function hideSuccess() {
                successContainer.classList.add('hide');
                successContainer.classList.remove('show');
            }
            setTimeout(hideSuccess, 3000); 
        })

}

saveButton.addEventListener('click', (event) => {
    const inputs = [nameModal, modelModal, priceModal, countryModal, imageModal, descriptionModal];
    let allFilled = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            allFilled = false;
            input.style.border = '2px solid red';
            input.style.border = '';
        }
    });

    if (allFilled) {
        const id = saveButton.getAttribute('data-id');
        Update(event, id);
    } else {
        errorMes.innerHTML = `<h4 style="color: red; 
        margin-top: 20px;">Заполните все поля формы</h4>`;
    }
});





