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

  getEmployeeById(id: string): Employee | undefined {
    return this.employees.find((employee) => employee.id === id);
  }
}

export default EmployeeRepository;
