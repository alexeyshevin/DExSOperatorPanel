import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {observable, autorun} from 'mobx'
import {deviceStore, TDeviceStore} from '../store/devices/devices'
import MotorSVG from  '../assets/svg/vteg.svg'
import {TSVGGroups, TElementAndAttrValue, TSVGTemplateElement, TElementAttrObject} from '../lib/svg/lib/svggroup'
import { changeSingleQuotesToDouble } from '../lib/svg/lib/utils'
import {TSVGComponent, TSVGComponentArg} from '../lib/svg/lib/components/TSVGComponent'
import { createSVGComponent, TSVGComponentInitialArgs } from '../lib/svg/lib/components/svgCompFabrica'

/*
interface HomeProps {
  store?: TDeviceStore
}
@inject('stores')
*/
@observer
//export default class Home extends Component<HomeProps> {
export default class Home extends Component {
  @observable Ustat: string = '';
  @observable Iexc: string = '';
  private svgComponents: Array<TSVGComponent> = [];

  constructor (props: any){
    super(props)
    autorun(()=>{this.putValuesToSVGTemplate(deviceStore.changeTime)})
  }

  private putValuesToSVGTemplate(changed: any){
    this.svgComponents.forEach((item: TSVGComponent) => {
      let value: TSVGComponentArg = {
          value:this.getTagData(`U1>U1:RAM>data>${item.Tag}`),
          valid: true
        }
      item.setState(value);
      item.draw();
    })
  }

  // U1>U1:RAM>data>Iexc
  private getTagData(tag: string) {
    const keyList: Array<string> = tag.split('>')
    var o: any = deviceStore.pureDeviceData;;
    var value: any;
    keyList.forEach((key:string)=>{
      value = key in o ? o[key] : undefined;
      if (!value) return '';
      o = value;
    })
    return value;
  }
 
  componentDidMount(){
    console.log('был рендер')
  }

  handleImageLoaded() {
    console.log('svg загружен')
    const g: TSVGGroups = new TSVGGroups('vteg');
    const Elements = g.getElementsAndValuesByAttr('data-id')
      .map((item: TElementAndAttrValue):TSVGTemplateElement => {
        let result: TSVGTemplateElement = {
          element: item.element,
          attr: {...new TElementAttrObject(), ...changeSingleQuotesToDouble(item.tag)}
        }
        return result
    });
    //создать объекты
    Elements.forEach((item: TSVGTemplateElement) => {
      const arg: TSVGComponentInitialArgs = {
        element: item.element,
        ...item.attr
      }
      const o: TSVGComponent | undefined = createSVGComponent(arg);
      if (o) this.svgComponents.push(o);
    });
  }

  render() {
    return(
      <>
        <h1>Home </h1>
        <button type="button" className="btn btn-primary ml-1">
          <span className="badge badge-light bg-success">
            Count:
          </span>
          <span className="badge badge-light bg-warning ml-1">
            {deviceStore.count}
          </span>
        </button>
        <br></br>
        <object className="mt-1" id="vteg" type="image/svg+xml"
            data={MotorSVG}
            onLoad={()=>{this.handleImageLoaded()}}
            > {/*width="100%" height="100%"*/}
        </object>	      
      </>
    )
  }
}

/*
[PAGES]
p0=Самовозбуждение/FLASH:SelfExciteEnable,FLASH:Ready_GS_ON/
p1=Задания автоматического режима/RAM:Usgz,RAM:Stz,RAM:UstStC,RAM:Ustat,FLASH:zUs,FLASH:zSt/
p2=Выходные параметры/RAM:Iexc,RAM:Ustat,RAM:Istat,RAM:Fi,RAM:Ssg,RAM:Psg,RAM:Qsg,RAM:Freq,RAM:Usg_ab/
p3=Готовность/RAM:iReady,RAM:iPCSB_QF1,RAM:iCCSB_QF5,RAM:DExS_PWR_OK,RAM:iSwState,RAM:FAULT,RAM:TestMode/
p4=Аварии/RAM:GlobalError,RAM:FieldFail,RAM:UstMaxFlt,RAM:NotUpVoltage,RAM:IttMaxFlt,RAM:IexcMaxFlt,RAM:FltMPS,RAM:FltCCSB,RAM:FSAsyncRun,RAM:QminAsyncRun,RAM:FLongForce,RAM:FreqMinFlt,RAM:R_INSL_FLT,RAM:IstOV/
p5=Предупреждения/RAM:R_INSL_LOW,RAM:UstLow,RAM:UstFail,RAM:i2tR,RAM:UstMaxFlt/
p6=Дискретные входы/RAM:iReady,RAM:iTest,RAM:iReset,RAM:iSwState,RAM:iIRp+,RAM:iAuto,RAM:iEnergize,RAM:iBlanking,RAM:iSGFault,RAM:iPCSB_QF1,RAM:iCCSB_QF5,RAM:iLocalMode/
p7=Дискретные выходы/RAM:oREADY_K2,RAM:oExcite_K5,RAM:oComplete_K6,RAM:oWARNING_K3,RAM:oFAULT_K4,RAM:oINSLFlt_K7,RAM:oCROWBAR_K1,RAM:oReserve_K8/
p8=Преобразователь/RAM:Iexc,RAM:Uexc,RAM:A,RAM:Uab_sync,RAM:Ubc_sync,RAM:Uca_sync,RAM:IttA,RAM:IttB,RAM:IttC/
p9=Реактивная мощность/RAM:Qsg,RAM:Qoe,RAM:QLimMin,RAM:QLimMax/
p10=Ограничители.Ток возбуждения/RAM:Iexc,RAM:IexcLimMax,RAM:IexcLimMin,FLASH:fIexcMin,FLASH:fIexcMax,FLASH:fIexcForce,FLASH:Iref_i2t_R_limit,FLASH:i2tOV_OFF_R,FLASH:i2tOV_ON_R,FLASH:Ti2tR/
p11=Ограничители.Напряжение/RAM:Ustat,RAM:Usgz,RAM:UstStC,FLASH:UstLmax,FLASH:UstLmin/
p12=Ограничители.Реактивная мощность/RAM:Qsg,RAM:Qoe,RAM:QLimMin,RAM:QLimMax,FLASH:Pnom,FLASH:QminP0,FLASH:QminP1,FLASH:QmaxP0,FLASH:QmaxP1,FLASH:dQmin,FLASH:QminAsyncTime/
p13=Начальное возбуждение/FLASH:IexcTest,FLASH:fIexcStart,FLASH:dIz,FLASH:zUs,FLASH:UstNom,FLASH:UstStart,FLASH:FltUpVoltageTime/
p14=Контроль напряжения статора/RAM:Ustat,RAM:UstLow,RAM:UstFail,FLASH:UstNom,FLASH:UstLowReset,FLASH:UstLowSet,FLASH:UstFailReset,FLASH:UstFailSet/
p15=Коэффициенты регулятора/FLASH:KUst,FLASH:KIexc,FLASH:Ti,CD:TfUstat,CD:TfIload,CD:TfFi/
p16=Изоляция/RAM:RINSL,RAM:R_INSL_LOW,RAM:R_INSL_FLT,FLASH:RInslLow,FLASH:RInslFlt,FLASH:RInslUp,FLASH:RInslFltEnable/

*/