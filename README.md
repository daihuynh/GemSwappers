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

