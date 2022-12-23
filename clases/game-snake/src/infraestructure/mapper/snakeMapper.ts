// import Snake from '../../core/entitys/snake';
// import { SnakeModel } from '../DB/snakeModel';

// export default class SnakeMapper {
//   static toSnake(snakeEntity: SnakeModel): Snake {
//     const snake = new Snake();
//     snake.id = snakeEntity.id;
//     snake.direction = JSON.parse(snakeEntity.direction);
//     snake.head = JSON.parse(snakeEntity.head.toString());
//     snake.tail = JSON.parse(snakeEntity.tail.toString());
//     snake.size = snakeEntity.size;
//     return snake;
//   }

//   static toSnakeModel(snake: Snake): SnakeModel {
//     const snakeEntity = new SnakeModel();
//     snakeEntity.id = snake.id;
//     snakeEntity.direction = snake.direction;
//     snakeEntity.head = JSON.stringify(snake.head);
//     snakeEntity.tail = JSON.stringify(snake.tail);
//     snakeEntity.size = snakeEntity.size;
//     return snakeEntity;
//   }

// }

