import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FollowingZ')
export class FollowingZ extends Component {
    @property(Node)
    private target: Node = null;

    private offsetX: number = 0;
    
    private _curPos: Vec3 = new Vec3();
    protected start(): void {
        this.offsetX = this.target.position.x - this.node.position.x;
        this.node.getPosition(this._curPos);
    }

    update(deltaTime: number) {
        this._curPos.x = this.target.position.x - this.offsetX;
        this.node.setPosition(this._curPos);
    }
}


