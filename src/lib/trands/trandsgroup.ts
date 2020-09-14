//тренды вписанные в один блок графика
import { TTrand } from './trand';
import { ITrandProp } from './itrand';

interface ITrandsGroupProp {
  height: string,
  tags: Array<string>
}

export class TTrandHeight {
  height: number = 0; //высота графика
  mu: string = 'px';  //единицы измерения
}

export class TTrandsGroup {
  private deep: number; //глубина архива
  private height: TTrandHeight;
  private trands: Map<string, TTrand>;
  private count: number = 0;

  constructor (deep: number, props: ITrandsGroupProp) {
    this.deep = deep;
    this.height = this.setHeightProps(props.height);
    this.trands = this.setTagsProps(props.tags);
  }

  public get Trands(): Map<string, TTrand> {
    return this.trands;
  }

  public getBoxHeight():TTrandHeight{
    return this.height;
  }

  private setHeightProps(prop: string): TTrandHeight {
    const [height, mu] = prop.split(' ');
    return {
      height: Number(height),
      mu
    }
  }

  private setTagsProps(props: Array<string>): Map<string, TTrand> {
    const tags: Map<string, TTrand> = new Map();
    for (const key in props) {
      const value: any = props[key];
      const trandProp: ITrandProp = {
        tag: key,
        deep: this.deep,
        ...value
      }
      const trand: TTrand = new TTrand(trandProp);
      tags.set(key, trand)
      console.log(value)
    }
    return tags;
  }

  public setTagsValues() {
    this.trands.forEach((tag:TTrand) => {
      //const value = tag.getTagValue();
      //tag.setValueToModel(value);
      tag.setValueToModel(this.count);
      if (this.count++ > 128) this.count = 0;
    })
  }
}