import { Module } from '@nestjs/common';
import { EmailService } from '@src/email/email.service';
import { EmailController } from '@src/email/email.controller';
import { MaildirService } from '@src/email/maildir/maildir.service';
import { ImapService } from './imap/imap.service';
import { UserModule } from '@src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [EmailController],
  providers: [EmailService, MaildirService, ImapService],
  exports: [EmailService],
})
export class EmailModule {}
