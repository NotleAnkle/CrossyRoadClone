import { CCInteger, Prefab, _decorator, Node, Component } from "cc";
import { PoolMember } from "./PoolMember";

const {ccclass, property, inspector} = _decorator;

@ccclass
export class PoolAmount extends Component {
    @property(Node)
    public root: Node = null;

    @property(Prefab)
    public prefab: PoolMember = null;

    @property(CCInteger)
    amount = 0;
}