import { CUSTOM_PACKET_DISCIPLINE_INFO_OPCODE, CustomPacketDisciplineInfo } from "../../shared/custom-packets/CustomPacketDisciplineInfo";
import { CUSTOM_PACKET_DISCIPLINE_XP_OPCODE, CustomPacketDisciplineXP } from "../../shared/custom-packets/CustomPacketDisciplineXP";

import { DisciplinesFrameUtils } from "../DisciplinesFrameUtils";



export namespace DisciplinesFrame {

    const DEFAULT_MARGIN            = 20;
    const DEFAULT_MARGIN_SMALL      = 1;
    const MAIN_FRAME_WIDTH          = 1000;
    const MAIN_FRAME_HEIGHT         = 750;
    const MAIN_FRAME_OFFSET_Y       = 50;
    const CONTENT_MARGIN_TOP        = 0;
    const CONTENT_MARGIN_BOTTOM     = 20;
    const COLUMN_MARGIN_X_OUTER     = 70;
    const COLUMN_MARGIN_X_INNER     = 10;
    const COLUMN_WIDTH              = MAIN_FRAME_WIDTH / 2;
    const COLUMN_PADDING_Y          = 30;
    const COLUMN_PADDING_LEFT_X     = 50;
    const COLUMN_PADDING_RIGHT_X    = 30;
    const LAYOUT_COLOR_BG           = [0.1, 0.1, 0.1, 0.0] as const;
    const LAYOUT_COLOR_FG           = [1.0, 1.0, 1.0, 0.0] as const;
    const LAYOUT_COLOR_TEXT         = [0.3, 0.1, 0.0, 0.8] as const;

    let mainFrame: WoWAPI.Frame;

    // TODO: Add a DisciplinesFrameTooltipManager.
    let activeTooltipFrame: WoWAPI.Frame;
    let activeTooltipDisciplineID;

    let disciplines: {
        [ID: number]: {
            title                   ?: string,
            description             ?: string
            UITitleFrame            ?: WoWAPI.FontString,
            UIButtonFrame           ?: WoWAPI.Frame,
            UIButtonFrameTexture    ?: WoWAPI.Texture
            XP                      ?: number
        }
    } = {};

    let activeDisciplineID: number = 0;


    
    export function init () {

        build();

    }

    function build () {

        if ( mainFrame ) return;

        const disciplinesFrame = CreateFrame("Frame", "DisciplinesFrame", UIParent);
        disciplinesFrame.SetSize(MAIN_FRAME_WIDTH, MAIN_FRAME_HEIGHT);
        disciplinesFrame.SetPoint("CENTER", UIParent, "CENTER", 0, MAIN_FRAME_OFFSET_Y);
        disciplinesFrame.SetMovable(true);
        disciplinesFrame.EnableMouse(true);
        disciplinesFrame.RegisterForDrag("LeftButton");
        disciplinesFrame.SetScript("OnDragStart", function() {
            disciplinesFrame.StartMoving();
            // TODO: Prevent moving DisciplinesFrame outside of viewport, even partially.
            // For example, when DisciplinesFrame topright corner hits or goes past viewport topright corner, stop moving the frame.
        });
        disciplinesFrame.SetScript("OnDragStop", function() {
            disciplinesFrame.StopMovingOrSizing();
        });
        disciplinesFrame.Hide();

        const disciplinesFrame_bg = disciplinesFrame.CreateTexture(undefined, "BACKGROUND");
        disciplinesFrame_bg.SetAllPoints(disciplinesFrame);
        disciplinesFrame_bg.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_bg");
        disciplinesFrame_bg.SetTexCoord(0, 1, 0.1, 0.9);



            const disciplinesFrame_buttonBar = CreateFrame("Frame", undefined, disciplinesFrame);
            disciplinesFrame_buttonBar.SetSize(65, 26);
            disciplinesFrame_buttonBar.SetPoint("TOPRIGHT", disciplinesFrame, "TOPRIGHT", -40, -20);

                

                const disciplinesFrame_buttonBar_scaleButton = CreateFrame("Button", undefined, disciplinesFrame_buttonBar, "UIPanelCloseButton");
                disciplinesFrame_buttonBar_scaleButton.SetNormalTexture("Interface\\Buttons\\UI-Panel-SmallerButton-Up");
                disciplinesFrame_buttonBar_scaleButton.SetPushedTexture("Interface\\Buttons\\UI-Panel-SmallerButton-Down");
                disciplinesFrame_buttonBar_scaleButton.SetPoint("LEFT", disciplinesFrame_buttonBar, "LEFT", -2, 0);
                disciplinesFrame_buttonBar_scaleButton.SetScript("OnClick", function() {
                    toggleDisciplinesFrameScale();
                });
                
                const disciplinesFrame_buttonBar_resetButton = CreateFrame("Button", undefined, disciplinesFrame_buttonBar, "UIPanelCloseButton");
                disciplinesFrame_buttonBar_resetButton.SetNormalTexture("Interface\\Buttons\\UI-Panel-ExpandButton-Up");
                disciplinesFrame_buttonBar_resetButton.SetPushedTexture("Interface\\Buttons\\UI-Panel-ExpandButton-Down");
                disciplinesFrame_buttonBar_resetButton.SetPoint("LEFT", disciplinesFrame_buttonBar_scaleButton, "RIGHT", -13, 0);
                disciplinesFrame_buttonBar_resetButton.SetScript("OnClick", function() {
                    resetDisciplinesFrame();
                });

                const disciplinesFrame_buttonBar_closeButton = CreateFrame("Button", undefined, disciplinesFrame_buttonBar, "UIPanelCloseButton");
                disciplinesFrame_buttonBar_closeButton.SetPoint("LEFT", disciplinesFrame_buttonBar_resetButton, "RIGHT", -13, 0);
                disciplinesFrame_buttonBar_closeButton.SetScript("OnClick", function() {
                    toggle();
                });


            
            const disciplinesFrame_contentFrame = CreateFrame("Frame", undefined, disciplinesFrame);
            disciplinesFrame_contentFrame.SetSize(disciplinesFrame.GetWidth(), disciplinesFrame.GetHeight() - CONTENT_MARGIN_TOP - CONTENT_MARGIN_BOTTOM);
            disciplinesFrame_contentFrame.SetPoint("TOP", disciplinesFrame, "TOP", 0, 0 - CONTENT_MARGIN_TOP);
            disciplinesFrame_contentFrame.SetBackdropColor(...LAYOUT_COLOR_BG);


            
                const disciplinesFrame_contentFrame_leftColumn = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame);
                disciplinesFrame_contentFrame_leftColumn.SetSize(COLUMN_WIDTH - COLUMN_MARGIN_X_OUTER - COLUMN_MARGIN_X_INNER, disciplinesFrame_contentFrame.GetHeight() - COLUMN_PADDING_Y * 2);
                disciplinesFrame_contentFrame_leftColumn.SetPoint("LEFT", disciplinesFrame_contentFrame, "LEFT", COLUMN_MARGIN_X_OUTER, 0);
                disciplinesFrame_contentFrame_leftColumn.SetBackdrop({
                    bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                    //edgeFile: "Interface\\Tooltips\\UI-Tooltip-Border",
                    //edgeSize: 16,
                    insets: { left: 0, right: 0, top: 0, bottom: 0 }
                });
                disciplinesFrame_contentFrame_leftColumn.SetBackdropColor(...LAYOUT_COLOR_BG);



                    const disciplinesFrame_abilitiesGrid = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_leftColumn);
                    disciplinesFrame_abilitiesGrid.SetSize(disciplinesFrame_contentFrame_leftColumn.GetWidth() - COLUMN_PADDING_LEFT_X * 2, disciplinesFrame_contentFrame_leftColumn.GetHeight() - 40);
                    disciplinesFrame_abilitiesGrid.SetPoint("TOP", disciplinesFrame_contentFrame_leftColumn, "TOP", 0, -DEFAULT_MARGIN);



                        const disciplinesFrame_abilities_tier4 = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_leftColumn);
                        disciplinesFrame_abilities_tier4.SetSize(disciplinesFrame_abilitiesGrid.GetWidth(), 180);
                        disciplinesFrame_abilities_tier4.SetPoint("TOP", disciplinesFrame_abilitiesGrid, "TOP", 0, 0);



                            const disciplinesFrame_abilities_ability7 = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_leftColumn);
                            disciplinesFrame_abilities_ability7.SetSize(disciplinesFrame_abilities_tier4.GetHeight(), disciplinesFrame_abilities_tier4.GetHeight());
                            disciplinesFrame_abilities_ability7.SetPoint("CENTER", disciplinesFrame_abilities_tier4, "CENTER", 0, 0);
                            disciplinesFrame_abilities_ability7.SetBackdrop({
                                bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                                insets: { left: 0, right: 0, top: 0, bottom: 0 }
                            });
                            disciplinesFrame_abilities_ability7.SetBackdropColor(...LAYOUT_COLOR_FG);



                        const disciplinesFrame_abilities_tier3 = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_leftColumn);
                        disciplinesFrame_abilities_tier3.SetSize(disciplinesFrame_abilitiesGrid.GetWidth(), 155);
                        disciplinesFrame_abilities_tier3.SetPoint("TOP", disciplinesFrame_abilities_tier4, "BOTTOM", 0, -DEFAULT_MARGIN_SMALL * 2);



                            const disciplinesFrame_abilities_ability5 = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_leftColumn);
                            disciplinesFrame_abilities_ability5.SetSize(disciplinesFrame_abilities_tier3.GetWidth() / 2 - DEFAULT_MARGIN_SMALL, disciplinesFrame_abilities_tier3.GetHeight());
                            disciplinesFrame_abilities_ability5.SetPoint("LEFT", disciplinesFrame_abilities_tier3, "LEFT", 0, 0);
                            disciplinesFrame_abilities_ability5.SetBackdrop({
                                bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                                insets: { left: 0, right: 0, top: 0, bottom: 0 }
                            });
                            disciplinesFrame_abilities_ability5.SetBackdropColor(...LAYOUT_COLOR_FG);

                                // FIXME: Temp/test.
                                const disciplinesFrame_abilities_ability5_button = CreateFrame("Button", undefined, disciplinesFrame_abilities_ability5);
                                disciplinesFrame_abilities_ability5_button.SetSize(165, 165);
                                disciplinesFrame_abilities_ability5_button.SetPoint("TOP", disciplinesFrame_abilities_ability5, "TOP", 0, 10);

                                const disciplinesFrame_abilities_ability5_button_texture = disciplinesFrame_abilities_ability5_button.CreateTexture(undefined, "BACKGROUND");
                                disciplinesFrame_abilities_ability5_button_texture.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_ability_bg");
                                disciplinesFrame_abilities_ability5_button_texture.SetAllPoints(disciplinesFrame_abilities_ability5_button);



                            const disciplinesFrame_abilities_ability6 = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_leftColumn);
                            disciplinesFrame_abilities_ability6.SetSize(disciplinesFrame_abilities_tier3.GetWidth() / 2 - DEFAULT_MARGIN_SMALL, disciplinesFrame_abilities_tier3.GetHeight());
                            disciplinesFrame_abilities_ability6.SetPoint("RIGHT", disciplinesFrame_abilities_tier3, "RIGHT", 0, 0);
                            disciplinesFrame_abilities_ability6.SetBackdrop({
                                bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                                insets: { left: 0, right: 0, top: 0, bottom: 0 }
                            });
                            disciplinesFrame_abilities_ability6.SetBackdropColor(...LAYOUT_COLOR_FG);

                                // FIXME: Temp/test.
                                const disciplinesFrame_abilities_ability6_button = CreateFrame("Button", undefined, disciplinesFrame_abilities_ability6);
                                disciplinesFrame_abilities_ability6_button.SetSize(165, 165);
                                disciplinesFrame_abilities_ability6_button.SetPoint("TOP", disciplinesFrame_abilities_ability6, "TOP", 0, 10);

                                const disciplinesFrame_abilities_ability6_button_texture = disciplinesFrame_abilities_ability6_button.CreateTexture(undefined, "BACKGROUND");
                                disciplinesFrame_abilities_ability6_button_texture.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_ability_bg");
                                disciplinesFrame_abilities_ability6_button_texture.SetAllPoints(disciplinesFrame_abilities_ability6_button);



                        const disciplinesFrame_abilities_tier2 = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_leftColumn);
                        disciplinesFrame_abilities_tier2.SetSize(disciplinesFrame_abilitiesGrid.GetWidth(), 155);
                        disciplinesFrame_abilities_tier2.SetPoint("TOP", disciplinesFrame_abilities_tier3, "BOTTOM", 0, -DEFAULT_MARGIN_SMALL * 2);



                            const disciplinesFrame_abilities_ability3 = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_leftColumn);
                            disciplinesFrame_abilities_ability3.SetSize(disciplinesFrame_abilities_tier2.GetWidth() / 2 - DEFAULT_MARGIN_SMALL, disciplinesFrame_abilities_tier2.GetHeight());
                            disciplinesFrame_abilities_ability3.SetPoint("LEFT", disciplinesFrame_abilities_tier2, "LEFT", 0, 0);
                            disciplinesFrame_abilities_ability3.SetBackdrop({
                                bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                                insets: { left: 0, right: 0, top: 0, bottom: 0 }
                            });
                            disciplinesFrame_abilities_ability3.SetBackdropColor(...LAYOUT_COLOR_FG);

                                // FIXME: Temp/test.
                                const disciplinesFrame_abilities_ability3_button = CreateFrame("Button", undefined, disciplinesFrame_abilities_ability3);
                                disciplinesFrame_abilities_ability3_button.SetSize(165, 165);
                                disciplinesFrame_abilities_ability3_button.SetPoint("TOP", disciplinesFrame_abilities_ability3, "TOP", 0, 10);

                                const disciplinesFrame_abilities_ability3_button_texture = disciplinesFrame_abilities_ability3_button.CreateTexture(undefined, "BACKGROUND");
                                disciplinesFrame_abilities_ability3_button_texture.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_ability_bg");
                                disciplinesFrame_abilities_ability3_button_texture.SetAllPoints(disciplinesFrame_abilities_ability3_button);



                            const disciplinesFrame_abilities_ability4 = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_leftColumn);
                            disciplinesFrame_abilities_ability4.SetSize(disciplinesFrame_abilities_tier2.GetWidth() / 2 - DEFAULT_MARGIN_SMALL, disciplinesFrame_abilities_tier2.GetHeight());
                            disciplinesFrame_abilities_ability4.SetPoint("RIGHT", disciplinesFrame_abilities_tier2, "RIGHT", 0, 0);
                            disciplinesFrame_abilities_ability4.SetBackdrop({
                                bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                                insets: { left: 0, right: 0, top: 0, bottom: 0 }
                            });
                            disciplinesFrame_abilities_ability4.SetBackdropColor(...LAYOUT_COLOR_FG);

                                // FIXME: Temp/test.
                                const disciplinesFrame_abilities_ability4_button = CreateFrame("Button", undefined, disciplinesFrame_abilities_ability4);
                                disciplinesFrame_abilities_ability4_button.SetSize(165, 165);
                                disciplinesFrame_abilities_ability4_button.SetPoint("TOP", disciplinesFrame_abilities_ability4, "TOP", 0, 10);

                                const disciplinesFrame_abilities_ability4_button_texture = disciplinesFrame_abilities_ability4_button.CreateTexture(undefined, "BACKGROUND");
                                disciplinesFrame_abilities_ability4_button_texture.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_ability_bg");
                                disciplinesFrame_abilities_ability4_button_texture.SetAllPoints(disciplinesFrame_abilities_ability4_button);



                        const disciplinesFrame_abilities_tier1 = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_leftColumn);
                        disciplinesFrame_abilities_tier1.SetSize(disciplinesFrame_abilitiesGrid.GetWidth(), 140);
                        disciplinesFrame_abilities_tier1.SetPoint("TOP", disciplinesFrame_abilities_tier2, "BOTTOM", 0, -DEFAULT_MARGIN_SMALL * 2);



                            const disciplinesFrame_abilities_ability1 = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_leftColumn);
                            disciplinesFrame_abilities_ability1.SetSize(disciplinesFrame_abilities_tier1.GetWidth() / 2 - DEFAULT_MARGIN_SMALL, disciplinesFrame_abilities_tier1.GetHeight());
                            disciplinesFrame_abilities_ability1.SetPoint("LEFT", disciplinesFrame_abilities_tier1, "LEFT", 0, 0);
                            disciplinesFrame_abilities_ability1.SetBackdrop({
                                bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                                insets: { left: 0, right: 0, top: 0, bottom: 0 }
                            });
                            disciplinesFrame_abilities_ability1.SetBackdropColor(...LAYOUT_COLOR_FG);

                                // FIXME: Temp/test.
                                const disciplinesFrame_abilities_ability1_button = CreateFrame("Button", undefined, disciplinesFrame_abilities_ability1);
                                disciplinesFrame_abilities_ability1_button.SetSize(165, 149);
                                disciplinesFrame_abilities_ability1_button.SetPoint("TOP", disciplinesFrame_abilities_ability1, "TOP", 0, 10);

                                const disciplinesFrame_abilities_ability1_button_texture = disciplinesFrame_abilities_ability1_button.CreateTexture(undefined, "BACKGROUND");
                                disciplinesFrame_abilities_ability1_button_texture.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_ability_bg");
                                disciplinesFrame_abilities_ability1_button_texture.SetAllPoints(disciplinesFrame_abilities_ability1_button);
                                disciplinesFrame_abilities_ability1_button_texture.SetTexCoord(0, 1, 0, 0.88);



                            const disciplinesFrame_abilities_ability2 = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_leftColumn);
                            disciplinesFrame_abilities_ability2.SetSize(disciplinesFrame_abilities_tier1.GetWidth() / 2 - DEFAULT_MARGIN_SMALL, disciplinesFrame_abilities_tier1.GetHeight());
                            disciplinesFrame_abilities_ability2.SetPoint("RIGHT", disciplinesFrame_abilities_tier1, "RIGHT", 0, 0);
                            disciplinesFrame_abilities_ability2.SetBackdrop({
                                bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                                insets: { left: 0, right: 0, top: 0, bottom: 0 }
                            });
                            disciplinesFrame_abilities_ability2.SetBackdropColor(...LAYOUT_COLOR_FG);

                                // FIXME: Temp/test.
                                const disciplinesFrame_abilities_ability2_button = CreateFrame("Button", undefined, disciplinesFrame_abilities_ability2);
                                disciplinesFrame_abilities_ability2_button.SetSize(165, 149);
                                disciplinesFrame_abilities_ability2_button.SetPoint("TOP", disciplinesFrame_abilities_ability2, "TOP", 0, 10);

                                const disciplinesFrame_abilities_ability2_button_texture = disciplinesFrame_abilities_ability2_button.CreateTexture(undefined, "BACKGROUND");
                                disciplinesFrame_abilities_ability2_button_texture.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_ability_bg");
                                disciplinesFrame_abilities_ability2_button_texture.SetAllPoints(disciplinesFrame_abilities_ability2_button);
                                disciplinesFrame_abilities_ability2_button_texture.SetTexCoord(0, 1, 0, 0.88);



                const disciplinesFrame_contentFrame_rightColumn = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame);
                disciplinesFrame_contentFrame_rightColumn.SetSize(COLUMN_WIDTH - COLUMN_MARGIN_X_OUTER - COLUMN_MARGIN_X_INNER, disciplinesFrame_contentFrame.GetHeight() - COLUMN_PADDING_Y * 2);
                disciplinesFrame_contentFrame_rightColumn.SetPoint("RIGHT", disciplinesFrame_contentFrame, "RIGHT", -COLUMN_MARGIN_X_OUTER, 0);
                disciplinesFrame_contentFrame_rightColumn.SetBackdrop({
                    bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                    //edgeFile: "Interface\\Tooltips\\UI-Tooltip-Border",
                    //edgeSize: 16,
                    insets: { left: 0, right: 0, top: 0, bottom: 0 }
                });
                disciplinesFrame_contentFrame_rightColumn.SetBackdropColor(...LAYOUT_COLOR_BG);



                    const disciplinesFrame_mainTitle = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_rightColumn);
                    disciplinesFrame_mainTitle.SetSize(disciplinesFrame_contentFrame_rightColumn.GetWidth() - COLUMN_PADDING_RIGHT_X * 2, 40);
                    disciplinesFrame_mainTitle.SetPoint("TOP", disciplinesFrame_contentFrame_rightColumn, "TOP", 0, -DEFAULT_MARGIN);
                    disciplinesFrame_mainTitle.SetBackdrop({
                        bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                        insets: { left: 0, right: 0, top: 0, bottom: 0 }
                    });
                    disciplinesFrame_mainTitle.SetBackdropColor(...LAYOUT_COLOR_FG);

                        const disciplinesFrame_mainTitle_title = disciplinesFrame_mainTitle.CreateFontString(undefined, "OVERLAY");
                        disciplinesFrame_mainTitle_title.SetPoint("TOP", disciplinesFrame_mainTitle, "TOP", 0, -10);
                        disciplinesFrame_mainTitle_title.SetFont("Fonts\\FRIZQT__.TTF", 30);
                        disciplinesFrame_mainTitle_title.SetTextColor(...LAYOUT_COLOR_TEXT);
                        disciplinesFrame_mainTitle_title.SetText("DISCIPLINES");



                    const disciplinesFrame_disciplinesGrid = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_rightColumn);
                    disciplinesFrame_disciplinesGrid.SetSize(disciplinesFrame_contentFrame_rightColumn.GetWidth() - COLUMN_PADDING_RIGHT_X * 2, 310);
                    disciplinesFrame_disciplinesGrid.SetPoint("TOP", disciplinesFrame_mainTitle, "BOTTOM", 0, -DEFAULT_MARGIN);



                        const disciplinesFrame_disciplines_discipline1 = CreateFrame("Frame", undefined, disciplinesFrame_disciplinesGrid);
                        disciplinesFrame_disciplines_discipline1.SetSize(disciplinesFrame_disciplinesGrid.GetWidth() / 3 - DEFAULT_MARGIN_SMALL, disciplinesFrame_disciplinesGrid.GetHeight() / 2);
                        disciplinesFrame_disciplines_discipline1.SetPoint("TOPLEFT", disciplinesFrame_disciplinesGrid, "TOPLEFT", 0, 0);
                        disciplinesFrame_disciplines_discipline1.SetBackdrop({
                            bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                            insets: { left: 0, right: 0, top: 0, bottom: 0 }
                        });
                        disciplinesFrame_disciplines_discipline1.SetBackdropColor(...LAYOUT_COLOR_FG);

                            const disciplinesFrame_disciplines_discipline1_title = disciplinesFrame_disciplines_discipline1.CreateFontString(undefined, "OVERLAY");
                            disciplinesFrame_disciplines_discipline1_title.SetPoint("TOP", disciplinesFrame_disciplines_discipline1, "TOP", 0, -10);
                            disciplinesFrame_disciplines_discipline1_title.SetFont("Fonts\\FRIZQT__.TTF", 14);
                            disciplinesFrame_disciplines_discipline1_title.SetTextColor(...LAYOUT_COLOR_TEXT);

                            const disciplinesFrame_disciplines_discipline1_button = CreateFrame("Button", undefined, disciplinesFrame_disciplines_discipline1);
                            disciplinesFrame_disciplines_discipline1_button.SetSize(120, 120);
                            disciplinesFrame_disciplines_discipline1_button.SetPoint("TOP", disciplinesFrame_disciplines_discipline1_title, "BOTTOM", 0, -5);

                            const disciplinesFrame_disciplines_discipline1_button_texture = disciplinesFrame_disciplines_discipline1_button.CreateTexture(undefined, "BACKGROUND");
                            disciplinesFrame_disciplines_discipline1_button_texture.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_discipline1_button");
                            disciplinesFrame_disciplines_discipline1_button_texture.SetDesaturated(1);
                            disciplinesFrame_disciplines_discipline1_button_texture.SetAlpha(0.8);
                            disciplinesFrame_disciplines_discipline1_button_texture.SetAllPoints(disciplinesFrame_disciplines_discipline1_button);

                            disciplinesFrame_disciplines_discipline1_button.SetScript("OnEnter", function(self: WoWAPI.Frame) {
                                showDisciplinesTooltip(self, 1);
                            });
                            disciplinesFrame_disciplines_discipline1_button.SetScript("OnLeave", hideDisciplinesTooltip);



                        const disciplinesFrame_disciplines_discipline2 = CreateFrame("Frame", undefined, disciplinesFrame_disciplinesGrid);
                        disciplinesFrame_disciplines_discipline2.SetSize(disciplinesFrame_disciplinesGrid.GetWidth() / 3 - DEFAULT_MARGIN_SMALL * 2, disciplinesFrame_disciplinesGrid.GetHeight() / 2);
                        disciplinesFrame_disciplines_discipline2.SetPoint("TOPLEFT", disciplinesFrame_disciplines_discipline1, "TOPRIGHT", 0 + DEFAULT_MARGIN_SMALL * 2, 0);
                        disciplinesFrame_disciplines_discipline2.SetBackdrop({
                            bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                            insets: { left: 0, right: 0, top: 0, bottom: 0 }
                        });
                        disciplinesFrame_disciplines_discipline2.SetBackdropColor(...LAYOUT_COLOR_FG);

                            const disciplinesFrame_disciplines_discipline2_title = disciplinesFrame_disciplines_discipline2.CreateFontString(undefined, "OVERLAY");
                            disciplinesFrame_disciplines_discipline2_title.SetPoint("TOP", disciplinesFrame_disciplines_discipline2, "TOP", 0, -10);
                            disciplinesFrame_disciplines_discipline2_title.SetFont("Fonts\\FRIZQT__.TTF", 14);
                            disciplinesFrame_disciplines_discipline2_title.SetTextColor(...LAYOUT_COLOR_TEXT);

                            const disciplinesFrame_disciplines_discipline2_button = CreateFrame("Button", undefined, disciplinesFrame_disciplines_discipline2);
                            disciplinesFrame_disciplines_discipline2_button.SetSize(120, 120);
                            disciplinesFrame_disciplines_discipline2_button.SetPoint("TOP", disciplinesFrame_disciplines_discipline2_title, "BOTTOM", 0, -5);

                            const disciplinesFrame_disciplines_discipline2_button_texture = disciplinesFrame_disciplines_discipline2_button.CreateTexture(undefined, "BACKGROUND");
                            disciplinesFrame_disciplines_discipline2_button_texture.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_discipline2_button");
                            disciplinesFrame_disciplines_discipline2_button_texture.SetDesaturated(1);
                            disciplinesFrame_disciplines_discipline2_button_texture.SetAlpha(0.8);
                            disciplinesFrame_disciplines_discipline2_button_texture.SetAllPoints(disciplinesFrame_disciplines_discipline2_button);

                            disciplinesFrame_disciplines_discipline2_button.SetScript("OnEnter", function(self: WoWAPI.Frame) {
                                showDisciplinesTooltip(self, 2);
                            });
                            disciplinesFrame_disciplines_discipline2_button.SetScript("OnLeave", hideDisciplinesTooltip);



                        const disciplinesFrame_disciplines_discipline3 = CreateFrame("Frame", undefined, disciplinesFrame_disciplinesGrid);
                        disciplinesFrame_disciplines_discipline3.SetSize(disciplinesFrame_disciplinesGrid.GetWidth() / 3- DEFAULT_MARGIN_SMALL, disciplinesFrame_disciplinesGrid.GetHeight() / 2);
                        disciplinesFrame_disciplines_discipline3.SetPoint("TOPLEFT", disciplinesFrame_disciplines_discipline2, "TOPRIGHT", 0 + DEFAULT_MARGIN_SMALL * 2, 0);
                        disciplinesFrame_disciplines_discipline3.SetBackdrop({
                            bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                            insets: { left: 0, right: 0, top: 0, bottom: 0 }
                        });
                        disciplinesFrame_disciplines_discipline3.SetBackdropColor(...LAYOUT_COLOR_FG);

                            const disciplinesFrame_disciplines_discipline3_title = disciplinesFrame_disciplines_discipline3.CreateFontString(undefined, "OVERLAY");
                            disciplinesFrame_disciplines_discipline3_title.SetPoint("TOP", disciplinesFrame_disciplines_discipline3, "TOP", 0, -10);
                            disciplinesFrame_disciplines_discipline3_title.SetFont("Fonts\\FRIZQT__.TTF", 14);
                            disciplinesFrame_disciplines_discipline3_title.SetTextColor(...LAYOUT_COLOR_TEXT);

                            const disciplinesFrame_disciplines_discipline3_button = CreateFrame("Button", undefined, disciplinesFrame_disciplines_discipline3);
                            disciplinesFrame_disciplines_discipline3_button.SetSize(120, 120);
                            disciplinesFrame_disciplines_discipline3_button.SetPoint("TOP", disciplinesFrame_disciplines_discipline3_title, "BOTTOM", 0, -5);

                            const disciplinesFrame_disciplines_discipline3_button_texture = disciplinesFrame_disciplines_discipline3_button.CreateTexture(undefined, "BACKGROUND");
                            disciplinesFrame_disciplines_discipline3_button_texture.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_discipline3_button");
                            disciplinesFrame_disciplines_discipline3_button_texture.SetDesaturated(1);
                            disciplinesFrame_disciplines_discipline3_button_texture.SetAlpha(0.8);
                            disciplinesFrame_disciplines_discipline3_button_texture.SetAllPoints(disciplinesFrame_disciplines_discipline3_button);
                            
                            disciplinesFrame_disciplines_discipline3_button.SetScript("OnEnter", function(self: WoWAPI.Frame) {
                                showDisciplinesTooltip(self, 3);
                            });
                            disciplinesFrame_disciplines_discipline3_button.SetScript("OnLeave", hideDisciplinesTooltip);



                        const disciplinesFrame_disciplines_discipline4 = CreateFrame("Frame", undefined, disciplinesFrame_disciplinesGrid);
                        disciplinesFrame_disciplines_discipline4.SetSize(disciplinesFrame_disciplinesGrid.GetWidth() / 3 - DEFAULT_MARGIN_SMALL, disciplinesFrame_disciplinesGrid.GetHeight() / 2);
                        disciplinesFrame_disciplines_discipline4.SetPoint("TOPLEFT", disciplinesFrame_disciplines_discipline1, "BOTTOMLEFT", 0, 0 - DEFAULT_MARGIN_SMALL * 2);
                        disciplinesFrame_disciplines_discipline4.SetBackdrop({
                            bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                            insets: { left: 0, right: 0, top: 0, bottom: 0 }
                        });
                        disciplinesFrame_disciplines_discipline4.SetBackdropColor(...LAYOUT_COLOR_FG);
                        
                            const disciplinesFrame_disciplines_discipline4_title = disciplinesFrame_disciplines_discipline4.CreateFontString(undefined, "OVERLAY");
                            disciplinesFrame_disciplines_discipline4_title.SetPoint("TOP", disciplinesFrame_disciplines_discipline4, "TOP", 0, -10);
                            disciplinesFrame_disciplines_discipline4_title.SetFont("Fonts\\FRIZQT__.TTF", 14);
                            disciplinesFrame_disciplines_discipline4_title.SetTextColor(...LAYOUT_COLOR_TEXT);

                            const disciplinesFrame_disciplines_discipline4_button = CreateFrame("Button", undefined, disciplinesFrame_disciplines_discipline4);
                            disciplinesFrame_disciplines_discipline4_button.SetSize(120, 120);
                            disciplinesFrame_disciplines_discipline4_button.SetPoint("TOP", disciplinesFrame_disciplines_discipline4_title, "BOTTOM", 0, -5);

                            const disciplinesFrame_disciplines_discipline4_button_texture = disciplinesFrame_disciplines_discipline4_button.CreateTexture(undefined, "BACKGROUND");
                            disciplinesFrame_disciplines_discipline4_button_texture.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_discipline4_button");
                            disciplinesFrame_disciplines_discipline4_button_texture.SetDesaturated(1);
                            disciplinesFrame_disciplines_discipline4_button_texture.SetAlpha(0.8);
                            disciplinesFrame_disciplines_discipline4_button_texture.SetAllPoints(disciplinesFrame_disciplines_discipline4_button);
                            
                            disciplinesFrame_disciplines_discipline4_button.SetScript("OnEnter", function(self: WoWAPI.Frame) {
                                showDisciplinesTooltip(self, 4);
                            });
                            disciplinesFrame_disciplines_discipline4_button.SetScript("OnLeave", hideDisciplinesTooltip);



                        const disciplinesFrame_disciplines_discipline5 = CreateFrame("Frame", undefined, disciplinesFrame_disciplinesGrid);
                        disciplinesFrame_disciplines_discipline5.SetSize(disciplinesFrame_disciplinesGrid.GetWidth() / 3 - DEFAULT_MARGIN_SMALL * 2, disciplinesFrame_disciplinesGrid.GetHeight() / 2);
                        disciplinesFrame_disciplines_discipline5.SetPoint("TOPLEFT", disciplinesFrame_disciplines_discipline4, "TOPRIGHT", 0 + DEFAULT_MARGIN_SMALL * 2, 0);
                        disciplinesFrame_disciplines_discipline5.SetBackdrop({
                            bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                            insets: { left: 0, right: 0, top: 0, bottom: 0 }
                        });
                        disciplinesFrame_disciplines_discipline5.SetBackdropColor(...LAYOUT_COLOR_FG);

                            const disciplinesFrame_disciplines_discipline5_title = disciplinesFrame_disciplines_discipline5.CreateFontString(undefined, "OVERLAY");
                            disciplinesFrame_disciplines_discipline5_title.SetPoint("TOP", disciplinesFrame_disciplines_discipline5, "TOP", 0, -10);
                            disciplinesFrame_disciplines_discipline5_title.SetFont("Fonts\\FRIZQT__.TTF", 14);
                            disciplinesFrame_disciplines_discipline5_title.SetTextColor(...LAYOUT_COLOR_TEXT);

                            const disciplinesFrame_disciplines_discipline5_button = CreateFrame("Button", undefined, disciplinesFrame_disciplines_discipline5);
                            disciplinesFrame_disciplines_discipline5_button.SetSize(120, 120);
                            disciplinesFrame_disciplines_discipline5_button.SetPoint("TOP", disciplinesFrame_disciplines_discipline5_title, "BOTTOM", 0, -5);

                            const disciplinesFrame_disciplines_discipline5_button_texture = disciplinesFrame_disciplines_discipline5_button.CreateTexture(undefined, "BACKGROUND");
                            disciplinesFrame_disciplines_discipline5_button_texture.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_discipline5_button");
                            disciplinesFrame_disciplines_discipline5_button_texture.SetDesaturated(1);
                            disciplinesFrame_disciplines_discipline5_button_texture.SetAlpha(0.8);
                            disciplinesFrame_disciplines_discipline5_button_texture.SetAllPoints(disciplinesFrame_disciplines_discipline5_button);
                            
                            disciplinesFrame_disciplines_discipline5_button.SetScript("OnEnter", function(self: WoWAPI.Frame) {
                                showDisciplinesTooltip(self, 5);
                            });
                            disciplinesFrame_disciplines_discipline5_button.SetScript("OnLeave", hideDisciplinesTooltip);



                        const disciplinesFrame_disciplines_discipline6 = CreateFrame("Frame", undefined, disciplinesFrame_disciplinesGrid);
                        disciplinesFrame_disciplines_discipline6.SetSize(disciplinesFrame_disciplinesGrid.GetWidth() / 3 - DEFAULT_MARGIN_SMALL, disciplinesFrame_disciplinesGrid.GetHeight() / 2);
                        disciplinesFrame_disciplines_discipline6.SetPoint("TOPLEFT", disciplinesFrame_disciplines_discipline5, "TOPRIGHT", 0 + DEFAULT_MARGIN_SMALL * 2, 0);
                        disciplinesFrame_disciplines_discipline6.SetBackdrop({
                            bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                            insets: { left: 0, right: 0, top: 0, bottom: 0 }
                        });
                        disciplinesFrame_disciplines_discipline6.SetBackdropColor(...LAYOUT_COLOR_FG);

                            const disciplinesFrame_disciplines_discipline6_title = disciplinesFrame_disciplines_discipline6.CreateFontString(undefined, "OVERLAY");
                            disciplinesFrame_disciplines_discipline6_title.SetPoint("TOP", disciplinesFrame_disciplines_discipline6, "TOP", 0, -10);
                            disciplinesFrame_disciplines_discipline6_title.SetFont("Fonts\\FRIZQT__.TTF", 14);
                            disciplinesFrame_disciplines_discipline6_title.SetTextColor(...LAYOUT_COLOR_TEXT);

                            const disciplinesFrame_disciplines_discipline6_button = CreateFrame("Button", undefined, disciplinesFrame_disciplines_discipline6);
                            disciplinesFrame_disciplines_discipline6_button.SetSize(120, 120);
                            disciplinesFrame_disciplines_discipline6_button.SetPoint("TOP", disciplinesFrame_disciplines_discipline6_title, "BOTTOM", 0, -5);

                            const disciplinesFrame_disciplines_discipline6_button_texture = disciplinesFrame_disciplines_discipline6_button.CreateTexture(undefined, "BACKGROUND");
                            disciplinesFrame_disciplines_discipline6_button_texture.SetTexture("Interface\\DisciplinesFrame\\disciplinesFrame_discipline6_button");
                            disciplinesFrame_disciplines_discipline6_button_texture.SetDesaturated(1);
                            disciplinesFrame_disciplines_discipline6_button_texture.SetAlpha(0.8);
                            disciplinesFrame_disciplines_discipline6_button_texture.SetAllPoints(disciplinesFrame_disciplines_discipline6_button);

                            disciplinesFrame_disciplines_discipline6_button.SetScript("OnEnter", function(self: WoWAPI.Frame) {
                                showDisciplinesTooltip(self, 6);
                            });
                            disciplinesFrame_disciplines_discipline6_button.SetScript("OnLeave", hideDisciplinesTooltip);
                            
                        

                    const disciplinesFrame_disciplinesAchievements = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_rightColumn);
                    disciplinesFrame_disciplinesAchievements.SetSize(disciplinesFrame_contentFrame_rightColumn.GetWidth() - COLUMN_PADDING_RIGHT_X * 2, 100);
                    disciplinesFrame_disciplinesAchievements.SetPoint("TOP", disciplinesFrame_disciplinesGrid, "BOTTOM", 0, -DEFAULT_MARGIN);
                    disciplinesFrame_disciplinesAchievements.SetBackdrop({
                        bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                        insets: { left: 0, right: 0, top: 0, bottom: 0 }
                    });
                    disciplinesFrame_disciplinesAchievements.SetBackdropColor(...LAYOUT_COLOR_FG);
                        
                        // FIXME: Testing. This will be replaced with actual UI elements.
                        const disciplinesFrame_disciplineAchievements_text = disciplinesFrame_disciplinesAchievements.CreateFontString(undefined, "OVERLAY");
                        disciplinesFrame_disciplineAchievements_text.SetJustifyH("LEFT");
                        disciplinesFrame_disciplineAchievements_text.SetPoint("CENTER", disciplinesFrame_disciplinesAchievements, "CENTER", 0, 0);
                        disciplinesFrame_disciplineAchievements_text.SetTextColor(...LAYOUT_COLOR_TEXT);



                    const disciplinesFrame_disciplinesXP = CreateFrame("Frame", undefined, disciplinesFrame_contentFrame_rightColumn);
                    disciplinesFrame_disciplinesXP.SetSize(disciplinesFrame_contentFrame_rightColumn.GetWidth() - COLUMN_PADDING_RIGHT_X * 2, 120);
                    disciplinesFrame_disciplinesXP.SetPoint("TOP", disciplinesFrame_disciplinesAchievements, "BOTTOM", 0, -DEFAULT_MARGIN);
                    disciplinesFrame_disciplinesXP.SetBackdrop({
                        bgFile: "Interface\\Tooltips\\UI-Tooltip-Background",
                        insets: { left: 0, right: 0, top: 0, bottom: 0 }
                    });
                    disciplinesFrame_disciplinesXP.SetBackdropColor(...LAYOUT_COLOR_FG);
        
        
                    
        // TODO: Make all Disciplines (including frames) dynamic, based on db data sent via packets. Maybe some custom packet to
        // make server send ALL the Disciplines as separate packets instead of just manually setting the amount to (currently) 6.
        
        disciplines[1] = { UITitleFrame: disciplinesFrame_disciplines_discipline1_title, UIButtonFrame: disciplinesFrame_disciplines_discipline1_button, UIButtonFrameTexture: disciplinesFrame_disciplines_discipline1_button_texture };
        disciplines[2] = { UITitleFrame: disciplinesFrame_disciplines_discipline2_title, UIButtonFrame: disciplinesFrame_disciplines_discipline2_button, UIButtonFrameTexture: disciplinesFrame_disciplines_discipline2_button_texture };
        disciplines[3] = { UITitleFrame: disciplinesFrame_disciplines_discipline3_title, UIButtonFrame: disciplinesFrame_disciplines_discipline3_button, UIButtonFrameTexture: disciplinesFrame_disciplines_discipline3_button_texture };
        disciplines[4] = { UITitleFrame: disciplinesFrame_disciplines_discipline4_title, UIButtonFrame: disciplinesFrame_disciplines_discipline4_button, UIButtonFrameTexture: disciplinesFrame_disciplines_discipline4_button_texture };
        disciplines[5] = { UITitleFrame: disciplinesFrame_disciplines_discipline5_title, UIButtonFrame: disciplinesFrame_disciplines_discipline5_button, UIButtonFrameTexture: disciplinesFrame_disciplines_discipline5_button_texture };
        disciplines[6] = { UITitleFrame: disciplinesFrame_disciplines_discipline6_title, UIButtonFrame: disciplinesFrame_disciplines_discipline6_button, UIButtonFrameTexture: disciplinesFrame_disciplines_discipline6_button_texture };



        function resetDisciplinesFrame () {

            if ( disciplinesFrame.GetScale() !== 1 ) {
                toggleDisciplinesFrameScale();
            }
    
            disciplinesFrame.SetScale(1);
            disciplinesFrame.ClearAllPoints();
            disciplinesFrame.SetPoint("CENTER", UIParent, "CENTER", 0, MAIN_FRAME_OFFSET_Y);
    
        }
    
        function toggleDisciplinesFrameScale () {
            
            if ( disciplinesFrame.GetScale() === 1 ) {
    
                disciplinesFrame.SetScale(0.8);
                disciplinesFrame_buttonBar_scaleButton.SetNormalTexture("Interface\\Buttons\\UI-Panel-BiggerButton-Up");
                disciplinesFrame_buttonBar_scaleButton.SetPushedTexture("Interface\\Buttons\\UI-Panel-BiggerButton-Down");
    
            } else {
    
                disciplinesFrame.SetScale(1);
                disciplinesFrame_buttonBar_scaleButton.SetNormalTexture("Interface\\Buttons\\UI-Panel-SmallerButton-Up");
                disciplinesFrame_buttonBar_scaleButton.SetPushedTexture("Interface\\Buttons\\UI-Panel-SmallerButton-Down");
    
            }
    
        }



        function showDisciplinesTooltip (frame: WoWAPI.Frame, ID: number) {
            
            if ( activeTooltipFrame !== frame && !GameTooltip.IsShown() ) {

                activeTooltipFrame = frame;
                activeTooltipDisciplineID = ID;

                GameTooltip.SetOwner(frame, "ANCHOR_CURSOR");

                updateDisciplinesTooltipContent(ID);
                
                GameTooltip.Show();

            }

        }

        function hideDisciplinesTooltip (frame: WoWAPI.Frame, ID: number) {
            
            if ( activeTooltipFrame === frame && GameTooltip.IsShown() ) {
                
                activeTooltipFrame = undefined;
                activeTooltipDisciplineID = undefined;

                GameTooltip.Hide();

            }

        }

        function updateDisciplinesTooltipContent (ID: number) {

            const isEnabled = ( disciplines[ID].XP >= 0 );
            const isActive  = ( activeDisciplineID === ID );
            
            let title = "Unknown";
            if ( disciplines[ID].title.length > 0 ) {
                title = disciplines[ID].title + "'s Discipline";
            }
            GameTooltip.SetText(title, 1, 1, 1);

            if ( isEnabled ) {

                if ( isActive ) {
                    GameTooltip.AddLine("Currently active", 1, 1, 1);
                } else {
                    GameTooltip.AddLine("Left click to activate", 0.1, 1, 0.1);
                }

                GameTooltip.AddLine(" ", 1, 1, 1);
                GameTooltip.AddLine(disciplines[ID].description, 1, 0.82, 0, true);

                GameTooltip.AddLine(" ", 1, 1, 1);
                GameTooltip.AddDoubleLine("Progression", "" + disciplines[ID].XP + "/21000", 1, 1, 1, 1, 1, 1);

            } else {
                
                GameTooltip.AddLine("Locked", 1, 0.5, 0);

                GameTooltip.AddLine(" ", 1, 1, 1);
                GameTooltip.AddLine(disciplines[ID].description, 1, 0.82, 0, true);

            }

            GameTooltip.Show();

        }

        function updateDisciplinesInfo (ID: number) {

            let title = disciplines[ID].title;
            if ( title.length <= 0 ) {
                title = "Unknown";
            }

            disciplines[ID].UITitleFrame.SetText(title.toUpperCase());

        }

        

        OnCustomPacket(CUSTOM_PACKET_DISCIPLINE_INFO_OPCODE, (packet) => {
    
            let customPacket = new CustomPacketDisciplineInfo(0, "", "");
            customPacket.read(packet);

            disciplines[customPacket.ID].title          = customPacket.title;
            disciplines[customPacket.ID].description    = customPacket.description;

            updateDisciplinesInfo(customPacket.ID);
    
        });

        OnCustomPacket(CUSTOM_PACKET_DISCIPLINE_XP_OPCODE, (packet) => {
    
            let customPacket = new CustomPacketDisciplineXP(0, 0, 0);
            customPacket.read(packet);

            disciplines[customPacket.ID].XP = customPacket.XP;
            
            if ( customPacket.isActive > 0 && activeDisciplineID !== customPacket.ID ) {

                activeDisciplineID = customPacket.ID;

                // TODO: Move "activating" of active discipline button/texture to another function/customPacket,
                // for example CustomPacketDisciplineActivate.

                disciplines[customPacket.ID].UIButtonFrameTexture.SetDesaturated(0);
                disciplines[customPacket.ID].UIButtonFrameTexture.SetAlpha(1);

            }

            if ( activeTooltipDisciplineID === customPacket.ID ) {
                updateDisciplinesTooltipContent(customPacket.ID);
            }
    
        });
        

        
        for ( const ID in disciplines ) {

            const customPacketDisciplineInfoRequest = new CustomPacketDisciplineInfo(Number(ID), "", "");
            customPacketDisciplineInfoRequest.write().Send();

            const customPacketDisciplineXPRequest = new CustomPacketDisciplineXP(Number(ID), 0, 0);
            customPacketDisciplineXPRequest.write().Send();

        }

        mainFrame = disciplinesFrame;

    }
    
    export function toggle () {
        
        if ( !mainFrame.IsShown() ) {
            
            mainFrame.Show();

            // TODO: Also show tooltip when showing the frame, IF mouse is on some area that should show tooltip.

        } else {
            
            mainFrame.Hide();

            if ( activeTooltipFrame ) {
                activeTooltipFrame = undefined;
                activeTooltipDisciplineID = undefined;
                GameTooltip.Hide();
            }

        }

    }

}