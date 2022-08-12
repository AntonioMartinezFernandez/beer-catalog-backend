import { IBeer } from '../../../BeerModule/entities/IBeer';
import { beerModel } from '../../../BeerModule/models/Beer';
import { mongodbConnect, mongodbDisconnect } from '../mongodbConnector';
import { v4 as uuidv4 } from 'uuid';

class SeedBeersCollection {
  apiURL = 'https://api.punkapi.com/v2/beers?page=1&per_page=80';
  dataFromAPI: any[] = [];
  parsedData: IBeer[] = [];

  constructor(private readonly _beerModel = beerModel) {}

  async execute() {
    await this.loadBeerDataFromApi();
    this.parseData();
    await mongodbConnect();
    await this.cleanDatabase();
    await this.saveData();
    await mongodbDisconnect();
  }

  async loadBeerDataFromApi() {
    const requestData = await fetch(this.apiURL);
    this.dataFromAPI = await requestData.json();
  }

  parseData() {
    let parsedBeer: IBeer;

    this.dataFromAPI.forEach((beer) => {
      parsedBeer = {
        id: '',
        name: '',
        tagline: '',
        first_brewed: new Date(),
        description: '',
        image_url: '',
        ingredients: {
          malt: [],
          hops: [],
          yeast: '',
        },
      };

      parsedBeer.id = uuidv4();
      parsedBeer.name = beer.name;
      parsedBeer.tagline = beer.tagline;
      parsedBeer.first_brewed = new Date(
        `${beer.first_brewed.slice(3, 7)}-${beer.first_brewed.slice(0, 2)}`,
      );
      parsedBeer.description = beer.description;
      parsedBeer.image_url = beer.image_url;
      parsedBeer.ingredients.malt = beer.ingredients.malt;
      parsedBeer.ingredients.hops = beer.ingredients.hops;
      parsedBeer.ingredients.yeast = beer.ingredients.yeast;

      this.parsedData.push(parsedBeer);
    });
  }

  async cleanDatabase() {
    await this._beerModel.deleteMany({});
    console.log('All beers has been deleted from DB');
  }

  async saveData() {
    for (const beer of this.parsedData) {
      const savedBeer = await this._beerModel.create(beer);
      console.log(`"${savedBeer.name}" saved in DB!`);
    }
  }
}

new SeedBeersCollection().execute();
