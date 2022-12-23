// import { inject, injectable } from 'inversify';
// import { TYPES } from '../../types';
// import { IUserService } from '../interface/IUserService';
// import User from '../../entitys/user';
// import { IUserRepository } from '../../repository/IUserRepository';

// @injectable()
// export class UserService implements IUserService {
//   constructor(
//     @inject(TYPES.IUserRepository)
//     private userRepository: IUserRepository
//   ) {}

//   create(user: User): Promise<User> {
//     return this.userRepository.create(user);
//   }
//   async delete(userID: string): Promise<void> {
//     return await this.userRepository.delete(userID);
//   }
//   getUser(): Promise<User[]> {
//     return this.userRepository.getUsers();
//   }
//   getUserById(userID: string): Promise<User> {
//     return this.userRepository.getUserByID(userID);
//   }
//   update(userID: string, user: User): Promise<void> {
//     return this.userRepository.update(userID, user);
//   }

// }
