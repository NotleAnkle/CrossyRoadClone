import { _decorator, Component, Label, Node } from 'cc';
import { levelManager } from '../manager/levelManager';
const { ccclass, property } = _decorator;

@ccclass('HightScore')
export class HightScore extends Component {
    @property(Label)
    public hightScore: Label;

    private score: string;

    start() {
        this.score = localStorage.getItem("score");
        if(this.score == null) this.score = '0';
    }

    protected onEnable(): void {
        this.hightScore.string = levelManager.Ins.getScore().toString();
    }
}


