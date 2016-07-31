// ==UserScript==
// @name        Clickpocalypse2Clicker
// @namespace   C2C
// @description Clicker Bot for Clickpocalypse2
// @include     http://minmaxia.com/c2/
// @version     1.0.7
// @grant       none
// @require https://code.jquery.com/jquery-3.1.0.slim.min.js
// ==/UserScript==

// This saves scrolls for boss encounters.
var scrollReserve = 15;

// This will fire scrolls no matter what, if we hit this limit... (so we can pick up new scrolls).
var scrollUpperBound = 29;

$(document).ready(function () {

	console.log('Starting Clickpocalypse2Clicker: ' + GM_info.script.version);

	setInterval(function () {

		// Determines our encounter states
		var isBossEncounter = ($('.bossEncounterNotificationDiv').length != 0);
		var isEncounter = ($('#encounterNotificationPanel').css('display') !== 'none');
		//console.log("Boss: " +isBossEncounter +" Normal: " +isEncounter);

		// Determine if this is a difficult encounter... (one or more characters are stunned).
		//todo: should cancel search once we find it to be true.
		var isDifficultEncounter = false;
		// slot positions.
		var pos = ['A', 'B', 'C', 'E', 'E', 'F'];
		$.each(pos, function (idx) {
			var letter = pos[idx];

			// character positions.
			for (var char = 0; char < 5; char++) {

				var name = '#adventurerEffectIcon' + letter + char;
				var selector = $(name);
				//console.log("Checking: " + name + " Title: " + selector.attr('title') + " Display " + selector.css('display') + " HTML: " +selector.html());
				if (selector.attr('title') === 'Stunned' && selector.css('display') !== 'none') {
					isDifficultEncounter = true;

				}
			}
		});

		//console.log("isDifficultEncounter: " + isDifficultEncounter);

		// loot them chests... not sure which one of these is working.
		clickSelector($('#treasureChestLootButtonPanel').find('.gameTabLootButtonPanel'));
		clickSelector($('#treasureChestLootButtonPanel').find('.lootButton'));

		// Update AP Upgrades
		for (var row = 0; row < 12; row++) {
			// skip 'Offline Time Bonus' upgrade.
			if (row == 3) {
				continue;
			}
			for (var col = 0; col < 2; col++) {

				var name = "#pointUpgradesContainer_" + row + "_" + col + "_" + row;

				clickIt(name);
			}
		}

		// Cycle though all quick bar upgrades in reverse order.
		for (var i = 43; i >= 0; i--) {
			clickIt('#upgradeButtonContainer_' + i);
		}

		// Level up character skills.
		// No strategy yet, just click whatever is clickable
		for (var charPos = 0; charPos < 5; charPos++) {
			for (var col = 0; col < 9; col++) {
				for (var row = 0; row < 4; row++) {
					// There is an ending col on all, not sure why yet
					clickIt('#characterSkillsContainer' + charPos + '_' + col + '_' + row + '_' + col);
				}
			}
		}

		// Get information about potions are active before taking any actions

		var isPotionActive_ScrollsAutoFire = false;
		var isPotionActive_InfinteScrolls = false;
		var potionCount = 0;

		for (var row = 0; row < 4; row++) {
			for (var col = 0; col < 2; col++) {

				var potionSelector = $('#potionButton_Row' + row + '_Col' + col).find('.potionContentContainer');
				var potionName = potionSelector.find('td').eq(1).text();
				var potionActive = (potionSelector.find('.potionButtonActive').length != 0);

				if (potionName.length == 0) {
					continue;
				}

				potionCount++;

				if (potionName === 'Scrolls Auto Fire') {
					isPotionActive_ScrollsAutoFire = potionActive;
				}
				if (potionName === 'Infinite Scrolls') {
					isPotionActive_InfinteScrolls = potionActive;
				}

			}
		}

		//console.log ("AF: " +isPotionActive_ScrollsAutoFire +" IS: " +isPotionActive_InfinteScrolls +" Potion Count: " +potionCount );

		// Click them potions
		for (var row = 0; row < 4; row++) {
			for (var col = 0; col < 2; col++) {

				var potionSelector = $('#potionButton_Row' + row + '_Col' + col).find('.potionContentContainer');
				var potionName = potionSelector.find('td').eq(1).text();
				var potionActive = (potionSelector.find('.potionButtonActive').length != 0);

				if (potionName.length == 0) {
					continue;
				}
				if (potionActive) {
					continue;
				}

				// We don't want to use AutoFire and InfinteScrolls together, since they have similar functions.
				if (potionName === 'Infinite Scrolls' && isPotionActive_ScrollsAutoFire) {
					continue;
				}
				if (potionName === 'Scrolls Auto Fire' && isPotionActive_InfinteScrolls) {
					continue;
				}

				// Always click farm bonus or fast walking potions as soon as we get them, since they are useful anywhere.
				if (potionName === 'Faster Infestation' || potionName === 'More Kills Per Farm' || potionName === 'Fast Walking') {
					console.log('Using potion : ' + potionName);
					clickSelector(potionSelector);
					continue;
				}

				// Only click these if we are in battle, no need to chug potions if we are walking around peaceful overworld.
				if (isBossEncounter || isEncounter) {

					if (potionName === 'Infinite Scrolls') {
						isPotionActive_InfinteScrolls = true;
					}
					if (potionName === 'Scrolls Auto Fire') {
						isPotionActive_ScrollsAutoFire = true;
					}

					if (potionName === 'Potions Last Longer') {
						if (potionCount < 6 && !(isPotionActive_InfinteScrolls || isPotionActive_ScrollsAutoFire)) {
							continue;
						}
					}

					clickSelector(potionSelector);
				}

			}
		}

		// Get info about scrolls before taking any action.
		var totalScrolls = 0;
		for (var i = 0; i < 6; i++) {

			var scrollCell = $('#scrollButtonCell' + i);
			var scrollButton = scrollCell.find('.scrollButton');
			var scrollAmount = scrollCell.find('tr').eq(1).text().replace('x', ''); ;

			if (!scrollAmount.length) {
				continue;
			}

			if (scrollAmount === 'Infinite' || isPotionActive_InfinteScrolls) {
				break;
			}

			// Don't count spider webs
			if (i != 1) {
				totalScrolls += parseInt(scrollAmount);
			}

		}

		//console.log("Total Scrolls:" +totalScrolls);


		// click them scrolls
		for (var i = 0; i < 6; i++) {

			var scrollCell = $('#scrollButtonCell' + i);
			var scrollButton = scrollCell.find('.scrollButton');
			var scrollAmount = scrollCell.find('tr').eq(1).text().replace('x', ''); ;

			if (!scrollAmount.length) {
				continue;
			}

			// Hitting limit, fire scrolls so we can pick up new ones.
			if (scrollAmount > scrollUpperBound) {
				clickSelector(scrollButton);
				continue;
			}

			// Spam spells if Infinite Scrolls potion is active.
			if (scrollAmount === 'Infinite' || isPotionActive_InfinteScrolls) {

				// 4 times per second
				clickSelector(scrollButton);
				setTimeout(clickSelector, 250, scrollButton);
				setTimeout(clickSelector, 500, scrollButton);
				setTimeout(clickSelector, 750, scrollButton);
				continue;
			}

			// Fire 0 scrolls if Autofire is active... it fires them for free, so let's not waste ours.
			// unless boss encounter, we still want to double up on the big guys...
			if (isPotionActive_ScrollsAutoFire && !isBossEncounter && !isDifficultEncounter) {
				continue;
			}

			// 1 === spider web scroll.  Always fire at normal encounters.
			// Boss are immune to spider web, so won't fire them.
			if (i == 1 && !isBossEncounter) {
				clickSelector(scrollButton);
			}

			if (i != 1) {

				// keep scrolls in reserve if generic encounter so we have them for boss.
				// No limit if this is a boss encounter
				if (scrollAmount > scrollReserve || isBossEncounter || isDifficultEncounter) {

					clickSelector(scrollButton);
				}

			}

		}

	}, 1000);
});
/*** Click by div id **/
function clickIt(divName) {
	var div = $(divName);
	if (!div.length) {
		return;
	} // They use mouse up instead of click()

	div.mouseup();
}
/*** Click by Selector **/
function clickSelector($selector) {
	$selector.mouseup();
}
