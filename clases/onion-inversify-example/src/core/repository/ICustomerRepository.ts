import { UpdateResult, DeleteResult } from 'typeorm';
import { Customer } from '../entitys/customer';

export interface ICustomerRepository {
    create(customer: Customer): Promise<Customer>;
    delete(customerID: string): Promise<void>;
    getCustomers(): Promise<Customer[]>;
    getCustomerByID(customerID: string): Promise<Customer>;
    update(customerId: string, customer: Customer): Promise<void>;

}