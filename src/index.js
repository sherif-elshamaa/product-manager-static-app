import { dbView } from './js/views/viewproducts'
import { inputView } from './js/views/addproduct'
import './styles.css';

var model = {
    database: JSON.parse(localStorage.getItem('database')) || []

}


export var octopus = {
    init: function () {
        dbView.init()
        inputView.init()
    },
    addToDatabase: function (obj) {
        model.database.push(obj)
        this.savelocal()
        dbView.init()
    },
    updateDatabase: function (obj) {
        model.database.forEach(x => {
            if (x.id === obj.id) {
                obj.name && (x.name = obj.name)
                obj.price && (x.price = obj.price)
                obj.quantity && (x.quantity = obj.quantity)
                obj.discount && (x.discount = obj.discount)
            }
        })
        this.savelocal()
        dbView.init()
    },
    deleteFromDatabase: function (id) {
        const arr = model.database.filter(x => x.id !== id)
        model.database = arr
        this.savelocal()
        dbView.init()
    },
    savelocal: function () {
        localStorage.setItem("database", JSON.stringify(model.database))
    },
    getDatabase: function () {
        return model.database
    }
}





octopus.init()