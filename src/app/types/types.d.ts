interface IProducts {
    id: number;
    title: string;
    image?: string;
    configure: IProductConfig;
}

interface IProductConfig {
    chip: string;
    SSD: string;
    memory: string;
    display: string;
}