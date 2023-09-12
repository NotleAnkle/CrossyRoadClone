import { _decorator, Color, Component, Material, MeshRenderer, Node } from 'cc';
import { Ground } from './Ground';
const { ccclass, property } = _decorator;

@ccclass('Grass')
export class Grass extends Ground {
    
    @property(Material)
    defaultMaterial: Material = null;

    @property(Material)
    material: Material = null;

    @property(MeshRenderer)
    render: MeshRenderer = null;

    public OnInit(): void {
        super.OnInit();        
        if (this.defaultMaterial && this.render) {
            // Thiết lập material mới cho MeshRenderer
            this.render.setMaterial(this.defaultMaterial, 0);
        }
    }

    changeColor(){
        if (this.material && this.render) {
            // Thiết lập material mới cho MeshRenderer
            this.render.setMaterial(this.material, 0);
        }
    }

    
}


