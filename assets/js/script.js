const API_KEY = "hXVcKIjNvN4sq4UjvF81FEDQJIk"
const API_URL = "https://ci-jshint.herokuapp.com/api"
const resultModal = new bootstrap.Modal(document.getElementById("resultsModal"))

document.getElementById("status").addEventListener("click", e => getStatus(e))
document.getElementById("submit").addEventListener("click", e => postForm(e))

async function postForm(e) {
  const form = new FormData(document.getElementById("checksform"))

  const response = await fetch(API_URL, {
                        method: "POST",
                        headers: {
                                    "Authorization": API_KEY,
    },
                        body: form,
  })
  
  const data = await response.json()

  if(response.ok) {
    displayErros(data)
  } else {
    throw new Error(data.error)
  }
}

function displayErros(data) {

  let heading = `JSHint Results for ${data.file}`
  
  if (data.total_errors === 0) {
    results = `<div class="no_errors">No errors reported!</div>`
  } else {
    results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span>`
    for (let error of data.error_list) {
      results += `<div> At line <span class="line">${error.line}</span>, `
      results += `column <span class="column">${error.col}</span></div>`
      results += `<div class+"erroe">${error.error}</div>`
  }

}

async function getStatus(e) {
  const querryString = `${API_URL}?api_key=${API_KEY}`

  const response = await fetch(querryString)

  const data = await response.json()

  if(response.ok) {
      displayStatus(data)
  } else {
    throw new Error(data.error)
  }
}

function displayStatus(data) {

  let heading = "API Key Status"
  let results = `<div>Your key is valid until</div>`
  results += `<div class="key-status">${data.expiry}</div>`

  document.getElementById("resultsModalTitle").innerText = heading
  document.getElementById("results-content").innerHTML = results

  resultModal.show()
}