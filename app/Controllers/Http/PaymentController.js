"use strict";

const Payment = use("App/Models/Payment");

class PaymentController {
  async salary({ request }) {
    const { name, cpf, page, limit } = request.get();
    const query = Payment.query();
    if (name)
      query.whereHas("employee", (builder) =>
        builder.where("name", "LIKE", `%${name}%`)
      );
    return await query
      .with("employee")
      .orderBy("id", "DESC")
      .paginate(page || 1, limit || 20);
  }
  async store({ request }) {
    const data = request.only(["employee_id", "payment"]);
    const payment = await Payment.create(data);

    return response.send(data);
  }
}

module.exports = PaymentController;
