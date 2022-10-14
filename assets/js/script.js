const API_KEY = "hXVcKIjNvN4sq4UjvF81FEDQJIk"
const API_URL = "https://ci-jshint.herokuapp.com/api"
const resultModal = new bootstrap.Modal(document.getElementById("resultsModal"))

document.getElementById("status").addEventListener("click", e => getStatus(e))

async function getStatus(e) {
    const querryString = `${API_URL}?api_key=${API_KEY}`

    const response = await fetch(querryString)

    const data = await response.json()

    if(response.ok) {
        console.log(data.expiry)
    }
}