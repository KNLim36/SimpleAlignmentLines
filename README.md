# SimpleAlignmentLines
A simple alignment line drawing project using pure JavaScript.

#### You can view this on: https://jsfiddle.net/KeanNengLim/0od5txaj/

## How to preview
To preview the project, follow these steps:
1. Open your CLI and run `npx http-server -o index.html` to serve the index page. If prompted for installation, proceed with it.
2. Play with the drag and drop feature on the webpage.
3. When finished, close the webpage.
4. Return to the terminal and stop serving the webpage by pressing `ctrl + c`.
5. Run npx clear-npx-cache to clean up the installed http-server package.


## Room for improvement
While this project is functional, there are several ways it could be improved, including:
1. Refactoring the code to use modern JavaScript features like destructuring, spread syntax, and arrow functions for improved readability and maintenance.
2. Adding comments to the code to improve its readability and explain the purpose of each function and variable.
3. Using CSS classes instead of directly manipulating the style of elements using JavaScript for easier modification of the visual appearance of the nodes and lines.
4. Replacing the getRelaxingColor() function with a more flexible color generation function that accepts an array of colors and returns a random color from the array.
5. Improving the createLine() function to return an object with x1, y1, x2, and y2 properties instead of length, centerX, centerY, and rotation properties for easier line position calculation and editing.
6. Implementing snapping of nodes to gridlines or other nodes to facilitate alignment.
7. Adding a feature to resize nodes by dragging their corners or edges.
8. Adding validation to prevent nodes from overlapping or exceeding the bounds of the background element.
9. Refactoring the code to use a framework or library like React, Vue, or Angular to improve scalability and state management.
10. Improving the outputClosestSibling() function to consider the position of the current node when calculating the distance to its siblings, rather than just the center of the node.
11. Adding a feature to save the current state of the application (i.e., the position and size of nodes and the connections between them) to local storage or a database so that users can return to their work later.
