import { User } from '../entitys/user';

export default class IUserService{
    private userRepository: IUserRepository<User>;
}
