import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { myContainer } from '../../inversify.config';
import { TYPES } from '../../types';
import { ICustomerService } from '../../services/interfaces/ICustomerService';
import { CustomerModel } from '../../../infraestructure/DB/customerModel';

dotenv.config();

export default class CustomerController {
  static customerService = myContainer.get<ICustomerService>(
    TYPES.ICustomerService
  );

  static getCustomers = async (request: Request, response: Response) => {
    try {
      const customers = await this.customerService.getCustomers();
      return response.status(200).json(customers);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static getCustomerById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const customer = await this.customerService.getCustomerById(id);
      if (!customer)
        return res.status(404).json({ message: 'Customer doesnt exists' });

      return res.status(200).json(customer);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };

  static createCustomer = async (request: Request, response: Response) => {
    try {
      const { fullName, address, gender, age } = request.body;
      if (!fullName || !address || !gender || !age)
        return response
          .status(406)
          .json({ message: 'Fields must not be empty' });

      const customer = request.body;
      const serviceResponse = await this.customerService.create(customer);

      response.status(201).json(serviceResponse);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static updateCustomer = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const customer = await this.customerService.getCustomerById(id);
      if (!customer)
        return response.status(404).json({ message: 'Customer doesnt exists' });

      await CustomerModel.update(
        { id: id.toString() },
        {
          fullName: request.body.fullName,
          address: request.body.address,
          gender: request.body.gender,
          age: request.body.age,
        }
      );

      response.sendStatus(200);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static deleteCustomer = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const customer = await this.customerService.getCustomerById(id);

      if (!customer)
        return response.status(404).json({ message: 'Customer doesnt exists' });

      await this.customerService.delete(id);
      response.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };
}
