import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { promises as fs } from 'fs';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    MulterModule.registerAsync({
      useFactory: async () => {
        const uploadDir = './uploads';
        if (!fs.access(uploadDir)) {
          try {
            await fs.mkdir(uploadDir, { recursive: true });
            Logger.log('Upload directory created:', uploadDir);
          } catch (err) {
            Logger.error('Error creating upload directory:=', err);
            throw err;
          }
        }
        return {
          storage: diskStorage({
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
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
