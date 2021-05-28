import User from "../../entities/user";
import { CreateUserDto } from "../dto/create.user.dto";

class UsersDao {

    constructor() {
    }

    async createUser(userData: CreateUserDto) {
        const user = await User.create({
            nickname: userData.nickname,
        });

        return await user.save();
    }

    async getUserById(id: number) {
        return await User.findOne( { id })
    }

    async getUserByNickname(nickname: string) {
        return await User.findOne( { nickname })
    }

}

export default new UsersDao();