import { _decorator, Component, Node, random, Vec3 } from 'cc';
import { Enemy } from '../object/enemy/Enemy';
import { GameConstant, PoolType } from '../GameConstant';
import SimplePool from '../Pool/SimplePool';
import { PoolMember } from '../Pool/PoolMember';
import Utilities from '../helper/Utilities';
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

    spawnGrassLine(pos : Vec3){
        if(this.lines.length > 20) {
            const removedLine = this.lines.shift();
            removedLine.despawnLine(); // Loại bỏ và thu hồi các đối tượng trong đối tượng Line bị loại bỏ.
        }
        const newLine = new Line();
        newLine.poolmembers = [];
    
        const linePos = pos.clone();
        const line = SimplePool.spawn(PoolType.Grass, linePos, 0);
        newLine.poolmembers.push(line);
    }

    public spawnLine(lineType: PoolType, vehicleType: PoolType, vehicleNumber: number, direction: number, pos: Vec3){

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
        
        const deltaSpeed = Utilities.random(-3,3);

        linePos.z = -direction * (GameConstant.Line_lenght/2);
        const enemy = SimplePool.spawnT<Enemy>(vehicleType, linePos, 0);
        enemy.onInit(direction, deltaSpeed);
        newLine.poolmembers.push(enemy);
    
        for(let i = 1; i < vehicleNumber; i++){
            linePos.z += (GameConstant.Line_lenght/vehicleNumber) * direction;
            const nextEnemy = SimplePool.spawnT<Enemy>(vehicleType, linePos, 0);
            nextEnemy.onInit(direction, deltaSpeed);
            newLine.poolmembers.push(nextEnemy);
        }
    
        // Thêm đối tượng Line vào mảng lines
        this.lines.push(newLine);
    }

    public randomLine() {
        const randType = Utilities.random(0,4);
        switch (randType) {
            case 0:
                return {lineType: PoolType.Grass}
                break;
            case 1:
                return {lineType: PoolType.Road, vehicleType: PoolType.Car, number: Utilities.random(2,5)}
                break;
            case 2:
                return {lineType: PoolType.Road, vehicleType: PoolType.Truck, number: Utilities.random(1,2)}
                break;
            case 3:
                return {lineType: PoolType.River, vehicleType: PoolType.Log, number: Utilities.random(1,3)}
                break;
            case 4:
                return {lineType: PoolType.Track, vehicleType: PoolType.Train, number: 1}
                break;
            default:
                break;
        }
    }

    public spawnNextLine(pos : Vec3){
        const type = this.randomLine();

        if(type.lineType == PoolType.Grass) this.spawnGrassLine(pos)
        else {
            this.spawnLine(type.lineType, type.vehicleType, type.number, 1, pos)
        }
    }
}


