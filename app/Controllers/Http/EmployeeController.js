"use strict";
const Employee = use("App/Models/Employee");
const Payment = use("App/Models/Payment");
const { validateAll } = use("Validator");

class EmployeeController {
  async index({}) {
    const employees = await Employee.all();

    return employees;
  }
  async store({ request, response }) {
    const data = request.only(["name", "cpf", "birth", "salary"]);

    const rules = {
      cpf: "required|cpfCnpj",
    };
    const messages = {
      "cpf.required": "CPF é obrigatorio",
      "cpf.cpfCnpj": "CPF invalido",
    };
    const validate = await validateAll(data, rules, messages);
    if (validate.fails()) {
      return response.status(401).send({ message: validate.messages() });
    }

    const employees = await Employee.create(data);

    return response.send(employees);
  }
  async update({ params, request }) {
    const employee = await Employee.findOrFail(params.id);
    const data = request.only(["name", "cpf", "birth", "salary"]);

    employee.merge(data);
    await employee.save();

    return employee;
  }
  async show({ params }) {
    const employee = await Employee.findOrFail(params.id);

    return employee;
  }
  async destroy({ params }) {
    const employee = await Employee.findOrFail(params.id);

    employee.delete();
  }
  async salary({ request }) {
    const { page, limit, param } = request.get();
    //const {name, cpf} = request.all()
    const query = Employee.query();
    if (param)
      query.whereHas("payments", (builder) =>
        builder.where("name", "LIKE", "%${param}%")
      );
    return await query.orderBy("id", "ASC").paginate(page || 1, limit || 20);
  }
}

module.exports = EmployeeController;
