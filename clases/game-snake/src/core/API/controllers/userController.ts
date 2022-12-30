// import { Request, Response } from 'express';
// import dotenv from 'dotenv';
// import { myContainer } from '../../inversify.config';
// import { TYPES } from '../../types';
// import { IUserService } from '../../services/interface/IUserService';
// import { UserModel } from '../../../infraestructure/DB/userModel';

// dotenv.config();

// export default class UserController {
//   static userService = myContainer.get<IUserService>(
//     TYPES.IUserService
//   );

//   static getUsers = async (request: Request, response: Response) => {
//     try {
//       const users = await this.userService.getUser();
//       return response.status(200).json(users);
//     } catch (error) {
//       if (error instanceof Error) {
//         response.status(500).json({ message: error.message });
//       }
//     }
//   };

//   static getUserById = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       const user = await this.userService.getUserById(id);
//       if (!user)
//         return res.status(404).json({ message: 'user doesnt exists' });

//       return res.status(200).json(user);
//     } catch (error) {
//       if (error instanceof Error) {
//         res.status(500).json({ message: error.message });
//       }
//     }
//   };

//   static createUser = async (request: Request, response: Response) => {
//     try {
//       const { fullName, nickName, age } = request.body;
//       if (!fullName || !nickName || !age)
//         return response
//           .status(406)
//           .json({ message: 'Fields must not be empty' });

//       const user = request.body;
//       const serviceResponse = await this.userService.create(user);

//       response.status(201).json(serviceResponse);
//     } catch (error) {
//       if (error instanceof Error) {
//         response.status(500).json({ message: error.message });
//       }
//     }
//   };

//   static updateUser = async (request: Request, response: Response) => {
//     try {
//       const { id } = request.params;

//       const user = await this.userService.getUserById(id);
//       if (!user)
//         return response.status(404).json({ message: 'user doesnt exists' });

//       await UserModel.update(
//         { id: id.toString() },
//         {
//           fullName: request.body.fullName,
//           nickName: request.body.nickName,
//           age: request.body.age,
//         }
//       );

//       response.sendStatus(200);
//     } catch (error) {
//       if (error instanceof Error) {
//         response.status(500).json({ message: error.message });
//       }
//     }
//   };

//   static deleteUser = async (request: Request, response: Response) => {
//     try {
//       const { id } = request.params;
//       const user = await this.userService.getUserById(id);

//       if (!user)
//         return response.status(404).json({ message: 'user doesnt exists' });

//       await this.userService.delete(id);
//       response.sendStatus(204);
//     } catch (error) {
//       if (error instanceof Error) {
//         response.status(500).json({ message: error.message });
//       }
//     }
//   };
// }
