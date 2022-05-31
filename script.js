document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.querySelector(".wrapper");

  const doodle = document.createElement("img");

  const duddlePng = "doodle.png";

  doodle.src = duddlePng;

  canvas.append(doodle);

  let tile = [];

  let pointTileHeightArray = [];
  let pointTileWidthArray = [];

  let counter = 0;

  let skolko = 0

  const createTile = () => {

    skolko++
    

    if(counter == 0) {

      for(let i = 0; i < pointTileHeightArray.length;) {
        for(let z = 0; z < pointTileWidthArray.length; z++) {
          tile.push({h: pointTileHeightArray[i], w: pointTileWidthArray[z]})
          i++
        }
      }

      counter++
      tile.map((item) => {

        let tile = document.createElement("div");
        tile.className = "tile";

          tile.style.top = item.h + "px";
          tile.style.left = item.w + "px";

        canvas.append(tile);
      });
    }
  };

  const checkPoint = () => {


  
    let startCurrent = -15
    pointTileHeightArray.sort((a, b) => a - b);


    for(let i=0;i<pointTileHeightArray.length;i++) {
      if(startCurrent + 15 < pointTileHeightArray[i]) {
        startCurrent = pointTileHeightArray[i]
        console.log(pointTileHeightArray);
      } else {
        pointTileHeightArray = [];
        pointTileWidthArray = [];
        startCurrent = -15
        randomPointsTile()
      } 

    }
    createTile();
  }

  const randomPointsTile = () => {
    for (let i = 0; i < 10; ) {
      const pointTileHeight = Math.round(Math.random() * 1000);
      const pointTileWidth = Math.round(Math.random() * 1000);

      if (pointTileHeight < 590 && pointTileWidth < 250) {

        pointTileHeightArray.push(pointTileHeight);
        pointTileWidthArray.push(pointTileWidth);

        if(pointTileHeightArray.length == 10 && pointTileWidthArray.length == 10) {
          checkPoint()
        }
        i++;
      }  
    }
  };

  randomPointsTile();

  let top = 1.5;

  let downInterwal;

  let topInterval;

  let downPoint = 600;

  let topPointer = downPoint - 250;

  const goTop = () => {
    downInterwal = setInterval(() => {
      if (doodle.getBoundingClientRect().y < downPoint - 50) {
        top = top + 0.5;
        if (doodle.getBoundingClientRect().y < downPoint - 200) {
          top = top + 0.4;
          if (doodle.getBoundingClientRect().y < downPoint - 250) {
            goBottom();
            clearInterval(downInterwal);
          }
        }
      }
      doodle.style.top = top + "px";
      top = top - 1.5;
    }, 1);
  };

  const goBottom = () => {
    topInterval = setInterval(() => {
      if (doodle.getBoundingClientRect().y < topPointer + 50) {
        top = top - 0.6;
      }
      if (doodle.getBoundingClientRect().bottom > downPoint) {
        top = top - 30;
        clearInterval(topInterval);
        goTop();
      }
      doodle.style.top = top + "px";
      top = top + 1.5;
    }, 1);
  };

  goBottom();
});



// let num = 5

// function resilt(num, plus, minus) {
//     plus(num + 5)
//     minus(num + 10)
// }

// resilt(num, function(e) {console.log(e);}, (e) => {console.log(e);})

// let btn = document.querySelector('.btn');

// btn.addEventListener('click' ,(e) => {
//     secondClick('gfd')
// })

// function oneClick() {
//     return () => {
//         secondClick()
//     }
// }

// oneClick()

// function secondClick(e) {
//     console.log(e)
// }

// console.log(secondClick)

//Рекурсия

// function fuc(num) {
//   if(num == 1) return num
//   return num * fuc(num - 1)
// }

// let result = fuc(5)

// console.log(result)

//Замыкание

// function some() {
//     let value = 5

//     function plus() {
//         return  {
//             name: 'John',
//             age: 20 + value
//         }
//     }

//     return plus()
// }

// let value = some()

// let {name, age} = value

// console.log(age)

//!!

// let str = '';

// console.log(!!str)

// ~

// let arr = [1,2,3,4,5];

// let resSerch = arr.indexOf(1);

// if (~resSerch) {
//     console.log('Нашлось значение')
// } else {
//     console.log('Значение не найдено')
// }
