const targetResourceFrame = CreateFrame("Frame", "TargetResourceFrame", UIParent);
targetResourceFrame.Hide();
targetResourceFrame.SetSize(190, 95);
targetResourceFrame.SetPoint("LEFT", TargetFrame, "LEFT", 200, -4);

targetResourceFrame.SetBackdrop({
    bgFile: "Interface\\Buttons\\WHITE8x8",
    insets: { left: 0, right: 0, top: 0, bottom: 0 }
});
targetResourceFrame.SetBackdropColor(0, 0, 0, 0.2);



const targetResourceText = targetResourceFrame.CreateFontString("ResourceText", "OVERLAY", "GameFontNormal");
targetResourceText.SetJustifyH("LEFT");
targetResourceText.SetPoint("TOPLEFT", targetResourceFrame, "TOPLEFT", 5, -5);



targetResourceFrame.RegisterEvent("UNIT_TARGET");
targetResourceFrame.RegisterEvent("UNIT_POWER");
targetResourceFrame.RegisterEvent("UNIT_RUNIC_POWER");
targetResourceFrame.RegisterEvent("UNIT_SPELLCAST_SUCCEEDED");



targetResourceFrame.SetScript("OnEvent", (self, event) => {
    UpdateTargetResourceFrame();
});



// Helper functions.



function UpdateTargetResourceFrame() {
   
    if ( UnitExists("target") ) {
        
        targetResourceText.SetText(
            "Target Resources\r\n" +
            "- Mana: " + UnitPower("target", 0) + "\r\n" +
            "- Rage: " + UnitPower("target", 1) + "\r\n" +
            "- Focus: " + UnitPower("target", 2) + "\r\n" +
            "- Energy: " + UnitPower("target", 3) + "\r\n" +
            "- ComboPoints: " + UnitPower("target", 4) + "\r\n" +
            "- RunicPower: " + UnitPower("target", 6)
        );

        targetResourceFrame.Show();

    }
    
    else {
        targetResourceFrame.Hide();
    }

}