export namespace Dto {
    export interface IProfile {
        producers: IProducer[];
    }
    export interface IProducer {
        name: string;
        productions: IProduction[];
    }

    export interface IProduction {
        show: string;
        opening: string;
        role: string;
    }
}

export interface IProduction {
    show: string;
    producer: string;
    opening: Date;
    role: string;
}

export interface IAnnualCount {
    year: string;
    count: number;
}
