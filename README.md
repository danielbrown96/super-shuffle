# Super Shuffle

Loads all card data from file(s).
Present ui to user for picking seed data.
If no seed data picked, randomly pick a seed.
Seed data can include any of: Mastermind, Scheme, Hero(es), Villain(s), Themes, Classes, Teams.
If randomly picking a seed, first picks one of the seed types above, then picks an item from it.
Then random generation works in an order depending on the seed.
Random generation takes the current state of chosen cards, then picks the *next best card*, which then forms the new state, repeat until all cards chosen.

What is the next best card?
Take all synergy and thematic tags on cards currently in set.
Optional step: determine tag priority
Determine which type of card is being search for yet (figure out how to build "card priority")
Sort all cards based on how they score against all tags in pool. Default score for thematic tags is 7?. Modify scores based on tag priority.
Pick the highest card.
Repeat.






Take all synergy and thematic tags on cards currently in set and order by number of instances.
Optional step maybe: determine tag priority.
Optional step maybe: if multiple cards of equal priority, randomise order.
Sort all cards of the highest priorty tag by their mechanical score.
Pick the highest card.
Repeat


Dev Steps:
Data entry of core heroes.
Randomly generate synergistic hero team based on random hero.
Add masterminds -> schemes -> villains.
Then add user input.
