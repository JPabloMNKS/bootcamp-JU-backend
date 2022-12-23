// import { injectable } from 'inversify';
// import { Repository } from 'typeorm/repository/Repository';
// import dotenv from 'dotenv';
// import { IUserRepository } from '../../core/repository/IUserRepository';
// import User from '../../core/entitys/user';
// import { AppDataSource } from '../DB/dataSource';
// import { UserModel } from '../DB/userModel';
// dotenv.config();

// @injectable()
// export default class UserRepository implements IUserRepository {

//     private userRepository: Repository<User>;

//     constructor() {
//         this.userRepository = AppDataSource.getRepository(UserModel);
//     }
//     async create(user: User): Promise<User> {
//         return await this.userRepository.save(user);
//     }
//     async delete(userID: string): Promise<void> {
//         await this.userRepository.delete(userID);
//     }
//     async getUsers(): Promise<User[]> {
//         return await UserModel.find();
//     }
//     async getUserByID(userID: string): Promise<User> {
//         const user = await this.userRepository.findOneBy({ id: userID });
//         if (!user) throw new Error('user doesnt exists');
//         return user;
//     }
//     async update(userID: string, user: User): Promise<void> {
//         const userToUpdate = await this.userRepository.findOneBy({ id: userID });
//         if (!userToUpdate) throw new Error('user doesnt exists');
//         await UserModel.update(userID, user);
//     }
// }
