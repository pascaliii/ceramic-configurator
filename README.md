# Ceramic Configurator

Ceramic Configurator with Three.js, React-Three-Fiber, React-Three-Drei & Vite

## General

### Install &  Start

```
yarn install
```

### Start
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


