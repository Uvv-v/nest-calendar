import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import etag from '@fastify/etag';
import compression from '@fastify/compress';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, //
    new FastifyAdapter({ logger: true }),
  );
  await app.register(etag);
  await app.register(compression);

  await app.setGlobalPrefix('/api/v1')
  const swaggerConfig = new DocumentBuilder()
    .setTitle('nest-calendar')
    .setDescription('API docs')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access_token')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, swaggerDocument);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
