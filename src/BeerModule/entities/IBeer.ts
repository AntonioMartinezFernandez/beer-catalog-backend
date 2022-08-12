export interface IBeer {
  id: string;
  name: string;
  tagline: string;
  first_brewed: Date;
  description: string;
  image_url: string;
  ingredients: {
    malt: { name: string; amount: { value: number; unit: string } }[];
    hops: { name: string; amount: { value: number; unit: string } }[];
    yeast: string;
  };
}
