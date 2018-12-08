const ToDo = require('../models/models')

module.exports = {
    getToDos: () => {
        return new Promise((resolve, reject) => {
            ToDo
                .fetchAll()
                .then(toDos => {
                    resolve(toDos.models.map(toDo => toDo.attributes))
                })
                .catch(err => reject(err))
        })
    },
    addToDo: (toDo) => {
        return new Promise((resolve, reject) => {
            const newToDo = new ToDo({
                task: toDo.task,
                completed: toDo.completed
            })
            newToDo.save()
                .then(toDo => {
                    resolve(toDo.attributes)
                })
                .catch(err => reject(err))
        })
    },
    updateToDo: (toDo) => {
        return new Promise((resolve, reject) => {
            const attributesToUpdate = { 
                task: toDo.task,
                completed: toDo.completed
            }
            const newToDo = new ToDo({
                id: toDo.id
            })
            newToDo.save(attributesToUpdate, {
                    patch: true
                })
                .then(toDo => {
                    resolve(toDo.attributes)
                })
                .catch(err => reject(err))
        })
    },
    deleteToDo: (id) => {
        return new Promise((resolve, reject) => {
            const newToDo = new ToDo({
                id
            })
            newToDo.destroy()
                .then(toDo => {
                    resolve(toDo.attributes)
                })
                .catch(err => reject(err))
        })
    }
}