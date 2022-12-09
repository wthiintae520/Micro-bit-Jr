const SNAP_SENSIBILITY = 50; //px
const BLOCK_GAP = 2; //px
const BLOCK_OVERLAP = 20; //px

let allBlocks = document.querySelectorAll(".block-body");
let root = document.querySelector("#root");
let canvas = document.querySelector("#canvas");

let snaps = {}; //save all snapped block's id

allBlocks.forEach((blockBody) => {
  //enabling dragging and dropping in canvas
  registerDragging(blockBody);
});

function registerDragging(blockBody, isFromCanvas) {
  //add yellow border when hovering over the blocks
  blockBody.addEventListener("mouseover", () => {
    blockBody.dataset.status = "hover";
  });
  //remove the border
  blockBody.addEventListener("mouseleave", () => {
    blockBody.dataset.status = "none";
  });

  let isMouseInsideCanvas = false;
  let mouseDown = false; //whether or not mouse pressed
  let dragInfo; //save mouse position inside the block when mouse down
  let copiedBlockID = null;

  blockBody.addEventListener("mousedown", (event) => {
    event.preventDefault();
    mouseDown = true; //mouse is pressed
    let rect = blockBody.getBoundingClientRect();

    isMouseInsideCanvas = mouseInsideCanvas(event);

    dragInfo = {
      diffX: event.clientX - rect.x, //mouse position inside block from left
      diffY: event.clientY - rect.y, //from top
    };
  });
  if (isFromCanvas) {
    //if the block is inside canvas
    //dragging
    document.addEventListener("mousemove", (event) => {
      event.preventDefault();
      if (!mouseDown) {
        //if mouse was not pressed
        return;
      }
      let canvasRect = canvas.getBoundingClientRect();
      //check if mouse is over canvas
      isMouseInsideCanvas = mouseInsideCanvas(event);

      //delete previous blank block if any
      let previousBlankBlock = document.querySelector(
        `[data-id='blank-${blockBody.dataset.id}']`
      );
      previousBlankBlock && previousBlankBlock.remove();

      //delete snap id from previously snapped group if any
      if (blockBody.dataset.snapId && snaps[blockBody.dataset.snapId]) {
        snaps[blockBody.dataset.snapId] = snaps[
          blockBody.dataset.snapId
        ].filter((item) => item !== blockBody.dataset.id);
      }

      //set the block's coordinates to make it follow the mouse
      blockBody.style.top = `${
        event.clientY - canvasRect.y - dragInfo.diffY
      }px`;
      blockBody.style.left = `${
        event.clientX - canvasRect.x - dragInfo.diffX
      }px`;
    });
    //drag end or drop
    document.addEventListener("mouseup", (event) => {
      if (!mouseDown) {
        return;
      }
      if (!isMouseInsideCanvas) {
        //if dragged out of the canvas, delete the block
        blockBody.remove();
        dragInfo = {};
        mouseDown = false;
        copiedBlockID = null;
        return;
      }
      //set new coordinates of the block
      let top =
        event.clientY - dragInfo.diffY - canvas.getBoundingClientRect().y;
      let left =
        event.clientX - dragInfo.diffX - canvas.getBoundingClientRect().x;
      //set coordinates
      blockBody.style.top = `${top}px`;
      blockBody.style.left = `${left}px`;
      //snap block to nearby block
      snapBlock(blockBody, top, left);
      //remove yellow border
      blockBody.dataset.status = "none";
      //reset variables
      dragInfo = {};
      mouseDown = false;
      copiedBlockID = null;
      //reposition all blocks
      Object.keys(snaps).forEach((snapId) => {
        repositionSnappedGroup(snapId);
      });
    });
    return;
  }
  document.addEventListener("mousemove", (event) => {
    // custom drag and drop. when dragged new element is created which follows mouse, then on drop inserts the element on canvas
    event.preventDefault();
    if (!mouseDown) {
      return;
    }
    //check if mouse is over canvas
    let canvasRect = canvas.getBoundingClientRect();

    isMouseInsideCanvas = mouseInsideCanvas(event);

    if (!copiedBlockID) {
      //copy the block from menu to root
      let copyBlock = document.createElement("div");
      //generate a random id for moving block
      copiedBlockID = Math.random().toString(36).slice(2);
      copyBlock.dataset.id = copiedBlockID;
      copyBlock.className = blockBody.className;
      copyBlock.innerHTML = blockBody.innerHTML;
      root.insertAdjacentElement("beforeend", copyBlock);
    }
    //get the copied block and set it's coordinates following the mouse
    let copyBlock = document.querySelector(`[data-id="${copiedBlockID}"]`);
    copyBlock.dataset.status = "selected";
    copyBlock.style.top = `${event.clientY - dragInfo.diffY}px`;
    copyBlock.style.left = `${event.clientX - dragInfo.diffX}px`;
  });
  //drop
  document.addEventListener("mouseup", (event) => {
    if (!mouseDown) {
      return;
    }
    //get moving block
    let copyBlock = document.querySelector(`[data-id="${copiedBlockID}"]`);
    if (!isMouseInsideCanvas) {
      //delete moving block if not dropped on canvas
      copyBlock.remove();
      dragInfo = {};
      mouseDown = false;
      copiedBlockID = null;
      return;
    }
    //fetch coordinates
    let top =
      copyBlock.getBoundingClientRect().y - canvas.getBoundingClientRect().y;
    let left =
      copyBlock.getBoundingClientRect().x - canvas.getBoundingClientRect().x;
    //insert block in canvas
    canvas.insertAdjacentHTML("beforeend", copyBlock.outerHTML);
    //delete moving block
    copyBlock.remove();
    let pastedBlock = document.querySelector(`[data-id="${copiedBlockID}"]`);
    //set coordinates
    pastedBlock.style.top = `${top}px`;
    pastedBlock.style.left = `${left}px`;
    //enable dragging on block pasted, so that it remains movable after dropping
    registerDragging(pastedBlock, true);

    //try to snap the block
    snapBlock(pastedBlock, top, left);

    pastedBlock.dataset.status = "none";
    dragInfo = {};
    mouseDown = false;
    copiedBlockID = null;
  });
}

const mouseInsideCanvas = (event) => {
  let canvasRect = canvas.getBoundingClientRect();
  //check if mouse is inside canvas element
  return (
    event.clientX >= canvasRect.x &&
    event.clientX <= canvasRect.x + canvasRect.width &&
    event.clientY >= canvasRect.y &&
    event.clientY <= canvasRect.y + canvasRect.height
  );
};

function snapBlock(block, exactTop, exactLeft) {
  let snapId; //key for snaps object
  let existingBlocks = canvas.querySelectorAll(".block-body"); //all blocks in canvas
  let snapped = false;

  existingBlocks.forEach((target) => {
    if (target.dataset.id === block.dataset.id) {
      //if there's only one block in canvas
      return;
    }
    //get the shortest distance and direction
    let shortest = getDistanceBetweenBlocks(target, block);
    if (!shortest || !shortest.x || !shortest.x.direction) {
      return;
    }

    // delete previous snapped group if any
    if (
      block.dataset.snapId &&
      snaps[block.dataset.snapId] &&
      snaps[block.dataset.snapId].length < 2
    ) {
      snaps[block.dataset.snapId] && delete snaps[block.dataset.snapId];
    }

    //if distance is equal of less than maximum snapping distance
    if (
      shortest.x.distance <= SNAP_SENSIBILITY &&
      shortest.y.distance <= SNAP_SENSIBILITY
    ) {
      snapId = target.dataset.snapId;
      switch (shortest.x.direction) {
        case "left": {
          if (snapped) {
            break;
          }
          //TODO: check if snapping allowed on left
          //find leftmost element of target, always snap with left
          let snappedBlocks = snaps[target.dataset.snapId]; //get snapping block's ids of target
          let targetIndex = snappedBlocks.findIndex(
            //find the index of target
            (item) => item === target.dataset.id
          );
          //now snap block with previous indexed block
          let leftmost = canvas.querySelector(
            `[data-id="${snappedBlocks[targetIndex - 1]}"]`
          );
          //if leftmost one is blank block, then target is leftmost
          if (leftmost.dataset.id.includes("blank")) {
            leftmost = target;
          }
          block.dataset.snapId = snapId;
          leftmost.dataset.snapId = snapId;
          //save to the target's snap
          snaps[snapId].splice(targetIndex, 0, block.dataset.id);
          //set the coordinates
          repositionSnappedGroup(snapId);
          //remove blank block
          let blankBlock = canvas.querySelector(
            `[data-id="blank-${block.dataset.id}"]`
          );
          blankBlock && blankBlock.remove();
          snapped = true;
          break;
        }
        case "right": {
          if (snapped) {
            break;
          }
          //TODO: check if snapping allowed on right
          //target is the element on left
          block.dataset.snapId = snapId;
          let targetIndex = snaps[target.dataset.snapId].findIndex(
            //find the index of target
            (item) => item === target.dataset.id
          );
          target.dataset.snapId = snapId;
          //save to target's snap
          snaps[snapId].splice(targetIndex + 1, 0, block.dataset.id);
          // snaps[target.dataset.snapId].push(block.dataset.id);
          //set coordinates
          repositionSnappedGroup(snapId);
          //remove blank block
          let blankBlock = canvas.querySelector(
            `[data-id="blank-${block.dataset.id}"]`
          );
          blankBlock && blankBlock.remove();
          snapped = true;
          break;
        }
      }
    }
  });

  if (snapped) {
    return;
  }

  //if not snapped, create blank block as we need to snap with leftmost block
  snapId = Math.random().toString(36).slice(2);
  let blankBlock = document.createElement("div");
  blankBlock.dataset.id = `blank-${block.dataset.id}`;
  blankBlock.className = "blank-block";
  blankBlock.style.top = `${exactTop}px`;
  blankBlock.style.left = `${exactLeft}px`;
  canvas.insertAdjacentElement("beforeend", blankBlock);

  blankBlock.dataset.snapId = snapId;
  block.dataset.snapId = snapId;
  //save in snapped array
  snaps[snapId] = [blankBlock.dataset.id, block.dataset.id];

  block.style.top = `${exactTop}px`;
  block.style.left = `${exactLeft}px`;
}

function getDistanceBetweenBlocks(target, moving) {
  //returns shortest distance and direction from moving element to target element
  let targetRect = target.getBoundingClientRect();
  let movingRect = moving.getBoundingClientRect();

  let distancesX = [
    {
      distance: Math.abs(targetRect.x - (movingRect.x + movingRect.width)),
      direction: "left",
    },
    {
      distance: Math.abs(targetRect.x + targetRect.width - movingRect.x),
      direction: "right",
    },
  ];
  let distancesY = [
    {
      distance:
        Math.abs(targetRect.y - (movingRect.y + movingRect.height)) +
        SNAP_SENSIBILITY / 2,
      direction: "top",
    },
    {
      distance: Math.abs(targetRect.y - movingRect.y) - SNAP_SENSIBILITY / 2,
      direction: "top",
    },
    {
      distance:
        Math.abs(targetRect.y + targetRect.height - movingRect.y) +
        SNAP_SENSIBILITY / 2,
      direction: "bottom",
    },
  ];

  //y is whether from top or bottom
  //x is whether from left or right

  return {
    y: distancesY.sort((a, b) => a.distance - b.distance)[0],
    x: distancesX.sort((a, b) => a.distance - b.distance)[0],
  };
}

function repositionSnappedGroup(snapId) {
  for (let i = 0; i < snaps[snapId].length; i++) {
    if (i !== 0) {
      let previousBlock = canvas.querySelector(
        `[data-id="${snaps[snapId][i - 1]}"]`
      );
      let blockOverlap = BLOCK_OVERLAP;
      //if it's 1st element keep no overlap on left
      i === 1 && (blockOverlap = BLOCK_GAP);
      let currentBlock = canvas.querySelector(
        `[data-id="${snaps[snapId][i]}"]`
      );
      //set the coordinates
      currentBlock.style.transition = "all 200ms ease-in-out";
      let t = setTimeout(() => {
        currentBlock.style.transition = "none";
      }, 210);
      currentBlock.style.top = previousBlock.style.top;
      currentBlock.style.left = `${
        parseFloat(previousBlock.style.left) +
        previousBlock.getBoundingClientRect().width +
        BLOCK_GAP -
        blockOverlap
      }px`;
    }
  }
}