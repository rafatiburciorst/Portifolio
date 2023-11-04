// import axios from 'axios'
const form = document.getElementById('form')
form.onsubmit = async (event) => {
    event.preventDefault()
    const loading = document.querySelector('.loading')
    const formData = new FormData(form)
    const baseUrl = window.location.origin
    const success = document.querySelector('.sent-message')
    const btn = document.querySelector("[type='submit']")
    loading.style.display = 'block'
    btn.setAttribute('disabled', true)

    const name = formData.get('name')
    const email = formData.get('email')
    const subject = formData.get('subject')
    const message = formData.get('message')

    const fields = [name, email, subject, message]

    fields.forEach((f) => {
        if (!f) {
            alert('Todos os campos devem ser preenchidos')
            return
        }
    })

    try {
        const res = await fetch(`${baseUrl}/form`, {
            method: 'POST',
            body: formData
        })

        if (res.status === 201) {
            form.reset()
            success.style.display = 'block'
            setTimeout(() => {
                success.style.display = 'none'
            }, 2000)

        }
    } catch (error) {
        console.log(error);
    } finally {
        loading.style.display = 'none'
        btn.setAttribute('disabled', false)
    }

}