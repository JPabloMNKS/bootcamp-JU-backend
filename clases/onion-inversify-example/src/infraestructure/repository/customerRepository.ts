import { CustomerModel } from '../DB/customerModel';
import { ICustomerRepository } from '../../core/repository/ICustomerRepository';
import { injectable } from 'inversify';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Customer } from '../../core/entitys/customer';
import dotenv from 'dotenv';
import { AppDataSource } from '../DB/dataSource';
import { CustomerMapper } from '../customerMapper';
dotenv.config();

@injectable()
export default class CustomerRepository implements ICustomerRepository {

    private customerRepository: Repository<Customer>;

    constructor() {
        this.customerRepository = AppDataSource.getRepository(CustomerModel);
    }
    async create(customer: Customer): Promise<Customer> {
        return await this.customerRepository.save(customer);
    }
    async delete(customerID: string): Promise<void> {
        await this.customerRepository.delete(customerID);
    }
    async getCustomers(): Promise<Customer[]> {
        return await CustomerModel.find();
    }
    async getCustomerByID(customerID: string): Promise<Customer> {
        const customer = await this.customerRepository.findOneBy({ id: customerID });
        if (!customer) throw new Error('Customer doesnt exists');
        return customer;
    }
    async update(customerId: string, customer: Customer): Promise<void> {
        const customerToUpdate = await this.customerRepository.findOneBy({ id: customerId });
        if (!customerToUpdate) throw new Error('Customer doesnt exists');
        await CustomerModel.update(customerId, customer);
    }
}
