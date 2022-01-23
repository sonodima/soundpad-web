import net from "net";
import { type } from "os";

import xml from "xml2js";

type NativeSound = {
  index: number;
  url: string;
  artist: string;
  title: string;
  duration: string;
  addedOn: string;
  lastPlayedOn: string;
  playCount: number;
};

type NativeSoundParent = {
  $: NativeSound;
};

type NativeSoundlist = {
  Sound: NativeSoundParent[];
};

type SoundlistResponse = {
  Soundlist: NativeSoundlist;
};

class Soundpad {
  private _pipe?: net.Socket;
  connected: boolean;

  constructor() {
    this.connected = false;
  }

  connectAsync(): Promise<boolean> {
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

  private async requestAsync(request: string): Promise<Buffer | undefined> {
    if (!this.connected || this._pipe == undefined) {
      console.error("Pipe is not ready");
      return undefined;
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(undefined), 1000);

      this._pipe?.write(request);
      this._pipe?.once("data", (buffer) => {
        resolve(buffer);
      });
    });
  }

  async getSoundsAsync() {
    const response = await this.requestAsync("GetSoundlist()");
    if (response != undefined) {
      const parsed = (await xml.parseStringPromise(
        response
      )) as SoundlistResponse;

      return parsed.Soundlist.Sound;
    }
  }

  playSound(id: number) {
    this.requestAsync(`DoPlaySound(${id})`);
  }
}

let soundpad = new Soundpad();

export default soundpad;
