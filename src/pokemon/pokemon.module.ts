import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([{
      name: Pokemon.name,         // este "name" no es la propiedad, es moogose
      schema: PokemonSchema,
    }]),
    ConfigModule
  ],
  exports: [
    PokemonService,
    MongooseModule
  ]
})
export class PokemonModule {}
