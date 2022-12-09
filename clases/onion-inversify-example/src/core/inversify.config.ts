import { ICustomerRepository } from './repository/ICustomerRepository';
import { TYPES } from './types';
import CustomerRepository from '../infraestructure/repository/customerRepository';
import { ICustomerService } from './services/interfaces/ICustomerService';
import { CustomerService } from './services/base/customerService';
import { Container } from 'inversify';

const myContainer = new Container();


myContainer.bind<ICustomerRepository>(TYPES.ICustomerRepository).to(CustomerRepository);
myContainer.bind<ICustomerService>(TYPES.ICustomerService).to(CustomerService);
export { myContainer };