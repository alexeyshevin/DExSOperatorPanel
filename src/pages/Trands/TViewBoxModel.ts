import { TTrandHeight, TTrandsGroup } from '../../lib/trands/trandsgroup'
import { TTrand } from '../../lib/trands/trand';
import { TViewTrand } from '../../lib/trands/view/TViewTrand';

export interface IViewBoxModelProps {
  height: TTrandHeight;
  models: TTrandsGroup;
}

interface ICanvasSize {
  width: number;
  height: number;
}

export default class TViewBoxModel {
    private count: number = 0;
    private canvas: OffscreenCanvas;
    private ctx: any;
    private height: TTrandHeight;
    private models: TTrandsGroup;
    private views: Map<string, TViewTrand>;
    private ctxsize: ICanvasSize = {
      width : 0,
      height: 0
    }

    constructor (props: IViewBoxModelProps){
      this.height = props.height;
      this.models = props.models;
      this.views = this.createModelDependentView();
      this.ctxsize = {width:0, height:0}
      this.canvas = new OffscreenCanvas(this.ctxsize.width, this.ctxsize.height);
      this.ctx = this.canvas.getContext("2d");
    }

    private createModelDependentView(): Map<string, TViewTrand> {
      const views: Map<string, TViewTrand> = new Map();
      //TODO coздать отображения View специфичные для моделей
      return views;
    }

    public get Context(): any {
      return this.ctx
    }

    public get Canvas(): any {
      return this.canvas
    }

    public draw() {
      this.ctx.strokeStyle = "blue";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.rect(0,0,this.ctxsize.height,this.ctxsize.height);
      this.ctx.stroke();
      this.ctx.strokeStyle = "red";
      this.ctx.font = "16px serif";
      this.ctx.strokeText(`${this.ctxsize.width} x ${this.ctxsize.height} : ${this.count++}`, 2, 18);
      var i: number = 0;
      this.models.Trands.forEach((value: TTrand)=>{
        const s = `${value.Tag}: ${value.Model.EndIndex}`
        this.ctx.strokeStyle = value.Color;
        this.ctx.strokeText(s, 150, i +=18);
        //TODO тут должны отрисовываться графики
      })
    }

    private drawLineChart(){

    }

    public resize(width: number, height: number) {
      if ((width != this.ctxsize.width) || 
          (height != this.ctxsize.height)) {
            this.ctxsize = {width, height}
            this.canvas = new OffscreenCanvas(this.ctxsize.width, this.ctxsize.height);
            this.ctx = this.canvas.getContext("2d");
            this.ctx.imageSmoothingEnabled = false;
      }
    }

    public get Height():TTrandHeight {
      return this.height;
    }

    public get Models(): Map<string, TTrand> {
      return this.models.Trands;
    }
}