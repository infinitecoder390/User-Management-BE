export declare class CreateUserDto {
    username: string;
    password: string;
    isActive: boolean;
    inventory?: Array<{
        filename: string;
        mimetype: string;
        size: string;
        code: string;
        orignalFilename: string;
    }>;
}
