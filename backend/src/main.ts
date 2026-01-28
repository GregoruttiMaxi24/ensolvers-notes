import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedAdmin } from './seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Seed admin user
  await seedAdmin(app);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Backend corriendo en puerto ${PORT}`);
}
bootstrap();