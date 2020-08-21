import React, {Component} from 'react'
import { Trands } from '../../lib/trands/trands'
import './Trands.css'
import TViewBox from './TViewBox'
import { ITrandProp } from '../../lib/trands/itrand'

interface ITrandsPageState {
  scrollPosition: number;
  deep: number;
}

export default class TrandsPage extends Component<{}, ITrandsPageState> {
    
    constructor (props: any){
        super(props);
        this.state = {
          scrollPosition: 0,
          deep: Trands.Deep
        }
    }

    private changeScrollPosition(e: any) {
      this.setState({scrollPosition: e.target.value});
    }

    private getTrandsBoxes(scrollPosition: number): any{
      return Trands.getBoxes().map((box, index)=>{
        return (
            <TViewBox
              key={index}
              height = {box.Height}
              viewBox = {box}
              scrollPosition = {scrollPosition}
            />
        )
      })
    }

    render() {

        return(
          <>
            <h1>Trands page</h1>
            <div className='Trands wrapper'>
              {this.getTrandsBoxes(this.state.scrollPosition)}
            </div>
            <input type="range"
              className = 'Trands range'
              value={this.state.scrollPosition}
              min="0"
              max={this.state.deep}
              step="1"
              onChange={(e)=>this.changeScrollPosition(e)}/>
          </>
        )
      }
}
/*TODO при выводе в один канвас двух параметров, цвет устанавливается как у последнего,
  а должны быть разные - как прописаны в конфиге
*/ 