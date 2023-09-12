import { _decorator, BoxCollider, CCFloat, CCInteger, Collider, Component, director, ICollisionEvent, ITriggerEvent, Node, Vec3 } from 'cc';
import { MovingObject } from './MovingObject';
import { PlayerController } from '../player/PlayerController';
import { AudioType, SoundManager } from '../../manager/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends MovingObject {

    @property(BoxCollider)
    private collider : BoxCollider = null;
    @property({type : AudioType})
    public audioType: AudioType.None;


    start() {
        this.node.getPosition(this._curPos);
        this.collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    onTriggerEnter(event: ITriggerEvent){
        this.playHorn();
    }

    public playHorn(){
        SoundManager.Ins.PlayClip(this.audioType);
    }
}


