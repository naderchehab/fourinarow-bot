# Four-In-A-Row Bot

## Overview

 This is a Four-In-A-Row bot for the [AI Games](http://theaigames.com) competition.

***Development is in progress.***

This bot uses Reinforcement Learning ([Temporal Difference](http://www.cse.unsw.edu.au/~cs9417ml/RL1/tdlearning.html)) to learn how to play Four-In-A-Row.

There are two phases:

- The training phase (offline)
- The competing phase (online)

The training phase works by making the bot play the game repeatedly against itself. During this process, it builds a tree of states, discerning desirable states from undesirable ones. Once the training phase is complete, we save the result to disk and use it for competing.


## Setup

#### 1. Java engine build script for Windows
To run the bot locally, you first need to [download the Four In A Row Java engine](https://github.com/theaigames/fourinarow-engine) which manages the bots and informs them about the game during the competition. If you use Windows, use the script below to compile the Java project:
```
rmdir "classes" /S /Q
dir /b /s *.java > sources.txt
md classes
javac -d classes @sources.txt
del sources.txt
pause
```

#### 2. Running the bot with the java engine
Place the bot directory in the fourinarow-engine directory, the use the following command to run it:
```
java -classpath classes com.theaigames.fourinarow.FourInARow "node bot" "node bot"
```
Notice that there are two instances of the bot, playing against each other.

#### 3. Bot output
This snippet helps with viewing the bot's output for debugging. Add it to the saveGame() function in AbstractGame.java file:
```
for(IOPlayer ioPlayer : this.engine.getPlayers())
    System.out.println(ioPlayer.getDump());
```

## More info
For more information: http://theaigames.com/competitions/four-in-a-row/getting-started
