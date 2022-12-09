import { DeleteResult, UpdateResult } from 'typeorm';
import { Customer } from '../../entitys/customer';

export interface ICustomerService {
    create(customer: Customer): Promise <Customer>;
    delete(customerID: string): Promise<void>;
    getCustomers(): Promise<Customer[]>;
    getCustomerById(customerID: string ) : Promise<Customer>;
    update(customerId: string, customer: Customer): Promise<void>;
}