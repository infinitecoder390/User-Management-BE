"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, helmet_1.default)());
    const config = app.get(config_1.ConfigService);
    await app.listen(config.get('PORT') || 3000);
    common_1.Logger.log(`🚀 Application is running on: ${config.get('PORT')}`);
}
bootstrap();
//# sourceMappingURL=main.js.map