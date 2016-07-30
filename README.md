# Clickpocalypse2Clicker
Greasemonkey clickbot for Clickpocalypse II

This is a greasemonkey script for automating clicks in [Clickpocalypse II](http://minmaxia.com/c2/).  It simulates "legitmate" clicks and doesn't modify any internal game data or use "cheat" codes.

# Install

Requires [Greasymonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) for Firefox or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) for Chrome. 

Download c2c.user.js and install as a user script.

# Strategies  

### Loot

* Always loots Chests, Bookcases and Weapon Racks when first entering a room.

### Quick bar

* Clicks all quickbar upgrades in reverse order ( ie, buys most expensive items first, under the assumation they are the better ugprade).

### Character Levels/Skills

* No strategy yet, but will automatically level up characters and select first avaiable skill upgrade in order.

### Potions

* Farm potions ('Faster Infestation' and 'More Kills Per Farm') will be used as soon as they are obtained
* Scrolls potions ('Scrolls Auto Fire' and 'Infinite Scrolls') will not be used together.  Only one will be active as any given time since their functions overlap.
* All non-farm potions will only be used during encounters.  This is so they aren't "wasted" while walking around in peaful overworld.


### Scrolls
* If 'Infinite Scrolls' potion is active, then all scroll types will be used 4/second on all encounters.
* If 'Scrolls Auto Fire' potion is acitve, no scrolls will used since potion gives free use.
* 'Spider Web' scrolls will be liberally (till none are left) on normal encounters and not fired during boss encounters (bosses are immune).
* All other scrolls will be fired at normal encounters, until only 15 are left.  This "reserve" quantity will be saved for boss encounters.
* Scrolls will be used if quantiy is greater than 29 (to make room to pick up more).


### Points Upgrade

* No logic, will not click anything.

### Game end/rest

* No logic, will not click anything if you beat the game.










