import { _decorator, Component, Node, random, Vec3 } from 'cc';
import { Enemy } from '../object/enemy/Enemy';
import { GameConstant, PoolType } from '../GameConstant';
import SimplePool from '../Pool/SimplePool';
import { PoolMember } from '../Pool/PoolMember';
import Utilities from '../helper/Utilities';
import { Grass } from '../object/Terrarian/Grass';
import { levelManager } from './levelManager';
const { ccclass, property } = _decorator;

class Line {
    public poolmembers: PoolMember[];

    public despawnLine(){

        this.poolmembers.forEach(element => {
            SimplePool.despawn(element);
        });
    }
}

@ccclass('lineManager')
export class lineManager extends Component {
    //singleton
    private static ins : lineManager;
    public static get Ins(): lineManager 
    {
        return lineManager.ins;
    }
    protected onLoad(): void {
        lineManager.ins = this;
    }
    //--------------------------

    private lines : Line[] = [];

    onInit(){
        this.lines = [];
    }

    spawnGrassLine(pos : Vec3 , direction: number){
        if(this.lines.length > 20) {
            const removedLine = this.lines.shift();
            removedLine.despawnLine(); // Loại bỏ và thu hồi các đối tượng trong đối tượng Line bị loại bỏ.
        }
        const newLine = new Line();
        newLine.poolmembers = [];
    
        const linePos = pos.clone();
        const line = SimplePool.spawn(PoolType.Grass, linePos, 0);
        newLine.poolmembers.push(line);
        
        //đổi màu cỏ
        const grass = line.getComponent(Grass)
        if(direction == -1) grass.changeColor();

        //spawn cây
        linePos.y = 1.5;
            //biên trái
        linePos.z = -15 + Utilities.randomWithStep(0,5,5);
        let tree = SimplePool.spawn(PoolType.Tree, linePos, 0);
        newLine.poolmembers.push(tree);
            //biên phải
        linePos.z = 45 - Utilities.randomWithStep(0,5,5);
        tree = SimplePool.spawn(PoolType.Tree, linePos, 0);
        newLine.poolmembers.push(tree);
            //ở giữa
        
        const treeNumber = Utilities.random(1,3);
        for(let i = 0; i < treeNumber; i++){
            linePos.z = Utilities.randomWithStep(-25,35,5);
            tree = SimplePool.spawn(PoolType.Tree, linePos, 0);
            newLine.poolmembers.push(tree);
        }

        //spawn đá
        linePos.y = 0;
        const rockNumber = Utilities.random(0,1);
        for(let i = 0; i < rockNumber; i++){
            linePos.z = Utilities.randomWithStep(-25,35,5);
            tree = SimplePool.spawn(PoolType.Rock, linePos, 0);
            newLine.poolmembers.push(tree);
        }

        //spawn táo
        const appleNumber = Utilities.random(0,2);
        for(let i = 0; i < appleNumber; i++){
            linePos.z = Utilities.randomWithStep(-25,35,3);
            tree = SimplePool.spawn(PoolType.Apple, linePos, 0);
            newLine.poolmembers.push(tree);
        }
    }

    public spawnLine(lineType: PoolType, vehicleType: {vehicle : PoolType, number : number}[], direction: number, pos: Vec3){

        if(this.lines.length > 20) {
            const removedLine = this.lines.shift();
            removedLine.despawnLine(); // Loại bỏ và thu hồi các đối tượng trong đối tượng Line bị loại bỏ.
        }
        
        // Sinh ra đối tượng Line mới và thêm các đối tượng vào nó
        const newLine = new Line();
        newLine.poolmembers = [];

    
        const linePos = pos.clone();
        const line = SimplePool.spawn(lineType, linePos, 0);
        newLine.poolmembers.push(line);
        
        const score = levelManager.Ins.getScore();
        const deltaSpeed = Utilities.random(-2+ score/100,2 + score/100);

        linePos.z = -direction * (GameConstant.Line_lenght/2);

        const vehicle = this.getRandomElementFromArray(vehicleType);
        const enemy = SimplePool.spawnT<Enemy>(vehicle.vehicle, linePos, 0);
        enemy.onInit(direction, deltaSpeed);
        newLine.poolmembers.push(enemy); 
    
        const vehicleNumber = vehicle.number;
        for(let i = 1; i < vehicleNumber; i++){
            linePos.z += (GameConstant.Line_lenght/vehicleNumber) * direction;
            const nextEnemy = SimplePool.spawnT<Enemy>(vehicle.vehicle, linePos, 0);
            nextEnemy.onInit(direction, deltaSpeed);
            newLine.poolmembers.push(nextEnemy);
        }
    
        // Thêm đối tượng Line vào mảng lines
        this.lines.push(newLine);
    }

    public randomLine() {
        const randType = Utilities.random(1,3);
        switch (randType) {
            case 1:
                return {
                    lineType: PoolType.Road, 
                    vehicleType: 
                    [
                        {
                            vehicle: PoolType.Car,
                            number: Utilities.random(2,4)
                        }, 
                        {
                            vehicle: PoolType.Truck,
                            number: Utilities.random(1,2)
                        }
                    ], 
                    lineNumber: Utilities.random(1,3)
                }
                break;
            case 2:
                return {
                    lineType: PoolType.Track, 
                    vehicleType: [
                        {
                            vehicle: PoolType.Train,
                            number: 1
                        }
                    ], 
                    lineNumber: Utilities.random(1,2)}
                break;
            case 3:
                return {
                    lineType: PoolType.River, 
                    vehicleType: [
                        {
                            vehicle: PoolType.Log,
                            number: Utilities.random(3,6)
                        }
                    ], 
                    lineNumber: Utilities.random(1,3)
                }
                break;
            default:
                break;
        }
    }

    getRandomElementFromArray<T>(array: T[]): T | undefined {
        if (array.length === 0) {
            return undefined; // Trả về undefined nếu mảng rỗng
        }
    
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}


