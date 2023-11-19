export class Computadores {
  private _categoria!: string;
  private _processador!: string;
  private _placaVideo!: string;
  private _memoriaRam!: string;
  private _armazenamento!: number;
  private _id!: string;
  private _downloadURL!: any;
  private _cor: Boolean = false;

  constructor(categoria: string, proceessador: string) {
    this._categoria = categoria;
    this._processador = proceessador;
  }

  public get categoria(): string {
    return this._categoria;
  }
  public set categoria(value: string) {
    this._categoria = value;
  }

  public get processador(): string {
    return this._processador;
  }
  public set processador(value: string) {
    this._processador = value;
  }

  public get placaVideo(): string {
    return this._placaVideo;
  }
  public set placaVideo(value: string) {
    this._placaVideo = value;
  }

  public get memoriaRam(): string {
    return this._memoriaRam;
  }
  public set memoriaRam(value: string) {
    this._memoriaRam = value;
  }

  public get armazenamento(): number {
    return this._armazenamento;
  }
  public set armazenamento(value: number) {
    this._armazenamento = value;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get downloadURL(): any {
    return this._downloadURL;
  }
  public set downloadURL(value: any) {
    this._downloadURL = value;
  }

  public get cor(): Boolean {
    return this._cor;
  }
  public set cor(value: Boolean) {
    this._cor = value;
  }
}
