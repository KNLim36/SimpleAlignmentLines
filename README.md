# SimpleAlignmentLines

A project for drawing alignment lines using pure JavaScript.

## Project Overview

This project enables users to manipulate nodes on a background, dragging them to new positions and visualizing alignment lines dynamically.

## Features

- Drag and drop nodes on the background.
- Automatically draw alignment lines based on node positions.
- Calculates and outputs the closest sibling node to the currently dragged node.

## Code Overview

The JavaScript code dynamically creates nodes and alignment lines based on user interactions with the background. It includes functions for calculating distances between nodes, drawing lines, and handling drag events.

## How to Use

To view and interact with the project:

1. Clone the repository or download the files.
2. Open your terminal and run `npx http-server -o index.html` to serve the index page.
3. Interact with the drag and drop feature on the webpage.
4. Close the webpage when finished.
5. Stop serving the webpage in the terminal by pressing `ctrl + c`.
6. Optionally, clean up the installed `http-server` package cache with `npx clear-npx-cache`.

## Room for Improvement

While functional, there are several areas where this project could be enhanced:

1. Refactoring code to use modern JavaScript features for readability and maintainability.
2. Adding comments to improve code readability and explain functionality.
3. Using CSS classes for styling instead of direct JavaScript manipulations.
4. Enhancing node resizing features and implementing snapping to gridlines or other nodes.
5. Utilizing frameworks like React or Vue for improved scalability and state management.
6. Implementing data persistence for saving node positions and connections.
7. Improving the accuracy of distance calculations between nodes for more precise alignment.
8. Enhancing user interface elements for a more intuitive user experience.

#### View this project in action: [SimpleAlignmentLines on JSFiddle](https://jsfiddle.net/KeanNengLim/0od5txaj/)
