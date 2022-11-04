interface IProducts {
  id: number;
  title: string;
  image?: string;
  price: number;
  configure: IProductConfig;
  quantity: number;
}

interface IProductConfig {
    chip: string;
    ssd: string;
    memory: string;
    display: string;
}
