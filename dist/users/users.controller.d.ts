/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./interface/user.interface").IUsers>;
    findAll(): Promise<import("./interface/user.interface").IUsers[]>;
    findOne(id: string): Promise<import("./interface/user.interface").IUsers>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./interface/user.interface").IUsers>;
    remove(id: string): Promise<import("./interface/user.interface").IUsers>;
    uploadFile(file: Express.Multer.File, id: string): Promise<import("./interface/user.interface").IUsers>;
}
