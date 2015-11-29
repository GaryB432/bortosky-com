﻿namespace Dto {

    "use strict";

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

interface IProduction {
    show: string;
    producer: string;
    opening: Date;
    role: string;
}

interface IAnnualCount {
    year: string;
    count: number;
}

