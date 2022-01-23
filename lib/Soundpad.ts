import net from "net";

class Soundpad {
  private _pipe?: net.Socket;
  connected: boolean;

  constructor() {
    this.connected = false;
  }

  connect(): Promise<boolean> {
    return new Promise((resolve) => {
      this._pipe = net.createConnection(
        "\\\\.\\pipe\\sp_remote_control",
        () => {
          this.connected = true;
          resolve(true);
        }
      );

      this._pipe.on("error", (error) => {
        this._pipe = undefined;
        this.connected = false;
        console.error(error);
        resolve(false);
      });

      this._pipe.on("close", () => {
        this.connected = false;
        this._pipe = undefined;
      });

      this._pipe.on("end", () => {
        this.connected = false;
        this._pipe = undefined;
      });

      this._pipe.on("timeout", () => {
        this.connected = false;
        this._pipe = undefined;
      });
    });
  }

  private request(request: string) {
    if (this._pipe == undefined) {
      console.error("Pipe is not ready");
      return;
    }

    this._pipe.write(request);
    var response: Buffer = this._pipe.read();

    console.log(response);
  }

  getSounds() {
    const response = this.request("GetSoundlist()");
  }

  playSound(id: number) {
    this.request(`DoPlaySound(${id})`);
  }
}

let soundpad = new Soundpad();

export default soundpad;
