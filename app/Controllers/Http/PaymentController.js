"use strict";

const Payment = use("App/Models/Payment");

class PaymentController {
  async index(request) {
    const {param} = request.get()
    const query = Payment.query()
    if(param)
    query.whereHas("employee", builder => builder.where('name', 'LIKE', '%${param}%'))

    return payments;
  }
  async store({ request }) {
    const data = request.only(['employee_id','payment']);
    const payment = await Payment.create(data);

    return payment;
  }
}

module.exports = PaymentController;
