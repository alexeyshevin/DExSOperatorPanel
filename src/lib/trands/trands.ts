/*
1) Загрузить инфу о трендах из trands.json
2) Создать объекты из трендов чтобы знать их Measure Units и тип
3) Зная deep создать массивы для каждого тренда
4) Создать автоматическое заполнение массивов тредов с интервалом interval мс
5) На странице Trands.tsx выводить Canvas с графиками.
   Высота графика в параметре height
6) Если в массиве tags несколько трендов то графики требуется совмещать
*/
import {getTextByURL} from '../svg/lib/utils' 
import { TTrandsGroup, TTrandHeight } from './trandsgroup';

const settingsURL = '/assets/trands/trands.json'

export class TTrands {
    private url: string = ''
    private deep: number = 0;// глубина архива
    private interval: number = 0;// интервал обновления данных
    private trands: Map<string, TTrandsGroup> = new Map()
    private updateTimer: any = undefined;
    private count: number = 0;

    constructor (url: string = settingsURL) {
        this.url = url
    }

    public async loadConfig() {
        const text: string = await getTextByURL(this.url)
        const settings = await JSON.parse(text);
        this.deep = settings.deep || 0;
        this.interval = settings.interval || 0;
        this.getTrands(settings.trands || undefined)
    }

    private getTrands(trands: any) {
        if (trands === undefined) return;
        for (const key in trands) {
            const value: any = trands[key];
            const group: TTrandsGroup = new TTrandsGroup(this.deep, value);
            this.trands.set(key, group)
        }
    }

    public startUpdateTimer() {
        this.updateTimer = setInterval(this.updateTrandsValue.bind(this), this.interval)
    }

    private updateTrandsValue(){
        console.log(`update ${this.count++}`);
        this.trands.forEach((group:TTrandsGroup)=>{
            group.setTagsValues()
        })
    }

    public getTagList():Array<string> {
        const res: Array<string>=[]
        this.trands.forEach((group:TTrandsGroup)=>{
            res.push(group.getTagNameList())
        })
        return res;
    }

    public getBoxesHeight():Array<TTrandHeight> {
        const res: Array<TTrandHeight>=[]
        this.trands.forEach((group:TTrandsGroup)=>{
            res.push(group.getBoxHeight())
        })
        return res;
    }
}

export const Trands = new TTrands();