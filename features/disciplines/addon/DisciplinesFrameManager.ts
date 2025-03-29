import { DisciplinesFrame } from "./Interface/DisciplinesFrame";



export namespace DisciplinesFrameManager {

    export function init () {

        DisciplinesFrame.init();

        registerGlobalFunctions();

    }

    function registerGlobalFunctions () {

        globalThis.ToggleDisciplinesFrame = function () {
            DisciplinesFrame.toggle();
        }

    }

}