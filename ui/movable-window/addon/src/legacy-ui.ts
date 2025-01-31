const LegacyFrame = CreateFrame("Frame", "LegacyFrame", UIParent);
LegacyFrame.SetSize(1280, 768);
LegacyFrame.SetPoint("CENTER", UIParent, "CENTER");
LegacyFrame.SetBackdrop({
    bgFile: "Interface/Tooltips/UI-Tooltip-Background",
    tile: true,
    tileSize: 16,
    insets: { left: 0, right: 0, top: 0, bottom: 0 }
});
LegacyFrame.SetBackdropColor(0.6, 1, 0.6, 0);
LegacyFrame.SetMovable(true);
LegacyFrame.Show();



    const LegacyFrame_TitleBar = CreateFrame("Frame", undefined, LegacyFrame);
    LegacyFrame_TitleBar.SetSize(LegacyFrame.GetWidth() - 52, 24);
    LegacyFrame_TitleBar.SetPoint("TOP", LegacyFrame, "TOP");
    LegacyFrame_TitleBar.SetBackdrop({
        bgFile: "Interface/Tooltips/UI-Tooltip-Background",
        edgeFile: "Interface/Tooltips/UI-Tooltip-Border",
        edgeSize: 16,
        tile: true,
        tileSize: 16,
        insets: { left: 4, right: 4, top: 4, bottom: 4 }
    });
    LegacyFrame_TitleBar.SetBackdropColor(0.1, 0.1, 0.1, 1);
    LegacyFrame_TitleBar.EnableMouse(true);
    LegacyFrame_TitleBar.RegisterForDrag("LeftButton");
    LegacyFrame_TitleBar.SetScript("OnDragStart", function(frame: WoWAPI.Frame, button: WoWAPI.MouseButton) {
        LegacyFrame.StartMoving();
    });
    LegacyFrame_TitleBar.SetScript("OnDragStop", function(frame: WoWAPI.Frame) {
        LegacyFrame.StopMovingOrSizing();
    });

        const LegacyFrame_TitleBar_Text = LegacyFrame_TitleBar.CreateFontString(undefined, "OVERLAY", "GameFontNormal");
        LegacyFrame_TitleBar_Text.SetPoint("CENTER", LegacyFrame_TitleBar, "CENTER", 0, 0);
        LegacyFrame_TitleBar_Text.SetText("My Custom UI Frame");



    const LegacyFrame_ButtonBar = CreateFrame("Frame", undefined, LegacyFrame);
    LegacyFrame_ButtonBar.SetSize(25, 24);
    LegacyFrame_ButtonBar.SetPoint("TOPRIGHT", LegacyFrame, "TOPRIGHT");
    LegacyFrame_ButtonBar.SetBackdrop({
        bgFile: "Interface/Tooltips/UI-Tooltip-Background",
        edgeFile: "Interface/Tooltips/UI-Tooltip-Border",
        edgeSize: 16,
        tile: true,
        tileSize: 16,
        insets: { left: 4, right: 4, top: 4, bottom: 4 }
    });
    LegacyFrame_ButtonBar.SetBackdropColor(0.1, 0.1, 0.1, 1);

        const LegacyFrame_ButtonBar_CloseButton = CreateFrame("Button", undefined, LegacyFrame_ButtonBar, "UIPanelCloseButton");
        LegacyFrame_ButtonBar_CloseButton.SetPoint("CENTER", LegacyFrame_ButtonBar, "CENTER");
        LegacyFrame_ButtonBar_CloseButton.SetScript("OnClick", function(frame: WoWAPI.Frame, button: WoWAPI.MouseButton, down: boolean) {
            LegacyFrame.Hide();
        });



    const LegacyFrame_ButtonBar2 = CreateFrame("Frame", undefined, LegacyFrame);
    LegacyFrame_ButtonBar2.SetSize(25, 24);
    LegacyFrame_ButtonBar2.SetPoint("TOPLEFT", LegacyFrame, "TOPLEFT");
    LegacyFrame_ButtonBar2.SetBackdrop({
        bgFile: "Interface/Tooltips/UI-Tooltip-Background",
        edgeFile: "Interface/Tooltips/UI-Tooltip-Border",
        edgeSize: 16,
        tile: true,
        tileSize: 16,
        insets: { left: 4, right: 4, top: 4, bottom: 4 }
    });
    LegacyFrame_ButtonBar2.SetBackdropColor(0.1, 0.1, 0.1, 1);

        const LegacyFrame_ButtonBar_ResizeButton = CreateFrame("Button", undefined, LegacyFrame_ButtonBar2, "UIPanelScrollDownButtonTemplate");
        LegacyFrame_ButtonBar_ResizeButton.SetPoint("CENTER", LegacyFrame_ButtonBar2, "CENTER");
        let LegacyFrame_ButtonBar_ResizeButton_State = 0;
        LegacyFrame_ButtonBar_ResizeButton.SetScript("OnClick", function(frame: WoWAPI.Frame, button: WoWAPI.MouseButton, down: boolean) {
            if ( LegacyFrame_ButtonBar_ResizeButton_State === 0 ) {
                LegacyFrame.SetScale(0.8);
                LegacyFrame_ButtonBar_ResizeButton_State = 1;
            } else {
                LegacyFrame.SetScale(1);
                LegacyFrame_ButtonBar_ResizeButton_State = 0;
            }
        });


    
    const LegacyFrame_ContentFrame = CreateFrame("Frame", undefined, LegacyFrame);
    LegacyFrame_ContentFrame.SetSize(LegacyFrame.GetWidth(), LegacyFrame.GetHeight() - 24);
    LegacyFrame_ContentFrame.SetPoint("TOP", LegacyFrame, "TOP", 0, -24);
    LegacyFrame_ContentFrame.SetBackdrop({
        bgFile: "Interface/Tooltips/UI-Tooltip-Background",
        edgeFile: "Interface/Tooltips/UI-Tooltip-Border",
        edgeSize: 16,
        tile: true,
        tileSize: 16,
        insets: { left: 4, right: 4, top: 4, bottom: 4 }
    });
    LegacyFrame_ContentFrame.SetBackdropColor(0.1, 0.1, 0.1, 1);