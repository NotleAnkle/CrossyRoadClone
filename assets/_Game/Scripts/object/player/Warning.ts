import { _decorator, Color, Component, Material, MeshRenderer, Node, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Warning')
export class Warning extends Component {

    private curCd: number = 0;
    private Cd: number = 0.2;

    @property(MeshRenderer)
    render: MeshRenderer

    protected start(): void {
        this.onPause();
    }

    onStart(){
        this.Cd = 0.2;
    }

    onPause(){
        this.Cd = 0;
    }

    protected update(dt: number): void {
        this.curCd += dt;
        if(this.curCd < this.Cd){
            this.render.enabled = true;
        }
        else{
            this.render.enabled = false;
            if(this.curCd >= this.Cd*2) this.curCd = 0;
        }
    }
}


