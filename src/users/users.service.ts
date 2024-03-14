import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/utils/constant';
@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private UsersModel: Model<IUsers>) {}
  async createUsers(createUsersDto: CreateUserDto): Promise<IUsers> {
    try {
      const hashedPassword = await bcrypt.hash(
        createUsersDto.password,
        saltOrRounds,
      );
      const newUsers = await new this.UsersModel({
        ...createUsersDto,
        password: hashedPassword,
      });
      return newUsers.save();
    } catch (error) {
      throw new BadRequestException('Failed to create user', error.message);
    }
  }
  async updateUser(
    UserId: string,
    updateUsersDto: UpdateUserDto,
  ): Promise<IUsers> {
    const existingUsers = await this.UsersModel.findByIdAndUpdate(
      UserId,
      updateUsersDto,
      { new: true },
    );
    if (!existingUsers) {
      throw new NotFoundException(`Users #${UserId} not found`);
    }
    return existingUsers;
  }
  async getAllUsers(): Promise<IUsers[]> {
    const UsersData = await this.UsersModel.find();
    if (!UsersData || UsersData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return UsersData;
  }
  async getUsers(UserId: string): Promise<IUsers> {
    const existingUsers = await this.UsersModel.findById(UserId);
    if (!existingUsers) {
      throw new NotFoundException(`Users #${UserId} not found`);
    }
    return existingUsers;
  }
  async getUserByUserName(username: string): Promise<IUsers> {
    const existingUsers = await this.UsersModel.findOne({
      username: username,
    });
    if (!existingUsers) {
      throw new NotFoundException(`Users #${username} not found`);
    }
    return existingUsers;
  }
  async deleteUser(UserId: string): Promise<IUsers> {
    const deletedUsers = await this.UsersModel.findByIdAndDelete(UserId);
    if (!deletedUsers) {
      throw new NotFoundException(`Users #${UserId} not found`);
    }
    return deletedUsers;
  }
  async updateInventory(
    id: string,
    inventoryPayload: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      destination: string;
      filename: string;
      path: string;
      size: string;
      code: string;
    },
  ) {
    const getUser = await this.getUsers(id);
    const updateUser = await this.updateUser(id, {
      inventory: [...getUser.inventory, inventoryPayload],
    });
    return updateUser;
  }
  async validateUser(dto: { username: string; password: string }) {
    const user = await this.getUserByUserName(dto.username);
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid username or password');
    }
    return user;
  }
  generateRandomCode(length: number) {
    const randomInt =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const code = randomInt.toString();
    return code.padStart(length, '0');
  }
  async validateFile(
    file?: Express.Multer.File,
    allowedTypes?: string[],
    maxSizeInBytes?: number,
  ): Promise<any> {
    if (file) {
      if (allowedTypes.length === 0 || allowedTypes.includes(file.mimetype)) {
        const fileSizeInBytes = file.size;
        if (maxSizeInBytes && fileSizeInBytes > maxSizeInBytes) {
          throw new BadRequestException(
            `File size exceeds the allowed limit of ${maxSizeInBytes / (1024 * 1024)} MB`,
          );
        }
      } else {
        throw new BadRequestException(
          `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
        );
      }
      return {
        ...file,
        code: this.generateRandomCode(6),
      };
    }
  }
}
