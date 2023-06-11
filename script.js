let button = document.querySelector("#submit")
let amount = document.querySelector("#amount_input")
let table = document.querySelector("#description_input")
let category = document.querySelector("#category_input")
let form_area = document.querySelector("#form")


window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/e70860f83bb04cedb0e32aeeafa37752')
        .then((res) => {
            generating_form()
        })
        .catch((err) => console.log(err))
})

button.addEventListener("click", pressed)

function pressed(e) {
    if (amount.value == "" || table.value == "" || category.value == "")
        alert("Please fill all the details")
    let obj = {
        amount: amount.value,
        table: table.value,
        category: category.value,
    }
    axios
        .post(
            "https://crudcrud.com/api/e70860f83bb04cedb0e32aeeafa37752/Orders",
            obj
        )
        .then((res) => {
            console.log(res)
            generating_form()
        })
        .catch((err) => {
            console.log(err)
        })
    amount.value = ""
    table.value = ""
    category.value = ""
}

function generating_form() {
    let orderList = document.querySelector("ul")
    if (orderList) {
        orderList.remove()
    }
    let newList = document.createElement("ul")
    axios
        .get(
            "https://crudcrud.com/api/e70860f83bb04cedb0e32aeeafa37752/Orders"
        )
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {

                let new_item = document.createElement("li")

                let delete_ord_btn = document.createElement("button")
                delete_ord_btn.textContent = "Delete Order"


                let description_span = document.createElement("span")
                description_span.textContent = res.data[i].table

                description_span.style.display = "none"

                let amount_span = document.createElement("span")

                amount_span.textContent = res.data[i].amount
                amount_span.style.display = "none"

                let category_span = document.createElement("span")
                category_span.textContent = res.data[i].category

                category_span.style.display = "none"

                new_item.appendChild(
                    document.createTextNode(
                        `   ${res.data[i].amount}  -  ${res.data[i].table}  -  ${res.data[i].category}  `
                    )
                )

                new_item.appendChild(description_span)
                new_item.appendChild(amount_span)
                new_item.appendChild(category_span)

                new_item.appendChild(delete_ord_btn)

                newList.appendChild(new_item)

                delete_ord_btn.addEventListener("click", delete_orders)

            }
            form_area.appendChild(newList)
        })
        .catch((err) => {
            console.log(err)
        })
}

function delete_orders(e) {
    let tobedeleted = e.target.parentNode
    tobedeleted.remove()

    let disc = tobedeleted.firstElementChild.textContent
    let unique_id
    axios
        .get(
            "https://crudcrud.com/api/e70860f83bb04cedb0e32aeeafa37752/Orders"
        )
        .then((res) => {
            res.data.forEach((element) => {
                if (element.table == disc) {
                    unique_id = element._id
                    console.log(res)
                    axios.delete(
                        `https://crudcrud.com/api/e70860f83bb04cedb0e32aeeafa37752/Orders/${unique_id}`
                    )
                }
            })
        })
        .catch((err) => console.log(err))
}