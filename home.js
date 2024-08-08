const baseUrl = 'https://66b47fde9f9169621ea332aa.mockapi.io/';
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
                    </div>
                </div>`
                
            }

            
        })

}
for (const el of resources) {
    Products(el)

    
}
