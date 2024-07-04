import { Test, TestingModule } from '@nestjs/testing';
import { MaildirService } from './maildir.service';

describe('MaildirService', () => {
  let service: MaildirService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaildirService],
    }).compile();

    service = module.get<MaildirService>(MaildirService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
