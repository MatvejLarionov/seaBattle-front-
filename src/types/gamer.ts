import { GameStage, Status } from "./enums";
import type { User } from "./User";

export default class Gamer {
  constructor(
    private _login: string,
    private _avatar: string,
    private _status: Status,
    private _gameStage: GameStage,
    private _isStep: boolean = false,
    private _numberOfHits: number = 0,
    private _numberOfMisses: number = 0,
    private _isWinner: boolean = false
  ) { }
  get login(): string {
    return this._login
  }
  set login(value: string) {
    this._login = value
  }
  get avatar(): string {
    return this._avatar
  }
  set avatar(value: string) {
    this._avatar = value
  }
  get status(): Status {
    return this._status
  }
  set status(value: Status) {
    this._status = value
  }
  get gameStage(): GameStage {
    return this._gameStage
  }
  set gameStage(value: GameStage) {
    this._gameStage = value
  }
  get isStep(): boolean {
    return this._isStep
  }
  set isStep(value: boolean) {
    this._isStep = value
  }
  get numberOfHits(): number {
    return this._numberOfHits
  }
  set numberOfHits(value: number) {
    this._numberOfHits = value
  }
  get numberOfMisses(): number {
    return this._numberOfMisses
  }
  set numberOfMisses(value: number) {
    this._numberOfMisses = value
  }
  get isWinner(): boolean {
    return this._isWinner
  }
  set isWinner(value: boolean) {
    this._isWinner = value
  }
  toUser(): User {
    return { login: this.login, avatar: this.avatar, id: "" }
  }
}