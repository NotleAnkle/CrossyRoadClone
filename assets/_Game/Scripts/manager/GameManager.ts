import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum GameState{
    Menu = 0,
    Playing = 1,
    Pause = 2,
    End = 3
}

@ccclass('GameManager')
export class GameManager extends Component {
    //singleton
    private static ins: GameManager;
    public static get Ins(): GameManager {
        return GameManager.ins;
    }
    protected onLoad(): void {
        GameManager.ins = this;
    }

    private state: GameState;

    public getState(){
        return this.state;
    }
    
    public changeState(state: GameState){
        this.state = state;
    }

    public isState(state : GameState){
        return (state === this.state);
    }
}


