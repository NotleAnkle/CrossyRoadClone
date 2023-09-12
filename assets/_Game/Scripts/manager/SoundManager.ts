import { _decorator, AudioClip, AudioSource, Component, Enum, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum AudioType {
    None = 0,
    FX_Chicken = 1,
    FX_Chicken_Dead = 2,
    FX_Car_Horn = 3,
    FX_Train_Horn = 4,
    FX_Truck_Horn = 5,
    FX_Train_Passing = 7
}

Enum(AudioType);

@ccclass('SoundManager')
export class SoundManager extends Component {
     //singleton
     private static ins: SoundManager;
     public static get Ins() : SoundManager
     {
         return SoundManager.ins;
     }
 
     protected onLoad(): void {
         SoundManager.ins = this;
     }
     //-----------------------------------------
 
     @property([AudioClip])
     clips: AudioClip[] = [];
 
     private audies: AudioSource[] = [];
 
     protected start(): void {
         for(let i = 0; i < this.clips.length; i++){
             let node = new Node().addComponent(AudioSource);
             node.clip = this.clips[i];
              node.volume = 0.5;
             this.audies.push(node);
            }
        // this.audies[6].volume = 0.2;
        this.audies[6].loop = true;
        this.audies[6].play();
     }
 
     public PlayClip(type: AudioType) {
         // console.log(type);
         // console.log(this.audies.length);
         if(!this.audies[type].playing)
            this.audies[type].play();        
     }
}


