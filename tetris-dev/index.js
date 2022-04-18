export const game = {
  area: [
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'x', 'x', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'x', 'x', 'o', 'o', 'o', 'o']
  ],

  activeTetromino: {
    x: 0,
    y: 0,
    block: [
      ['x', 'x', 'o'],
      ['o', 'x', 'x'],
      ['o', 'o', 'o'],
    ],
    rotationIndex: 0,
    rotations: [
      [
        ['x', 'x', 'o'],
        ['o', 'x', 'x'],
        ['o', 'o', 'o'],
      ],
      [
        ['o', 'o', 'x'],
        ['o', 'x', 'x'],
        ['o', 'x', 'o'],
      ],
      [
        ['o', 'o', 'o'],
        ['x', 'x', 'o'],
        ['o', 'x', 'x'],
      ],
      [
        ['o', 'x', 'o'],
        ['x', 'x', 'o'],
        ['x', 'o', 'o'],
      ],
    ]
  },
  static: {
    score: 0,
    level: 0,
  },

  // nextTetromino: this.getTetromino(),

  // getTetromino() {

  // },

  moveLeft() {
    if (this.checkOutPosition(this.activeTetromino.x - 1, this.activeTetromino.y)) {
      this.activeTetromino.x--
    }
  },

  moveRight() {
    if (this.checkOutPosition(this.activeTetromino.x + 1, this.activeTetromino.y)) {
      this.activeTetromino.x++
    }
  },

  moveDown() {
    if (this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y + 1)) {
      this.activeTetromino.y++
    } else {
      this.stopMove();
    }
  },

  checkOutPosition(x, y) {
    const tetromino = this.activeTetromino.block;
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j] === 'o') continue;
        if (!this.area[y + i] ||
          !this.area[y + i][x + j] ||
          this.area[y + i][x + j] === 'x') {
          return false
        }
      }
    }

    return true
  },

  stopMove() {
    const {x,y} = this.activeTetromino;
    const tetromino = this.activeTetromino.block;
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j] !== 'o') {
          this.area[y + i][x + j] = this.activeTetromino.block[i][j]
        }
      }
    }
  },

  rotateTetromino() {    
    this.activeTetromino.rotationIndex = this.activeTetromino.rotationIndex < 3 ? this.activeTetromino.rotationIndex + 1 : 0;
    this.activeTetromino.block = this.activeTetromino.rotations[this.activeTetromino.rotationIndex];
    
    if (!this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y)) {
      this.activeTetromino.rotationIndex = this.activeTetromino.rotationIndex > 0 ? this.activeTetromino.rotationIndex - 1 : 3;
      this.activeTetromino.block = this.activeTetromino.rotations[this.activeTetromino.rotationIndex];
    }    
  },

  get viewArea() {
    const area = JSON.parse(JSON.stringify(this.area));
    const {
      x,
      y
    } = this.activeTetromino;
    const tetromino = this.activeTetromino.block;
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j] !== 'o') {
          area[y + i][x + j] = this.activeTetromino.block[i][j]
        }
      }
    }
    return area;
  }

}

const container = document.querySelector('.container');
const canvas = document.createElement('canvas');

const context = canvas.getContext('2d');

container.append(canvas);
canvas.width= 300;
canvas.height= 600;
const widthBlock = 30;
const hightBlock = 30;

const showArea = (area) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < area.length; y++) {
    const line = area[y];

    for (let x = 0; x < line.length; x++) {
      const block = line[x];
  
      if (block === 'x') {
        context.fillStyle = 'tomato';

        context.fillRect(x * widthBlock, y * hightBlock, widthBlock, hightBlock);
      }
    }
  }
}

showArea(game.area)


window.addEventListener('keydown', (e) => {
  const key = e.code;

  switch (key) {
    case 'ArrowLeft':
      game.moveLeft();
      showArea(game.viewArea)
      break;
    case 'ArrowRight':
      game.moveRight();
      showArea(game.viewArea)
      break;
    case 'ArrowDown':
      game.moveDown();
      showArea(game.viewArea)
      break;
    case 'ArrowUp':
      game.rotateTetromino();
      showArea(game.viewArea)
      break;
  }
})