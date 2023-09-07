import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FollowingCamera')
export class FollowingCamera extends Component {
    @property(Node)
    private target: Node = null;

    private offsetX: number = 0;
    private offsetZ: number = 0;
    
    private _curPos: Vec3 = new Vec3();
    protected start(): void {
        this.offsetX = this.target.position.x - this.node.position.x;
        this.offsetZ = this.target.position.z - this.node.position.z;
        this.node.getPosition(this._curPos);
    }

    update(deltaTime: number) {
        this._curPos.x = this.target.position.x - this.offsetX;
        this._curPos.z = this.target.position.z - this.offsetZ;
        this.node.setPosition(this._curPos);
    }
}


