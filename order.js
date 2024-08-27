const cart = document.querySelector(".container")

const baseUrl = 'https://669fa4ceb132e2c136fe972e.mockapi.io/api/v1/order'

function order() {
    fetch(baseUrl)
    .then(res => res.json())
    .then((data) => {
        console.log(data);

        if(data.length === 0) {
            return cart.innerHTML = '<h1>Пока заказов нету</h1>'
        } else {
            for (const el of data) {
                cart.innerHTML += `            <div class="cart">
                <h4><span>имя: </span> ${el.name}</h4>
                <h4><span>номер теефона: </span>${el.number}</h4>
                <h4><span>комментарии: </span>${el.comment}</h4>
            </div>`
                
            }
        }
        
    })
}
order()