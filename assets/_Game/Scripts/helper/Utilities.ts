import { Component, Vec2, Vec3, _decorator, v2, v3 } from "cc";

const {ccclass, property} =_decorator;

@ccclass
export default class Utilities extends Component {

    //chuyen vector 3 sang vector 2
    public static vec3ToVec2(v: Vec3): Vec2{
        return v2(v.x, v.y)
    }

    //chuyen vector 2 sang vector 3
    public static vec2ToVec3(v: Vec2): Vec3{
        return v3(v.x, v.y, 0);
    }

    public static radianToDegree(ra: number){
        return ra*180/Math.PI;
    }
    public static degreeToRadian(de: number){
        return de*Math.PI/180;
    }

    static random(min : number, max : number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    
    static randomWithStep(min: number, max: number, step: number): number {
        const range = (max - min) / step;
        const randomValue = Math.floor(Math.random() * (range + 1)) * step + min;
        return randomValue;
    }
}