import { CustomerModel } from './DB/customerModel';
import { Customer } from '../core/entitys/customer';

export class CustomerMapper {
  static toCustomer(customerEntity: CustomerModel): Customer {
    const customer = new Customer();
    customer.id = customerEntity.id;
    customer.fullName = customerEntity.fullName;
    customer.address = customerEntity.address;
    customer.gender = customerEntity.gender;
    customer.age = customerEntity.age;
    return customer;
  }
}
