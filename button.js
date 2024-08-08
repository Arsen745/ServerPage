const button = document.querySelectorAll("button")
const text = document.querySelector("h1")



for (const btn of button) {
    btn.addEventListener('click', () => {
        function Open(text2, value) {
            localStorage.setItem('text2', text2)
            localStorage.setItem('value', value)
            window.location.href = ('add.html')
        }
        Open(btn.innerText, btn.value)
    })

}
