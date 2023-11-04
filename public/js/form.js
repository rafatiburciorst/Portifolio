// import axios from 'axios'
const form = document.getElementById('form')
console.log('hello')
form.onsubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const baseUrl = window.location.origin
    console.log(baseUrl);

    try {
        const res = await fetch(`${baseUrl}/form`, {
            method:'POST',
            body: formData
        })

        const data = await res.json()
        console.log(data);
    } catch (error) {
        console.log(error);
    }

}