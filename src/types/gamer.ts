import { GameStage, Status } from "./enums";
import type { User } from "./User";

export default class Gamer {
  constructor(
    private _login: string,
    private _avatar: string,
    private _status: Status,
    private _gameStage: GameStage,
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
  toUser(): User {
    return { login: this.login, avatar: this.avatar, id: "" }
  }
}