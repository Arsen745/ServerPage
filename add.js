const text = document.querySelector("h1");
const text2 = localStorage.getItem('text2');
const value = localStorage.getItem('value');
text.innerText = text2;

// DOM elements
const nameInput = document.querySelector('#name');
const modelInput = document.querySelector('#model');
const priceInput = document.querySelector('#price');
const countryInput = document.querySelector('#country');
const imageInput = document.querySelector('#image');
const descriptionInput = document.querySelector('#description');
const button = document.querySelector('button');
const h4Text = document.querySelector('h4');

// URL API
const baseUrl = 'https://66b47fde9f9169621ea332aa.mockapi.io/';
const apiUrl = baseUrl + value;

function Add(event) {
    event.preventDefault();
    h4Text.innerHTML = '';

    // Check if all inputs are filled
    if (nameInput.value && modelInput.value && priceInput.value && countryInput.value && imageInput.value && descriptionInput.value) {
        const data = {
            name: nameInput.value,
            model: modelInput.value,
            price: priceInput.value,
            country: countryInput.value,
            image: imageInput.value,
            description: descriptionInput.value,
            values: value
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            h4Text.innerHTML = `<h4>Успешно добавлен товар <i class="bi bi-check2-square"></i></h4>`;

            // Clear input fields
            nameInput.value = '';
            modelInput.value = '';
            priceInput.value = '';
            countryInput.value = '';
            imageInput.value = '';
            descriptionInput.value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            h4Text.innerHTML = `<h4 style="color: red;">При добавлении произошла ошибка, повторите попытку</h4>`;
        });
    } else {
        h4Text.innerHTML = `<h4 style="color: red">Заполните все поля формы</h4>`;
    }
}

button.addEventListener('click', Add);
