import { Controller, Get } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller()
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Get('ingestion')
  getIngetsion(): string {
    return this.ingestionService.getIngesion();
  }
}
