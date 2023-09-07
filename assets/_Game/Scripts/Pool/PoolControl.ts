import { _decorator, ccenum, CCInteger, Component, Enum, Node, Prefab } from 'cc';
import { PoolMember } from './PoolMember';
import SimplePool from './SimplePool';
import { PoolAmount } from './PoolAmount';
const {ccclass, property, inspector} = _decorator;


@ccclass
export default class PoolControl extends Component {

    @property({
        type: Array(PoolAmount),
        displayName: "Custom Objects",
        serializable: true,
    })
    @property(Node)
    pools: PoolAmount[] = [];

    onLoad () {
        
        
        for (let i = 0; i < this.pools.length; i++){
            // console.log(this.pools[i]);
            
            SimplePool.preload(this.pools[i].prefab, this.pools[i].root, this.pools[i].amount);
        }
    }

}


