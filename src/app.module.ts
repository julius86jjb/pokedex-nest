import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule } from '@nestjs/config';

import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(process.env.MONGO_URI, { dbName: process.env.MONGO_DB_NAME}),

    PokemonModule,
    CommonModule,
    SeedModule
  ],
})
export class AppModule { 
}
