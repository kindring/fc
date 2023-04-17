import wol from "wake_on_lan"

export function openPc(mac: string){
    wol.wake(mac);
}


