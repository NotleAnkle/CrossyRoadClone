import { _decorator, Component, math, Node, tween, Tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FloatingText')
export class FloatingText extends Component {
    private startPos: Vec3;
    private endPos: Vec3;
    start() {
        this.startPos = this.node.getPosition();
        this.endPos = this.node.getPosition();
        this.endPos.y += 3;
        
        // Tạo tween để di chuyển vật thể lên và xuống và lặp lại vô hạn
        tween(this.node)
            .to(1, { position: this.endPos }) // Di chuyển lên
            .to(1, { position: this.startPos }) // Di chuyển xuống
            .union()
            .repeatForever() // Lặp lại vô hạn
            .start(); // Bắt đầu tween

        // console.log("hi1");

        // tween(this.node)
        // .to(10.0, {
        //     position: new Vec3(0, 100, 0),
        // })
        // .start()
        
    }
}


