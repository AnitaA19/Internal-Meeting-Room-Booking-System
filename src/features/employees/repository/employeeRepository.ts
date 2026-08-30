import type { Employee } from "../types/employee";
import employeeData from "../../../data/employees.json";

class EmployeeRepository {
  private employees: Employee[];

  constructor() {
    this.employees = employeeData;
  }

  getAllEmployees(): Employee[] {
    return this.employees;
  }
}

export default EmployeeRepository;
