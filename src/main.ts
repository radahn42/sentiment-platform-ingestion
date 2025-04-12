import { NestFactory } from '@nestjs/core';
import { IngestionModule } from './ingestion.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    IngestionModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092'],
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
