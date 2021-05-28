import UsersDao from '../daos/users.dao';
import { CreateUserDto } from '../dto/create.user.dto';

class UsersService {
    async create(resource: CreateUserDto) {
        return UsersDao.createUser(resource);
    }

    async getUserById(id: number) {
        return UsersDao.getUserById(id);
    }
    async getUserByNickname(nickname: string) {
        return UsersDao.getUserByNickname(nickname);
    }
}

export default new UsersService();
