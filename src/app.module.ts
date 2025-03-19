import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql',
      synchronize: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, 'db/migrations', '*.{ts,js}')],
      migrationsTableName: 'migrations',
      migrationsRun: true, // auto run migration to populate users table
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
