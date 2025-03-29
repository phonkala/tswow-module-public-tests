import { std } from "wow/wotlk";



export namespace DisciplinesFrameManager {

    export function init () {

        registerBindings();

    }

    function registerBindings () {

        const BINDING = `
        <!-- BEGIN: modules/disciplines //-->
        <Binding name="TOGGLEDISCIPLINES">
            ToggleDisciplinesFrame();
        </Binding>
        <!-- END: modules/disciplines //-->
        `;

        // Bindings.xml row "<!-- Misc -->" is after UI panel bindings, so let's insert the new binding .before() that line.

        std.LUAXML.file("Interface/FrameXML/Bindings.xml").before("<!-- Misc -->", BINDING);

    }

}