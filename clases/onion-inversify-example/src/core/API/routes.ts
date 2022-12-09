import { Router } from 'express';
import CustomerController from './controllers/customerController';

const router = Router();
router.post('/customers', CustomerController.createCustomer);
router.delete('/customers/:id', CustomerController.deleteCustomer);
router.get('/customers', CustomerController.getCustomers);
router.get('/customers/:id', CustomerController.getCustomerById );
router.put('/customers/:id', CustomerController.updateCustomer );


export default router;