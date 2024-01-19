import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { PagespeedModule } from './pagespeed/pagespeed.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PageSpeedData } from './pagespeed/entities/pagespeeddata.entity';

@Module({
  imports: [
    HttpModule,
    PagespeedModule,
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: false,
          envFilePath: '.env',
        }),
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('HOST'),
        port: parseInt(configService.get<string>('PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
        entities: [PageSpeedData],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
