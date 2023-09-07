import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    //singleton
    private static ins: UIManager;
    public static get Ins() : UIManager
    {
        return UIManager.ins;
    }

    protected onLoad(): void {
        UIManager.ins = this;

        for(let i = 0; i < this.prefabs.length; i++){
            this.roots[i] = new Node();
            this.roots[i].setParent(this.node);
        }

    }
    //--------------------------------

    prefabs: Node[] = [];
    
    roots: Node[] = [];
    
    @property([Node])
    canvas: Node[] = [];

    public onOpen(index: number ){
        if(this.canvas[index] == null) {
            this.canvas[index] = instantiate(this.prefabs[index]);
            this.canvas[index].setParent(this.roots[index]);
        }

        this.canvas[index].active = true;
    }

    //close theo index
    public onClose(index: number){
        if(this.canvas[index] != null){
            this.canvas[index].active = false;
        }
    }

    public closeAll(){
        for(let i = 0; i < this.canvas.length; i++) this.onClose(i);
    }
}


