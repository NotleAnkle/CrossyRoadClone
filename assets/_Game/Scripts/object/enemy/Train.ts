import { _decorator, Component, Node } from 'cc';
import { Enemy } from './Enemy';
import { AudioType, SoundManager } from '../../manager/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('Train')
export class Train extends Enemy {
    @property({type: AudioType})
    public passingAudio: AudioType;

    update(deltaTime: number) {
        super.update(deltaTime);
        if(this.node.position.z >=-20  && this.node.position.z <= 20) SoundManager.Ins.PlayClip(this.passingAudio);
    }
}


