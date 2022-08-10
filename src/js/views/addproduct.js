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
        this.delete = document.getElementById("delete")
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
            this.productname.value = ""
            this.price.value = ""
            this.discount.value = ""
            this.quantity.value = ""
            this.vat.value = ""
            this.afterVat.setAttribute("class", "hidden")
        } else {
            alert("fill all fields")
            return
        }
        this.onSuccess()


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
            this.productname.value = ""
            this.price.value = ""
            this.discount.value = ""
            this.quantity.value = ""
            this.vat.value = ""
            this.afterVat.setAttribute("class", "hidden")
        } else {
            console.error("fill all fields")
            return
        }
        this.onSuccess()
        setTimeout(() => {
            this.setMood("input")
        }, 2500);

    },
    onDelete: function () {
        const id = this.container.getAttribute("key")
        octopus.deleteFromDatabase(id)

        this.onSuccess()
        setTimeout(() => {
            this.setMood("input")
        }, 2500);

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
        this.container.innerHTML = `
        <div class="absolute top-0 left-0 transition duration-700 w-full h-full invisible"
            id="notification">
            <img id="gif" alt="" class="w-full h-full transition duration-700"/>
        </div>
        <div class="grid grid-cols-3 gap-6">
            <div class="col-span-4 sm:col-span-3">
                <label for="Product-name" class="block text-sm font-medium text-gray-700">
                    Product name </label>
                <div class="mt-1 flex rounded-md border border-gray-300 shadow-sm">
                    <input onkeyup="inputView.getTotalPrice()" type="text" name="Product-name" id="name" value="${y.name}"
                        class=" p-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="Iphone">
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-6">
            <div class="col-span-2 sm:col-span-1">
                <label for="price" class="block text-sm font-medium text-gray-700">
                    Price </label>
                <div class="mt-1 flex rounded-md  border border-gray-300 shadow-sm">

                    <span
                        class="inline-flex items-center px-3 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">LE</span>
                    <input onkeyup="inputView.getTotalPrice()" type="number" name="price" id="price" value="${y.price}"
                        class="p-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="17000">
                </div>
            </div>

            <div class="col-span-2 sm:col-span-1">
                <label for="Quantity" class="block text-sm font-medium text-gray-700">
                    Quantity </label>
                <div class="mt-1 flex rounded-md  border border-gray-300 shadow-sm">

                    <input onkeyup="inputView.getTotalPrice()" type="number" name="Quantity" id="quantity" value="${y.quantity}"
                        class="p-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="2">
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-6">
            <div class="col-span-2 sm:col-span-1">
                <label for="Discount" class="block text-sm font-medium text-gray-700">
                    Discount </label>
                <div class="mt-1 flex rounded-md  border border-gray-300 shadow-sm">
                    <span
                        class="inline-flex items-center px-3 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">%</span>
                    <input onkeyup="inputView.getTotalPrice()" type="number" name="Discount" id="discount" value="${y.discount}"
                        class="p-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="50">
                </div>
            </div>

            <div class="col-span-2 sm:col-span-1">
                <label for="vat" class="block text-sm font-medium text-gray-700">
                    VAT </label>
                <div class="mt-1 flex rounded-md  border border-gray-300 shadow-sm">
                    <span
                        class="inline-flex items-center px-3 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">%</span>
                    <input onkeyup="inputView.init()" type="number" name="vat" id="vat" value="${y.vat}" disabled
                        class="p-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="14">
                </div>
            </div>
        </div>
        `
        this.container.setAttribute('class', 'px-4 py-5 bg-green-300 transition duration-700 space-y-6 sm:p-6')
        this.container.setAttribute("key", y.id)
        this.submit.setAttribute("onclick", "inputView.onUpdate()")
        this.delete.setAttribute("class", "px-4 py-3 bg-gray-50 text-right sm:px-6")
        this.submit.innerText = "update"
        this.init()
    },
    inView: function () {
        this.container.innerHTML = `
        <div class="absolute top-0 left-0 transition duration-700 w-full h-full invisible"
            id="notification">
            <img id="gif" alt="" class="w-full h-full transition duration-700"/>
        </div>
        <div class="grid grid-cols-3 gap-6">
            <div class="col-span-4 sm:col-span-3">
                <label for="Product-name" class="block text-sm font-medium text-gray-700">
                    Product name </label>
                <div class="mt-1 flex rounded-md border border-gray-300 shadow-sm">
                    <input onkeyup="inputView.getTotalPrice()" type="text" name="Product-name" id="name"
                        class=" p-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="Iphone">
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-6">
            <div class="col-span-2 sm:col-span-1">
                <label for="price" class="block text-sm font-medium text-gray-700">
                    Price </label>
                <div class="mt-1 flex rounded-md  border border-gray-300 shadow-sm">

                    <span
                        class="inline-flex items-center px-3 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">LE</span>
                    <input onkeyup="inputView.getTotalPrice()" type="number" name="price" id="price"
                        class="p-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="17000">
                </div>
            </div>

            <div class="col-span-2 sm:col-span-1">
                <label for="Quantity" class="block text-sm font-medium text-gray-700">
                    Quantity </label>
                <div class="mt-1 flex rounded-md  border border-gray-300 shadow-sm">

                    <input onkeyup="inputView.getTotalPrice()" type="number" name="Quantity" id="quantity"
                        class="p-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="2">
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-6">
            <div class="col-span-2 sm:col-span-1">
                <label for="Discount" class="block text-sm font-medium text-gray-700">
                    Discount </label>
                <div class="mt-1 flex rounded-md  border border-gray-300 shadow-sm">
                    <span
                        class="inline-flex items-center px-3 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">%</span>
                    <input onkeyup="inputView.getTotalPrice()" type="number" name="Discount" id="discount"
                        class="p-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="50">
                </div>
            </div>

            <div class="col-span-2 sm:col-span-1">
                <label for="vat" class="block text-sm font-medium text-gray-700">
                    VAT </label>
                <div class="mt-1 flex rounded-md  border border-gray-300 shadow-sm">
                    <span
                        class="inline-flex items-center px-3 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 text-sm">%</span>
                    <input onkeyup="inputView.init()" type="number" name="vat" id="vat"
                        class="p-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="14">
                </div>
            </div>
        </div>
        `
        this.container.setAttribute('class', 'px-4 py-5 bg-white space-y-6 sm:p-6')
        this.afterVat.setAttribute('class', "hidden")
        this.submit.setAttribute("onclick", "inputView.onClick()")
        this.submit.innerText = "save"
    },
    onSuccess: function () {

        this.noti.setAttribute("class", "absolute top-0 left-0 transition duration-700 w-full h-full")


        setTimeout(() => { this.noti.setAttribute("class", "absolute top-0 left-0 transition duration-700 w-full h-full invisible") }, 2500);
    }
}


window.inputView = inputView