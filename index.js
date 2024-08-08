const url = 'https://669fa4ceb132e2c136fe972e.mockapi.io/api/v1/password'
const login = document.querySelector('.login')
const password = document.querySelector('.password')
const button = document.querySelector('button')
const soob = document.querySelector('h2') 
function OpenNewPage() {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        for (const el of data) {
            if(el.login === login.value && el.password === password.value){
                window.location.href = 'home.html'
            }else {
                password.style.border = "1px solid red"
                login.style.border = "1px solid red"
                soob.innerText = `Неправильный пароль или логин`
            }
                
                
            
        }

                
    })
}
button.addEventListener('click', () => {
    OpenNewPage()
})
