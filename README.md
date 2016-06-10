# Four-In-A-Row Bot

## Overview

 This is a Four-In-A-Row bot for the [AI Games](http://theaigames.com) competition.

***Development is in progress.***

This bot uses Reinforcement Learning ([Temporal Difference](http://www.cse.unsw.edu.au/~cs9417ml/RL1/tdlearning.html)) to learn how to play Four-In-A-Row.

There are two phases:

- The training phase (offline)
- The competing phase (online)

The training phase works by making the bot play the game repeatedly against itself. During this process, it builds a tree of states, discerning desirable states from undesirable ones. Once the training phase is complete, we save the result to disk and use it for competing against other bots (or puny humans).

## More info
For more information: http://theaigames.com/competitions/four-in-a-row/getting-started
