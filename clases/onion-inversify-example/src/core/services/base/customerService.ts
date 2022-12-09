import { inject, injectable } from 'inversify';
import { UpdateResult, DeleteResult } from 'typeorm';
import { TYPES } from '../../types';
import { ICustomerService } from '../interfaces/ICustomerService';
import { ICustomerRepository } from '../../repository/ICustomerRepository';
import { Customer } from '../../entitys/customer';

@injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @inject(TYPES.ICustomerRepository)
    private customerRepository: ICustomerRepository
  ) {}

  create(customer: Customer): Promise<Customer> {
    return this.customerRepository.create(customer);
  }
  async delete(customerID: string): Promise<void> {
    return await this.customerRepository.delete(customerID);
  }
  getCustomers(): Promise<Customer[]> {
    return this.customerRepository.getCustomers();
  }
  getCustomerById(customerID: string): Promise<Customer> {
    return this.customerRepository.getCustomerByID(customerID);
  }
  update(customerId: string, customer: Customer): Promise<void> {
    return this.customerRepository.update(customerId, customer);
  }

}
