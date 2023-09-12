import { _decorator, Component, Enum, Node } from 'cc';
import { PoolType } from '../GameConstant';
const { ccclass, property } = _decorator;

@ccclass('PoolMember')
export class PoolMember extends Component {
    @property({type: PoolType})
    public poolType:  PoolType.None;
    
    public OnInit(){
    }
}


