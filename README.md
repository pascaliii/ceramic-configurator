# Ceramic Configurator

This Ceramic Configurator is the technical part of my master thesis. 
It is created with React, Three.js, React-Three-Fiber, React-Three-Drei & Vite.

The glazes where made with Adobe 3D Sampler from pictures of the real glazes of the glaze companies Botz and Carl Jäger. 

The 3D Models where created in Blender. Due to some issues with ReactThreeFiber (https://github.com/pmndrs/react-three-fiber/discussions/3002#discussion-5608250) the glazes where applied inside Blender aswell and just switched in React. 

Checkout the project on my website: [config.pascaleschmidtceramics.de](https://config.pascaleschmidtceramics.de/)

## Preview
![Configuration with spreckled clay and peppermint glaze](https://github.com/pascaliii/ceramic-configurator/blob/main/public/Screenshot_1.png?raw=true)



## Install

```
yarn install
```

## Start
```
yarn dev
```

## Convert gltf model to jsx

Create a 3D-Model in Blender in the correct sizing (metric system) and export it as `.gltf` with embedded materials.
Add the exported model to the models folder in the project. 
Get into the models folder and execute following command to convert the `.gltf` file into jsx

```
npx gltfjsx Model_$name_$YYYY_MM_DD.gltf -o Transformed_Model_$name_$YYYY_MM_DD
```


