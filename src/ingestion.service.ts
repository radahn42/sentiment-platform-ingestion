import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class IngestionService {
  constructor(
    private jwtService: JwtService,
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
  ) {}

  async processMessage(message: { data: any; token: string; timestamp: Date }) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        message.token,
      );
      console.log('Valid token for user:', payload.sub);
      return { success: true, data: message.data };
    } catch (err) {
      console.error('Invalid token:', err.message);
      throw new Error('Unauthorized');
    }
  }
}
