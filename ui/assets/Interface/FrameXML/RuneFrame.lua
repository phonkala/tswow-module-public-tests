--Readability == win

local FirstTime = true;

local RUNETYPE_BLOOD 	= 1;
local RUNETYPE_UNHOLY 	= 2;
local RUNETYPE_FROST 	= 3;
local RUNETYPE_DEATH 	= 4;
local RUNETYPE_NATURE 	= 5;

local iconTextures = {};
iconTextures[RUNETYPE_BLOOD] 	= "Interface\\PlayerFrame\\UI-PlayerFrame-Deathknight-Blood";
iconTextures[RUNETYPE_UNHOLY] 	= "Interface\\PlayerFrame\\UI-PlayerFrame-Deathknight-Unholy";
iconTextures[RUNETYPE_FROST] 	= "Interface\\PlayerFrame\\UI-PlayerFrame-Deathknight-Frost";
iconTextures[RUNETYPE_DEATH] 	= "Interface\\PlayerFrame\\UI-PlayerFrame-Deathknight-Death";
iconTextures[RUNETYPE_NATURE] 	= "Interface\\PlayerFrame\\UI-PlayerFrame-ArchDruid-Nature";

local runeTextures = {
	[RUNETYPE_BLOOD] 	= "Interface\\PlayerFrame\\UI-PlayerFrame-DeathKnight-Blood-Off.tga",
	[RUNETYPE_UNHOLY] 	= "Interface\\PlayerFrame\\UI-PlayerFrame-DeathKnight-Death-Off.tga",
	[RUNETYPE_FROST] 	= "Interface\\PlayerFrame\\UI-PlayerFrame-DeathKnight-Frost-Off.tga",
	[RUNETYPE_DEATH] 	= "Interface\\PlayerFrame\\UI-PlayerFrame-Deathknight-Chromatic-Off.tga",
	[RUNETYPE_NATURE] 	= "Interface\\PlayerFrame\\UI-PlayerFrame-Deathknight-Death-Off.tga",
}

local runeColors = {
	[RUNETYPE_BLOOD] 	= { 1.0, 0.0, 0.0 },
	[RUNETYPE_UNHOLY] 	= { 0.0, 0.5, 0.0 },
	[RUNETYPE_FROST] 	= { 0.0, 1.0, 1.0 },
	[RUNETYPE_DEATH] 	= { 0.8, 0.1, 1.0 },
	[RUNETYPE_NATURE] 	= { 0.0, 0.5, 0.0 },
}

runeMapping = {
	[RUNETYPE_BLOOD] 	= "BLOOD",
	[RUNETYPE_UNHOLY] 	= "UNHOLY",
	[RUNETYPE_FROST] 	= "FROST",
	[RUNETYPE_DEATH] 	= "DEATH",
	[RUNETYPE_NATURE] 	= "NATURE",
}



function RuneFrame_OnLoad (self)
	
	local _, class_id = UnitClass("player");
	
	-- If player class is Arch Druid, update death runes into nature runes.
	if ( class_id == "ARCHDRUID" ) then
		iconTextures[RUNETYPE_DEATH] 	= iconTextures[RUNETYPE_NATURE];
		runeTextures[RUNETYPE_DEATH] 	= runeTextures[RUNETYPE_NATURE];
		runeColors[RUNETYPE_DEATH] 		= runeColors[RUNETYPE_NATURE];
		runeMapping[RUNETYPE_DEATH]		= runeMapping[RUNETYPE_NATURE];
	end

	-- If player class is not a Death Knight or Arch Druid, disable rune frame.
	if ( not(class_id == "ARCHDRUID" or class_id == "DEATHKNIGHT") ) then
		self:Hide();
	end
	
	self:RegisterEvent("RUNE_POWER_UPDATE");
	self:RegisterEvent("RUNE_TYPE_UPDATE");
	self:RegisterEvent("PLAYER_ENTERING_WORLD");
	
	self:SetScript("OnEvent", RuneFrame_OnEvent);
	
	self.runes = {};

end



function RuneButton_OnLoad (self)

	RuneFrame_AddRune(RuneFrame, self);
	
	self.rune 	= _G[self:GetName().."Rune"];
	self.fill 	= _G[self:GetName().."Fill"];
	self.shine 	= _G[self:GetName().."ShineTexture"];

	RuneButton_Update(self);

end



function RuneButton_OnUpdate (self, elapsed)

	-- Constants that aren't used elsewhere and are actually constant are happiest inside their functions ;)
	--local RUNE_HEIGHT = 18;
	--local MIN_RUNE_ALPHA = .4
	
	local cooldown = _G[self:GetName().."Cooldown"];
	local start, duration, runeReady = GetRuneCooldown(self:GetID());
	
	local displayCooldown = (runeReady and 0) or 1;
	
	CooldownFrame_SetTimer(cooldown, start, duration, displayCooldown);
	
	-- if ( not enable ) then
		-- self.fill:SetHeight(RUNE_HEIGHT * ((GetTime() - start)/duration));
		-- self.fill:SetTexCoord(0, 1, (1 - ((GetTime() - start)/duration)), 1);
		-- self.fill:SetAlpha(math.max(MIN_RUNE_ALPHA, (GetTime() - start)/duration));
	-- else
	
	if ( runeReady ) then
		-- self.fill:SetHeight(RUNE_HEIGHT);
		-- self.fill:SetTexCoord(0, 1, 0, 1);
		-- self.fill:SetAlpha(1);
		self:SetScript("OnUpdate", nil);
	end

end



function RuneButton_Update (self, rune, dontFlash)

	rune = rune or self:GetID();
	local runeType = GetRuneType(rune);
	
	if ( (not dontFlash) and (runeType) and (runeType ~= self.rune.runeType) ) then
		self.shine:SetVertexColor(unpack(runeColors[runeType]));
		RuneButton_ShineFadeIn(self.shine)
	end
	
	if ( runeType ) then
		self.rune:SetTexture(iconTextures[runeType]);
		-- self.fill:SetTexture(iconTextures[runeType]);
		self.rune:Show();
		-- self.fill:Show();
		self.rune.runeType = runeType;
		self.tooltipText = _G["COMBAT_TEXT_RUNE_"..runeMapping[runeType]];
	else
		self.rune:Hide();
		-- self.fill:Hide();
		self.tooltipText = nil;
	end

end



function RuneButton_OnEnter (self)
	
	if ( self.tooltipText ) then
		GameTooltip:SetOwner(self, "ANCHOR_RIGHT");
		GameTooltip:SetText(self.tooltipText);
		GameTooltip:Show();
	end

end



function RuneButton_OnLeave (self)
	GameTooltip:Hide();
end



function RuneFrame_OnEvent (self, event, ...)

	if ( event == "PLAYER_ENTERING_WORLD" ) then
		
		if ( FirstTime ) then
			FirstTime = false;
		end

		for rune in next, self.runes do
			RuneButton_Update(self.runes[rune], rune, true);
		end

	elseif ( event == "RUNE_POWER_UPDATE" ) then
		
		local rune, usable = ...;
		
		if ( not usable and rune and self.runes[rune] ) then
			self.runes[rune]:SetScript("OnUpdate", RuneButton_OnUpdate);
		elseif ( usable and rune and self.runes[rune] ) then
			self.runes[rune].shine:SetVertexColor(1, 1, 1);
			RuneButton_ShineFadeIn(self.runes[rune].shine)
		end

	elseif ( event == "RUNE_TYPE_UPDATE" ) then
		
		local rune = ...;

		if ( rune ) then
			RuneButton_Update(self.runes[rune], rune);
		end

	end

end



function RuneFrame_AddRune (runeFrame, rune)
	tinsert(runeFrame.runes, rune);
end



function RuneButton_ShineFadeIn (self)
	
	if self.shining then
		return
	end

	local fadeInfo = {
		mode 			= "IN",
		timeToFade 		= 0.5,
		finishedFunc 	= RuneButton_ShineFadeOut,
		finishedArg1 	= self,
	}

	self.shining = true;
	UIFrameFade(self, fadeInfo);

end



function RuneButton_ShineFadeOut (self)
	self.shining = false;
	UIFrameFadeOut(self, 0.5);
end