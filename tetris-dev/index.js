import { Game } from "./module/game.js";
import { View } from "./module/view.js";
import { Controller } from "./module/controller.js";

export const COLUMNS = 10;
export const ROWS = 20;
export const SIZE_BLOCK = 25;

// механика
const game = new Game();

// отрисовка
const view = new View(document.querySelector('.container'))

// контроль
const controller = new Controller(game, view);

