import { octopus } from '../../index'

export var dbView = {
    init: function () {
        this.table = document.getElementById("table")
        this.nodata = document.getElementById("nodata")
        this.data = octopus.getDatabase()
        this.listView()

    },

    listView: function () {
        this.table.innerHTML = "";
        if (this.data.length > 0) {
            this.nodata.setAttribute("class", "hidden")
        } else {
            this.nodata.setAttribute("class", "w-full")
        }
        for (let i = 0; i < this.data.length; i++) {
            let res = +this.data[i].price - +this.data[i].price * (+this.data[i].discount / 100)
            let aftervat = res + (res * +this.data[i].vat / 100)
            const template =
                `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key="${this.data[i].id}" onclick="inputView.setMood('edit',this.getAttribute('key'))">
            <th scope="row"
             class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${this.data[i].name}
            </th>
            <td class="py-4 px-3">
                ${this.data[i].quantity}
            </td>
            <td class="py-4 px-3">
                ${this.data[i].discount}%
            </td>
            <td class="py-4 px-3">
                <span class="text-green-400" id="price">${this.data[i].price}LE</span>
            </td>
            <td class="py-4 px-6">
                <span class="text-green-500" id="sell-price">${aftervat}LE</span>
            </td>
        </tr>
        `
            this.table.innerHTML += template
        }
    },

}
window.dbView = dbView