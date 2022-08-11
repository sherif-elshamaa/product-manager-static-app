import { octopus } from "../../index"
import { v4 as uuid } from 'uuid';
import gifimg from '../../assets/ezgif.com-gif-maker.gif'

export var inputView = {
    init: function () {
        this.container = document.getElementById("input-container")
        this.noti = document.getElementById("notification")
        this.msg = document.getElementById("noti-msg")
        this.productname = document.getElementById("name")
        this.price = document.getElementById("price")
        this.quantity = document.getElementById("quantity")
        this.discount = document.getElementById("discount")
        this.vat = document.getElementById("vat")
        this.submit = document.getElementById("submit")
        this.form = document.getElementById("form")
        this.form.addEventListener("submit", (e) => { e.preventDefault(); })
        this.total = document.getElementById("selling-price")
        this.afterVat = document.getElementById("afterVat")
        this.mood
        this.data = octopus.getDatabase()
        this.deletebtn = document.getElementById("delete")
        this.img = document.getElementById("gif")
        this.img.src = gifimg





    },
    getTotalPrice: function () {
        if (this.price.value !== "") {
            this.afterVat.setAttribute("class", `flex justify-between ${this.mood === "edit" ? "bg-green-300" : ""}`)
            let res = +this.price.value - +this.price.value * (+this.discount.value / 100)
            let aftervat = res + (res * +this.vat.value / 100)
            this.total.innerHTML = aftervat
        }
    },
    onClick: function () {

        let obj = {
            id: uuid(),
            name: this.productname.value,
            price: this.price.value,
            quantity: this.quantity.value,
            discount: this.discount.value,
            vat: this.vat.value,
        }
        if (this.productname.value !== "" && !isNaN(this.price.value) && !isNaN(this.quantity.value) && !isNaN(this.discount.value) && !isNaN(this.vat.value) &&
            this.price.value !== "" && this.quantity.value !== "" && this.vat.value !== "") {
            octopus.addToDatabase(obj)
            this.clearInput()
        } else {
            alert("fill all fields")
            return
        }
        this.onSuccess("input")


    },
    onUpdate: function () {
        const id = this.container.getAttribute("key")
        let obj = {
            id: id,
            name: this.productname.value,
            price: this.price.value,
            quantity: this.quantity.value,
            discount: this.discount.value,
        }
        if (this.productname.value !== "" && !isNaN(this.price.value) && !isNaN(this.quantity.value) && !isNaN(this.discount.value) && id !== "") {
            octopus.updateDatabase(obj)
            this.clearInput()
        } else {
            console.error("fill all fields")
            return
        }
        this.onSuccess("input")

    },
    onDelete: function () {
        const id = this.container.getAttribute("key")
        octopus.deleteFromDatabase(id)
        this.deletebtn.setAttribute("class", "hidden")

        this.onSuccess("input")

    },
    setMood: function (x, id) {
        this.mood = x
        if (this.mood === "edit") {
            this.editView(id)
        } else {
            this.inView()
        }
    },
    editView: function (id) {
        const y = this.data.filter((x) => { if (x.id === id) return x })[0]

        this.productname.value = y.name
        this.price.value = y.price
        this.quantity.value = y.quantity
        this.discount.value = y.discount
        this.vat.value = y.vat
        this.vat.setAttribute('disabled', '');
        this.getTotalPrice()
        this.container.setAttribute('class', 'px-4 py-5 bg-green-300 transition duration-700 space-y-6 sm:p-6')
        this.container.setAttribute("key", y.id)
        this.submit.setAttribute("onclick", "inputView.onUpdate()")
        this.deletebtn.setAttribute("class", "px-4 py-3 bg-gray-50 text-right sm:px-6")
        this.submit.innerText = "update"
    },
    inView: function () {
        this.container.setAttribute('class', 'px-4 py-5 bg-white space-y-6 sm:p-6')
        this.clearInput()
        this.vat.disabled = false
        this.submit.setAttribute("onclick", "inputView.onClick()")
        this.submit.innerText = "save"
    },
    onSuccess: function (x) {

        this.noti.setAttribute("class", "absolute top-0 left-0 transition duration-700 w-full h-full")


        setTimeout(() => { this.noti.setAttribute("class", "absolute top-0 left-0 transition duration-700 w-full h-full invisible"), this.setMood(x) }, 2500);
    },
    clearInput: function () {
        this.productname.value = ""
        this.price.value = ""
        this.discount.value = ""
        this.quantity.value = ""
        this.vat.value = ""
        // this.productname.setAttribute("value", "");
        // this.price.setAttribute("value", "")
        // this.discount.setAttribute("value", "")
        // this.quantity.setAttribute("value", "")
        // this.vat.setAttribute("value", "")
        this.afterVat.setAttribute("class", "hidden")
        this.deletebtn.setAttribute("class", "hidden")
    }
}


window.inputView = inputView