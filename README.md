# Clickpocalypse2Clicker
Greasemonkey clickbot for Clickpocalypse II

This is a greasemonkey script for automating clicks in [Clickpocalypse II](http://minmaxia.com/c2/).  It simulates "legitimate" clicks and doesn't modify any internal game data or use "cheat" codes.

# Install

Requires [Greasymonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) for Firefox or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) for Chrome. 

Download c2c.user.js and install as a user script.

# Strategies  

### Loot

* Always loots Chests, Bookcases and Weapon Racks when first entering a room.

### Quick bar

* Clicks all quickbar upgrades in reverse order ( ie, buys most expensive items first, under the assumption they are the better upgrade).

### Character Levels/Skills

* No strategy yet, but will automatically level up characters and select first available skill upgrade in order.

### Potions
* Farm potions ('Faster Infestation' and 'More Kills Per Farm') and 'Fast Walking' will be used as soon as they are obtained since they are beneficial outside of combat.
* Scrolls potions ('Scrolls Auto Fire' and 'Infinite Scrolls') will not be used together.  Only one will be active as any given time since their functions overlap.
* All non-farm potions will only be used during encounters.  This is so they aren't "wasted" while walking around in peaceful overworld.
* 'Potions Last Longer' is only used when you have 6 or more potions in inventory or if either Scroll Potion is active ('Scrolls Auto Fire' and 'Infinite Scrolls').

### Scrolls
* If 'Infinite Scrolls' potion is active, then all scroll types will be used 4/second on all encounters.
* If 'Scrolls Auto Fire' potion is active, no scrolls will used for normal encounters, since potion gives free use.  Will still use non-free scrolls during boss or difficult encounters.
* 'Spider Web' scrolls will be liberally (till none are left) on normal encounters and not fired during boss encounters (bosses are immune).
* All other scrolls will be fired at normal encounters, until only 15 are left.  This "reserve" quantity will be saved for boss encounters or "difficult encounters" (if one or more characters is stunned during fight).
* Scrolls will be used if quantity is greater than 29 (to make room to pick up more).

### Points Upgrade
* It will upgrade all AP Point Upgrades in as they are available.  The exception being 'Offline Time Bonus', it will never be clicked. (player can do manually if they wish).

### Game end/reset

* No logic, will not click anything if you beat the game.

# todos

* Character skill upgrade logic could be tweaked to maximize certain skills first.
* Smarter use of Spider Web scroll (don't spam if all enemies are already stuck).
* Reserve qty of scrolls could be done total, instead or per scroll type.
* Potion 'Spells Cost Nothing' should be sold if no mage is in party?  Not sure if useful for fighters.


# updates

### 1.0.7

* fixed bug with detecting if an encounter is difficult.
* Better strategy for 'Potions Last Longer'

### 1.0.6

* Fixed bug with 'Infinite Scroll' spam.
* Fixed bug were 'Infinite Scroll' and 'Auto Fire' won't be correctly used if both were in inventory
* Added strategy for 'Potions Last Longer'.
* Add AP Point Upgrade strategy.
* Added strategy for "difficult encounters"


