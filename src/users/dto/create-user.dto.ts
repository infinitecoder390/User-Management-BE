import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @Transform((value) => Boolean(value))
  @IsOptional()
  isActive: boolean = true;

  @IsOptional() // Make the entire files property optional
  inventory?: Array<{
    filename: string;
    mimetype: string;
    size: string;
    code: string;
    orignalFilename: string;
  }>;
}
