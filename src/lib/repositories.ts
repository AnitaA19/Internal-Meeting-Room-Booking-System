import BookingRepository from "../features/bookings/repository/bookingRepository";
import EmployeeRepository from "../features/employees/repository/employeeRepository";
import RoomRepository from "../features/rooms/repository/roomRepository";

export const roomRepository = new RoomRepository();
export const bookingRepository = new BookingRepository();
export const employeeRepository = new EmployeeRepository();
