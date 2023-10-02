import { _decorator, Component, director, Label, Node, Vec3 } from 'cc';
import { Enemy } from '../object/enemy/Enemy';
import { PlayerController } from '../object/player/PlayerController';
import { UIManager } from './UIManager';
import SimplePool from '../Pool/SimplePool';
import { PoolType } from '../GameConstant';
import {lineManager } from './lineManager';
import Utilities from '../helper/Utilities';
import { HightScoreLine } from '../object/Terrarian/HightScoreLine';
import { GameManager, GameState } from './GameManager';
import { Eagle } from '../object/Terrarian/Eagle';
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

    @property(Label)
    public scoreText: Label = null;

    @property(HightScoreLine)
    hsline: HightScoreLine;

    @property(Node)
    eagle: Node

    protected start(): void {
        this.onInit();
        UIManager.Ins.onOpen(0);
    }

    private curPos = new Vec3();

    private lineNumber: number = Utilities.random(1,3);
    private lineType : {
        lineType: PoolType,
        vehicleType: {vehicle : PoolType, number : number}[],
        lineNumber: number
    };
    private lastLineType: PoolType;
    private lineDir: number = 1;
    private grassColor: number = 1;

    private score: number = 0;

    onInit(){
        this.curPos.set(-10,0,0);

        this.score = 0;
        this.scoreText.string = this.score.toString();

        this.hsline.onInit();

        this.lineType = lineManager.Ins.randomLine();
        this.lineNumber = -1;
        this.lineType.lineType = PoolType.Grass;
        
        for(let i = 0; i < 18; i++){
            this.nextLine();
        }
    }

    increasingScore(){
        this.score++;
        this.scoreText.string = this.score.toString();
        this.nextLine();
    }

    getScore(){
        return this.score;
    }

    nextLine(){
        if(this.lineNumber <= 0){
            if(this.lineType.lineType == PoolType.Grass){
                let type = lineManager.Ins.randomLine();
                while(type.lineType == this.lastLineType){
                    type = lineManager.Ins.randomLine();
                }
                
                this.lastLineType = type.lineType;
                this.lineType = type;
                this.lineNumber = this.lineType.lineNumber;    
            }
            else{
                this.lineType.lineType = PoolType.Grass;
                this.lineNumber = Utilities.random(1 - this.score/10,2 - this.score/10);
            }
        }
        
        this.spawnLine();
    }

    spawnLine(){
        if(this.lineType.lineType != PoolType.Grass){
            if(this.lineType.lineType == PoolType.River && this.lineNumber == 3){
                const type = this.lineType.vehicleType;
                this.lineType.vehicleType = [{
                    vehicle: PoolType.LotusLeaf,
                    number: Utilities.random(4,7)
                }];
                lineManager.Ins.spawnLine(this.lineType.lineType, this.lineType.vehicleType, this.lineDir, this.curPos); 
                this.lineType.vehicleType = type;
            }
            else lineManager.Ins.spawnLine(this.lineType.lineType, this.lineType.vehicleType, this.lineDir, this.curPos); 
        }
        else {
            lineManager.Ins.spawnGrassLine(this.curPos, this.grassColor);
            this.grassColor *= -1;
        }
        this.curPos.x += 5;
        this.lineNumber--;
        this.lineDir *= -1;
        if(this.lineType.lineType == PoolType.Road) this.lineDir *= Utilities.randomWithStep(-1,1,2);
    }

    onStart(){
        this.player.onStart();
        UIManager.Ins.onClose(0);
        GameManager.Ins.changeState(GameState.Playing)
    }

    onReSet(){
        UIManager.Ins.closeAll();
        SimplePool.collectAll();
        lineManager.Ins.onInit();
        this.player.node.active = true;
        this.player.onInit();
        this.player.onStart();
        this.onInit();
        GameManager.Ins.changeState(GameState.Playing)
    }

    onEndByEagle(){
        this.eagle.active= true;
        GameManager.Ins.changeState(GameState.End)

    }

    onEnd(){
        GameManager.Ins.changeState(GameState.End)
        
        const hsc = parseInt(localStorage.getItem("score"));
        if(hsc > this.score){
            UIManager.Ins.onOpen(1);
        }
        else{
            UIManager.Ins.onOpen(2);
            localStorage.setItem("score", this.score.toString());
        }
    }
}


