export class Controller {
  constructor (game, view) {
    this.game = game;
    this.view = view;
  }

  init(codeKey) {
    window.addEventListener('keydown', event => {
      if (event.code === codeKey) {
        this.view.init();
        this.start();
        this.game.createUpdatePanels(this.view.createBlockScore(), this.view.createBlockNextTetromino());
      }
    })
  }

  start() {
    this.view.showArea(this.game.viewArea);

    const tick = () => {
      if (this.game.gameOver) return;
      const time = (1000 - 100 * this.game.lvl);
      setTimeout(() => {
        this.game.moveDown();
        this.view.showArea(this.game.viewArea);
        tick();
        
      }, time > 100 ? time : 100);
    };

    tick();

    window.addEventListener('keydown', event => {
      const key = event.code;
      if (this.game.gameOver) return;

      switch (key) {
        case 'ArrowLeft':
          this.game.moveLeft();
          this.view.showArea(this.game.viewArea);
        break;
        case 'ArrowRight':
          this.game.moveRight();
          this.view.showArea(this.game.viewArea);
        break;
        case 'ArrowDown':
          this.game.moveDown();
          this.view.showArea(this.game.viewArea);
        break;
        case 'ArrowUp':
          this.game.rotateTetromino();
          this.view.showArea(this.game.viewArea);
        break;
      }
    });
  }
}
