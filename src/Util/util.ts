import * as _ from "lodash";

export interface DataObj {
    dataArr: number[],
    recentNumber: number,
    totalNumber: number,
}

export const colorObj = {
    impression: {
        main: "gradient-primary",
        light: "#4e51c1",
        dark: "#1f1498",
    },
    click: {
        main: "gradient-info",
        light: "#6da4e4",
        dark: "#2982cc"
    },
    user: {
        main: "gradient-warning",
        light: "#f0b764",
        dark: "#f9b115"
    },
    ctr: {
        main: "gradient-danger",
        light: "#da7673",
        dark: "#e55353"
    }
}

export const calculateCtr = (clicksArr: number[], impressionsArr: number[]): number => {
    return Number((_.sum(clicksArr) / _.sum(impressionsArr) * 100).toFixed(2));
}

//Calculating total CTR by (total clicks/ total impressions * 100)
export const calculateRecentCTR = (clicks: number, impression: number): number => {
    return Number((clicks / impression * 100).toFixed(2));
}

export const conditiaonalColor = (current: number, arr: number[]): string => {
    if (arr.length <= 1) return "";
    if (current < arr[arr.length - 2]) return "red";
    return "green";
}