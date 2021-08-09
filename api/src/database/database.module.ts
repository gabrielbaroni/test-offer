import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'hipixel.com.br',
            port: 3306,
            username: 'hipixelc_lemoney',
            password: 'XT56c7j87u',
            database: 'hipixelc_lemoney',
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: true
        }),
    ]
})
export class DatabaseModule { }