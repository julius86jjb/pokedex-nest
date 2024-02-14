import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  // private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name) // este name no es la propiedad, es moogose
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
    // private readonly pokemonService: PokemonService
  ) {

  }

  async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: { name: string, no: number }[] = []

    data.results.forEach(async ({ name, url }) => {

      const segments = url.split('/');
      const no: number = +segments[segments.length - 2]

      pokemonToInsert.push({ name, no })
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return `Seed succesfully executed `;

  }

  // async executeSeedGaston() {

  //   await this.pokemonModel.deleteMany({});

  //   const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

  //   const pokemons = data.results.map(({ name, url }) => {
  //     return {
  //       name: name,
  //       no: +url.split('/')[6]
  //     }
  //   });

  //   await this.pokemonModel.insertMany(pokemons);

  //   return `Seed succesfully executed `;

  // }

  // async executeSeedModel() {

  //   await this.pokemonModel.deleteMany({});

  //   const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');


  //   data.results.forEach(async ({ name, url }) => {

  //     const segments = url.split('/');
  //     const no: number = +segments[segments.length - 2]

  //     const pokemon = await this.pokemonModel.create({ name, no })
  //   });

  //   return `Seed succesfully executed `;
  // }

  // async executeSeedPromise() {

  //   await this.pokemonModel.deleteMany({});

  //   const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
  //   const insertPromiseArray = []


  //   data.results.forEach(async ({ name, url }) => {

  //     const segments = url.split('/');
  //     const no: number = +segments[segments.length - 2]

  //     insertPromiseArray.push(
  //       this.pokemonModel.create({ name, no })
  //     )
  //     const newArray = await Promise.all(insertPromiseArray);

  //   });

  //   return `Seed succesfully executed `;

  // }

  // async executeSeedService() {

  //   await this.pokemonModel.deleteMany({});

  //   const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

  //   data.results.forEach(async ({ name, url }) => {

  //     const segments = url.split('/');
  //     const no: number = +segments[segments.length - 2]

  //     this.pokemonService.create({ name, no })
  //   });

  //   return `Seed succesfully executed `;

  // }

}
