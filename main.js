const nodes = [
    {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
    },
    {
        x: 450,
        y: 100,
        width: 50,
        height: 80,
    },
    {
        x: 150,
        y: 90,
        width: 100,
        height: 100,
    },
];

const nodeDivElements = [];
const lines = [];

const background = document.getElementById("background");
const backgroundRect = background.getBoundingClientRect();

let isDragging = false;
let dragStart = {
    x: 0,
    y: 0,
};
let offset = {
    x: 0,
    y: 0,
};
let currentElement;

nodes.forEach((node, i) => {
    const element = document.createElement("div");
    const shapeClass = Math.random() < 0.5 ? "square" : "circle";
    const classes = [`shape`, shapeClass, `node-${i}`];
    element.classList.add(...classes);
    element.style.width = `${node.width}px`;
    element.style.height = `${node.height}px`;
    element.style.lineHeight = `${node.height}px`;
    element.style.backgroundColor = getRelaxingColor();
    element.style.transform = `translate(${node.x}px,${node.y}px)`;
    element.textContent = i;

    element.addEventListener("mousedown", (event) => {
        isDragging = true;
        dragStart.x = event.clientX;
        dragStart.y = event.clientY;
        currentElement = event.target;

        const rect = element.getBoundingClientRect();
        offset.x = dragStart.x - rect.left;
        offset.y = dragStart.y - rect.top;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
    nodeDivElements.push(element);
    background.appendChild(element);
});

function removeOldLine() {
    lines.forEach((line) => line.remove());
}

function createLine(x1, y1, x2, y2) {
    const length = Math.hypot(x2 - x1, y2 - y1);
    const centerX = (x1 + x2) / 2 - length / 2;
    const centerY = (y1 + y2) / 2;
    const rotation = Math.atan2(y2 - y1, x2 - x1);

    return {
        length,
        centerX,
        centerY,
        rotation,
    };
}

function drawLine(line) {
    const lineElement = document.createElement("div");
    lineElement.classList.add("line");
    lineElement.style.position = "absolute";
    lineElement.style.width = `${line.length}px`;
    lineElement.style.left = `${line.centerX}px`;
    lineElement.style.top = `${line.centerY}px`;
    lineElement.style.transform = `rotate(${line.rotation}rad)`;

    background.appendChild(lineElement);
    lines.push(lineElement);
}

function drawLineAndStore(x1, y1, x2, y2) {
    const line = createLine(x1, y1, x2, y2);
    drawLine(line);
}

function getRelaxingColor() {
    return ["#BF9D9D", "#DBC09E", "#E6DFAF", "#8399A8"][
        Math.floor(Math.random() * 4)
    ];
}

function outputClosestSibling() {
    const {
        x: currX,
        y: currY,
        width: currWidth,
        height: currHeight,
    } = currentElement.getBoundingClientRect();

    const siblingElements = nodeDivElements.filter(
        (element) => element !== currentElement
    );

    const distanceArray = siblingElements.map((divElement) => {
        const {
            x: divX,
            y: divY,
            width: divWidth,
            height: divHeight,
        } = divElement.getBoundingClientRect();

        const currCenterX = currX + currWidth / 2;
        const currCenterY = currY + currHeight / 2;
        const nodeCenterX = divX + divWidth / 2;
        const nodeCenterY = divY + divHeight / 2;

        const distance = Math.hypot(
            currCenterX - nodeCenterX,
            currCenterY - nodeCenterY
        );

        return {
            distance,
            index: divElement.textContent,
        };
    });

    const leastDistanceItem = distanceArray.reduce((prev, current) => {
        return prev.distance < current.distance ? prev : current;
    });
    console.log(`LeastDistanceItem: ${leastDistanceItem.index}`);
    return leastDistanceItem;
}

function calculateSnapPoints(background) {
    const snapPoints = [];

    const {
        left: parentLeft,
        top: parentTop,
        width: parentWidth,
        height: parentHeight,
    } = background.getBoundingClientRect();

    const siblings = Array.from(background.children).filter(
        (sibling) => sibling !== currentElement
    );

    for (const sibling of siblings) {
        const {
            left: siblingLeft,
            top: siblingTop,
            width: siblingWidth,
            height: siblingHeight,
        } = sibling.getBoundingClientRect();

        const siblingLeftX = siblingLeft - parentLeft;
        const siblingCenterX = siblingLeft - parentLeft + siblingWidth / 2;
        const siblingRightX = siblingLeft - parentLeft + siblingWidth;
        const siblingTopY = siblingTop - parentTop;
        const siblingCenterY = siblingTop - parentTop + siblingHeight / 2;
        const siblingBottomY = siblingTop - parentTop + siblingHeight;

        snapPoints.push(
            {
                x: siblingLeftX,
                y: siblingTopY,
            },
            {
                x: siblingCenterX,
                y: siblingTopY,
            },
            {
                x: siblingRightX,
                y: siblingTopY,
            },
            {
                x: siblingLeftX,
                y: siblingCenterY,
            },
            {
                x: siblingCenterX,
                y: siblingCenterY,
            },
            {
                x: siblingRightX,
                y: siblingCenterY,
            },
            {
                x: siblingLeftX,
                y: siblingBottomY,
            },
            {
                x: siblingCenterX,
                y: siblingBottomY,
            },
            {
                x: siblingRightX,
                y: siblingBottomY,
            }
        );
    }

    return snapPoints;
}

function onMouseMove(event) {
    if (!isDragging || !currentElement) return;
    removeOldLine();
    const { width: parentWidth, height: parentHeight } = backgroundRect;
    const { width: elementWidth, height: elementHeight } =
        currentElement.getBoundingClientRect();

    const snapThreshold = 5;

    let left = Math.max(
        0,
        Math.min(event.clientX - offset.x, parentWidth - elementWidth)
    );
    let top = Math.max(
        0,
        Math.min(event.clientY - offset.y, parentHeight - elementHeight)
    );

    const elementLeftX = left;
    const elementCenterX = left + elementWidth / 2;
    const elementRightX = left + elementWidth;

    const elementTopY = top;
    const elementCenterY = top + elementHeight / 2;
    const elementBottomY = top + elementHeight;

    const parentCenterX = parentWidth / 2;
    const parentCenterY = parentHeight / 2;

    let snapLines = [];

    if (Math.abs(elementCenterX - parentCenterX) <= snapThreshold) {
        left = parentCenterX - elementWidth / 2;
        snapLines.push({
            x1: left + elementWidth / 2,
            y1: 0,
            x2: left + elementWidth / 2,
            y2: parentHeight,
        });
    }
    if (Math.abs(elementCenterY - parentCenterY) <= snapThreshold) {
        top = parentCenterY - elementHeight / 2;
        snapLines.push({
            x1: 0,
            y1: top + elementHeight / 2,
            x2: parentWidth,
            y2: top + elementHeight / 2,
        });
    }

    let snapPoints = calculateSnapPoints(background);
    snapPoints.forEach(({ x, y }) => {
        let siblingSnapThreshold = 5;
        if (Math.abs(y - elementTopY) <= siblingSnapThreshold) {
            snapLines.push({
                x1: 0,
                y1: y,
                x2: parentWidth,
                y2: y,
            });
            top = y;
        }
        if (Math.abs(y - elementCenterY) <= siblingSnapThreshold) {
            snapLines.push({
                x1: 0,
                y1: y,
                x2: parentWidth,
                y2: y,
            });
            top = y - elementHeight / 2;
        }
        if (Math.abs(y - elementBottomY) <= siblingSnapThreshold) {
            snapLines.push({
                x1: 0,
                y1: y,
                x2: parentWidth,
                y2: y,
            });
            top = y - elementHeight;
        }
        /* Start here */
        if (Math.abs(x - elementLeftX) <= siblingSnapThreshold) {
            snapLines.push({
                x1: x,
                y1: 0,
                x2: x,
                y2: parentHeight,
            });
            left = x;
        }
        if (Math.abs(x - elementCenterX) <= siblingSnapThreshold) {
            snapLines.push({
                x1: x,
                y1: 0,
                x2: x,
                y2: parentHeight,
            });
            left = x - elementWidth / 2;
        }
        if (Math.abs(x - elementRightX) <= siblingSnapThreshold) {
            snapLines.push({
                x1: x,
                y1: 0,
                x2: x,
                y2: parentHeight,
            });
            left = x - elementWidth;
        }
    });

    if (snapLines.length > 0) {
        snapLines.forEach(({ x1, y1, x2, y2 }) => {
            drawLineAndStore(x1, y1, x2, y2);
        });
    }

    /* outputClosestSibling(); */
    currentElement.style.transform = `translate(${left}px, ${top}px)`;
}

function onMouseUp() {
    isDragging = false;
    const nodeIndex = parseInt(currentElement.textContent);
    const node = nodes[nodeIndex];
    const rect = currentElement.getBoundingClientRect();
    node.x = rect.left - backgroundRect.left;
    node.y = rect.top - backgroundRect.top;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    currentElement = null;
    lastKnownDistance = Infinity;
    removeOldLine();
}
