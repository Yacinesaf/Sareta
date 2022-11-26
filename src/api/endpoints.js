import axios from "axios"

function getBudgetCardImage() {
  return axios.get("https://api.unsplash.com/photos/random?client_id=8H2mV-XceZaObYIHpzH1IqKP7UquA2wiYoS5qz8CnQE&query=finance,money,budget,accounting")
    .then(res => res.data.urls.regular)
}

export {
  getBudgetCardImage
}
