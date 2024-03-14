/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { IUsers } from './interface/user.interface';
export declare class UsersService {
    private UsersModel;
    constructor(UsersModel: Model<IUsers>);
    createUsers(createUsersDto: CreateUserDto): Promise<IUsers>;
    updateUser(UserId: string, updateUsersDto: UpdateUserDto): Promise<IUsers>;
    getAllUsers(): Promise<IUsers[]>;
    getUsers(UserId: string): Promise<IUsers>;
    getUserByUserName(username: string): Promise<IUsers>;
    deleteUser(UserId: string): Promise<IUsers>;
    updateInventory(id: string, inventoryPayload: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        destination: string;
        filename: string;
        path: string;
        size: string;
        code: string;
    }): Promise<IUsers>;
    validateUser(dto: {
        username: string;
        password: string;
    }): Promise<IUsers>;
    generateRandomCode(length: number): string;
    validateFile(file?: Express.Multer.File, allowedTypes?: string[], maxSizeInBytes?: number): Promise<any>;
}
