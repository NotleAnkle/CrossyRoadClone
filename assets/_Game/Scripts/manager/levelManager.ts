import { _decorator, Component, director, Node, Vec3 } from 'cc';
import { Enemy } from '../object/enemy/Enemy';
import { PlayerController } from '../object/player/PlayerController';
import { UIManager } from './UIManager';
import SimplePool from '../Pool/SimplePool';
import { PoolType } from '../GameConstant';
import {lineManager } from './lineManager';
const { ccclass, property } = _decorator;

@ccclass('LevelManager')
export class levelManager extends Component {
    //singleton
    private static ins : levelManager;
    public static get Ins(): levelManager 
    {
        return levelManager.ins;
    }
    protected onLoad(): void {
        levelManager.ins = this;
    }
    //--------------------------

    @property(PlayerController)
    public player: PlayerController = null;
    protected start(): void {
        this.onInit();
        UIManager.Ins.onOpen(0);
    }

    private curPos = new Vec3();

    onInit(){
        this.curPos.set(-25,0,0);

        for(let i = 0; i < 3; i++){
            lineManager.Ins.spawnGrassLine(this.curPos);
            this.curPos.x += 5;
        }

        for(let i = 0; i < 15; i++){
            this.nextLine();
        }
    }

    nextLine(){
        lineManager.Ins.spawnNextLine(this.curPos); 
        this.curPos.x += 5;
    }

    onStart(){
        this.player.onStart();
        UIManager.Ins.onClose(0);
    }

    onReSet(){
        UIManager.Ins.closeAll();
        SimplePool.collectAll();
        lineManager.Ins.onInit();
        this.player.onInit();
        this.player.onStart();
        this.onInit();
    }
}


