"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const constant_1 = require("../utils/constant");
let UsersService = class UsersService {
    constructor(UsersModel) {
        this.UsersModel = UsersModel;
    }
    async createUsers(createUsersDto) {
        try {
            const hashedPassword = await bcrypt.hash(createUsersDto.password, constant_1.saltOrRounds);
            const newUsers = await new this.UsersModel({
                ...createUsersDto,
                password: hashedPassword,
            });
            return newUsers.save();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create user', error.message);
        }
    }
    async updateUser(UserId, updateUsersDto) {
        const existingUsers = await this.UsersModel.findByIdAndUpdate(UserId, updateUsersDto, { new: true });
        if (!existingUsers) {
            throw new common_1.NotFoundException(`Users #${UserId} not found`);
        }
        return existingUsers;
    }
    async getAllUsers() {
        const UsersData = await this.UsersModel.find();
        if (!UsersData || UsersData.length == 0) {
            throw new common_1.NotFoundException('Users data not found!');
        }
        return UsersData;
    }
    async getUsers(UserId) {
        const existingUsers = await this.UsersModel.findById(UserId);
        if (!existingUsers) {
            throw new common_1.NotFoundException(`Users #${UserId} not found`);
        }
        return existingUsers;
    }
    async getUserByUserName(username) {
        const existingUsers = await this.UsersModel.findOne({
            username: username,
        });
        if (!existingUsers) {
            throw new common_1.NotFoundException(`Users #${username} not found`);
        }
        return existingUsers;
    }
    async deleteUser(UserId) {
        const deletedUsers = await this.UsersModel.findByIdAndDelete(UserId);
        if (!deletedUsers) {
            throw new common_1.NotFoundException(`Users #${UserId} not found`);
        }
        return deletedUsers;
    }
    async updateInventory(id, inventoryPayload) {
        const getUser = await this.getUsers(id);
        const updateUser = await this.updateUser(id, {
            inventory: [...getUser.inventory, inventoryPayload],
        });
        return updateUser;
    }
    async validateUser(dto) {
        const user = await this.getUserByUserName(dto.username);
        if (!user) {
            throw new common_1.BadRequestException('Invalid username or password');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Invalid username or password');
        }
        return user;
    }
    generateRandomCode(length) {
        const randomInt = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        const code = randomInt.toString();
        return code.padStart(length, '0');
    }
    async validateFile(file, allowedTypes, maxSizeInBytes) {
        if (file) {
            if (allowedTypes.length === 0 || allowedTypes.includes(file.mimetype)) {
                const fileSizeInBytes = file.size;
                if (maxSizeInBytes && fileSizeInBytes > maxSizeInBytes) {
                    throw new common_1.BadRequestException(`File size exceeds the allowed limit of ${maxSizeInBytes / (1024 * 1024)} MB`);
                }
            }
            else {
                throw new common_1.BadRequestException(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
            }
            return {
                ...file,
                code: this.generateRandomCode(6),
            };
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Users')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map