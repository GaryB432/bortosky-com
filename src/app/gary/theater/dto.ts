export interface ProfileNterface {
  producers: ProducerNterface[];
}
export interface ProducerNterface {
  name: string;
  productions: ProductionNterface[];
}

export interface ProductionNterface {
  show: string;
  opening: string;
  role: string;
}
