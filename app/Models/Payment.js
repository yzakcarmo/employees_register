'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Payment extends Model {
    employee(){
        return this.belongsTo("App/Models/Employee")      
    }
}

module.exports = Payment
