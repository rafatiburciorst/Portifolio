const form = document.getElementById('form')

form.onsubmit = async (event) => {
    event.preventDefault()
    const formData = new URLSearchParams(new FormData(this));
    const baseUrl = window.location.origin

    try {
        const res = await fetch(`${baseUrl}/form`, {
            method: 'POST',
            mode: 'same-origin',
            credentials: 'same-origin',
            body: formData
        })
        console.log(res);
    } catch (error) {
        console.log(error);
    }

}