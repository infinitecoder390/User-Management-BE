"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./schema/users.schema");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const fs_1 = require("fs");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Users', schema: users_schema_1.UsersSchema }]),
            platform_express_1.MulterModule.registerAsync({
                useFactory: async () => {
                    const uploadDir = './uploads';
                    if (!fs_1.promises.access(uploadDir)) {
                        try {
                            await fs_1.promises.mkdir(uploadDir, { recursive: true });
                            common_1.Logger.log('Upload directory created:', uploadDir);
                        }
                        catch (err) {
                            common_1.Logger.error('Error creating upload directory:=', err);
                            throw err;
                        }
                    }
                    return {
                        storage: (0, multer_1.diskStorage)({
                            destination: uploadDir,
                            filename: (req, file, cb) => {
                                const randomName = Array(32)
                                    .fill(null)
                                    .map(() => Math.round(Math.random() * 16).toString(16))
                                    .join('');
                                cb(null, `${randomName}-${file.originalname}`);
                            },
                        }),
                    };
                },
            }),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map