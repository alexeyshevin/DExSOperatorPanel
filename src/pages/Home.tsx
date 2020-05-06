import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {observable, autorun} from 'mobx'
import {devicesValueStore} from '../store/devices/devices'
import {devicesInfoStore} from '../store/devices/devicesinfo'
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
  private svgComponents: Array<TSVGComponent> = [];

  constructor (props: any){
    super(props)
    autorun(()=>{this.putValuesToSVGTemplate(devicesValueStore.changeTime)})
  }

  private putValuesToSVGTemplate(changed: any){
    this.svgComponents.forEach((item: TSVGComponent) => {
      let value: TSVGComponentArg = {
          value: devicesInfoStore.getTagValue(item.Tag),//devicesValueStore.getTagData(`U1>U1:RAM>data>${item.Tag}`),
          valid: true
        }
      item.setState(value);
      item.draw();
    })
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
        <object className="mt-1" id="vteg" type="image/svg+xml"
            data={MotorSVG}
            onLoad={()=>{this.handleImageLoaded()}}
            > {/*width="100%" height="100%"*/}
        </object>	      
      </>
    )
  }
}