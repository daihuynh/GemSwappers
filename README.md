# GemSwapper
   This is a match-3 type game using devkit - based on HTML5 - to develop. It's currently WIP and only have some basic logic: match gems, check objective.

## Installation
   I program this game on Windows 8.1 OS so this guide will show how to install on Windows OS

   Clone project:
   > git clone https://github.com/daihuynh/GemSwappers.git
   
   Use npm to install devkit
   > npm install -g devkit
   
   Go to game path
   > cd GemSwappers
   
   Install devkit-core 3.0.2
   > devkit install https://github.com/gameclosure/devkit-core#v3.0.2
   
   Start game
   > devkit serve
   
## How to play
  * Your objective is getting 2,500 score within 3 minutes, limited with 30 moves.
  * Click on any gem then the neighbour gem for swapping.
  * Game will show suggestion after you idle in 3 seconds.
  * Every gem you earn will increase the Mermaid's power.
  * When mermaid is full power, she will drop a bomb to destroy all gems.
  * You can restart the game.
   
## About project
### Challenges
1. **Sprite Animation**:
  * Maybe i'm wrong because i don't have enough time for researching deeply about devkit-core. The following document on website is just introduce about Image, 9-slice, basic sprite but does not have any class to make a sprite animation. That's why i write AnimateImage, KeyFrameImage.
  * **AnimateImage** is extends from ImageView and it contains all images for animating with fps, basic flow: play, stop, complete.
  * **KeyFrameImage** is same with AnimateImage but has advance options: every animation keys has it's frames for animating. For example:
     Mermaid has 4 animations: blink, idle, power_start, power_end and these are animation keys. When i calls play(withAnimationKey, andLoop), it will play animation.
 
2. **Texture atlas**:
  * The only thing i found in document is an example about Animation Prebuilt using spritesheet but not a good class for every seperate images. Packing all images into 1 texture atlas is what i want to. Why? It's fast (get/load/render), reduce draw call. There are many tools for packing images out there but i used my favourite tool named **TexturePacker** <https://www.codeandweb.com/texturepacker>. It's a super cool tool that supports for many game library, engine with advance options.
  * All i need to do is packing all images into 1 Texture Atlas and use **AnimateImage**, **ImageView**, **KeyFrameImage** for animation, single sprite in game and use json data file for reading region. Unfortunately, i did not find any way for reading raw json file in devkit yet, that why i put data into **SpriteInfo** class. Json data is an object itself so i put some utilities functions for reading, create **Image**, **ImageView** from it.

3. **Asset security**:
  * None topics in document metion about how to security asset. Why am i serious about it? I don't want to see my game's assets in other games of others guy out there (if will submit to production). Luckily, **TexturePacker** has an security option for Texture atlas file but testing times does not allow me for using this option.

4. **Layout design**:
  * Layouting by code is not a fancy thing when making a game. I have to code and refresh everytime to check and it took really much times for this. Some HTML5 game frameworks already had their own Layout Design tool, developers just need to focus on logic.
  
### Feature improvement
  * I will design an level editor for designer to make this game more fun, interesting.
  * Add feature: color bomb, thunder gem, explosion gem and more...
  * Social plugin: share achievements with friends, request help, chat in game
  
  
## About mobile game development
 * Mobile games nowaday is a trend, everyone loves playing game on mobile then desktop. The most successful mobile game are social/casual games, people likes quick play, much fun and sharable. That's why many modern game engines have more features, tools for mobile game developing. It allows fasting coding for developers, easy to make protoype, modify, tool for designer and the most important thing is connecting every people in whole team. I means: the artist can draw, layouting scene inside project without waitting for developers coding, developer can quickly implement protoype logic, make level editor for designer, designer can choose song, sound effects, logic.
 * HTML5 has it owned advantage:
      - Cross-platform.
      - No need to install on device ( if using web browser to play)
      - Web developers no need to learn new language
      - Websocket for online games.
   
 * But has disadvantage too:
      - Not really good performance for a heavy using GPU games.
      - Interrect with native via WebView (that's mean have to make a wrapper native app).
      - Hard to implement OOP.
 
 * These disadvantages are now solved in some HTML5 game engines. For example: cocos2d-js has it owned binding to C++ that makes performance is good.

