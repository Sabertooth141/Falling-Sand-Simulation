let grid;
let cols;
let rows;
let res = 5;
let xSize = 1000;
let ySize = 800;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  // put setup code here
  createCanvas(xSize, ySize);
  cols = width / res;
  rows = height / res;
  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  // put drawing code here
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * res;
      let y = j * res;

      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, res - 1, res - 1);
      }
    }
  }

  let next = make2DArray(cols, rows);

  // compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // count live neighbors
      let state = grid[i][j];

      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let xcoord = (x + i + cols) % cols;
      let ycoord = (y + j + rows) % rows;

      sum += grid[xcoord][ycoord];
    }
  }

  sum -= grid[x][y];
  return sum;
}
