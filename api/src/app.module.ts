import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { OffersModule } from './offers/offers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ConfigModule.forRoot(),
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
