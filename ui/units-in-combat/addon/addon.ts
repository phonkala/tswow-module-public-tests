const unitsInCombatFrame = CreateFrame("Frame", "UnitsInCombatFrame", UIParent);
unitsInCombatFrame.Show();
unitsInCombatFrame.SetSize(418, 200);
unitsInCombatFrame.SetPoint("LEFT", PlayerFrame, "LEFT", 40, -220);

unitsInCombatFrame.SetBackdrop({
    bgFile: "Interface\\Buttons\\WHITE8x8",
    insets: { left: 0, right: 0, top: 0, bottom: 0 }
});
unitsInCombatFrame.SetBackdropColor(0, 0, 0, 0.2);



enableFrameDrag(unitsInCombatFrame, "LeftButton");



const unitsInCombatText = unitsInCombatFrame.CreateFontString("UnitsInCombatText", "OVERLAY", "GameFontNormal");
unitsInCombatText.SetJustifyH("LEFT");
unitsInCombatText.SetPoint("TOPLEFT", unitsInCombatFrame, "TOPLEFT", 5, -5);
unitsInCombatText.SetText("Units In Combat");



OnCustomPacket(50, (packet) => {
    unitsInCombatText.SetText(
        "Units in Combat\r\n" +
        packet.ReadString()
    );
});



// Helper functions.



function enableFrameDrag (frame: WoWAPI.Frame, button: WoWAPI.MouseButton,) {

    frame.SetMovable(true);
    frame.EnableMouse(true);
    frame.RegisterForDrag(button);
    
    frame.SetScript("OnMouseDown", function(self: WoWAPI.Frame, button: WoWAPI.MouseButton) {
        if ( button === "LeftButton" ) {
            self.StartMoving();
        }
    });
    
    frame.SetScript("OnMouseUp", function(self) {
        self.StopMovingOrSizing();
    });

}
