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


  const createTile = () => {

    

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
        // console.log(pointTileHeightArray);
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

  setTimeout(() => {
    
  }, 5000)

  randomPointsTile();


  //Controle ==============

  let nowPosition = 1

  const moveRight = () => {
    doodle.style.left = nowPosition + 5 + 'px'
    nowPosition+=5 
  }

  const moveLeft = () => {
    doodle.style.left = nowPosition - 5 + 'px'
    nowPosition-=5 
  }

  document.addEventListener('keydown', (e) => {
    // console.log(e);
    if(e.code === 'ArrowRight') {
      moveRight()
    } else if(e.code === 'ArrowLeft') {
      moveLeft()
    }
  })

  //Controle ==============



  // const goTile = (doodleY) => {
  //   for(let i = 0; i< tile.length; i++) {
  //     tile[i].h = tile[i].h + 2
  //   }

  //   console.log(tile);
  // }



  //Jump ===============


  let top = 1.5;

  let downInterwal;

  let topInterval;

  let downPoint = 600;

  let topPointer = downPoint - 250;

  const goTop = (pointY) => {
    downInterwal = setInterval(() => {

      if (doodle.getBoundingClientRect().y < downPoint - 225) {
        top = top + 0.4;
        if (doodle.getBoundingClientRect().y < pointY - 200) {
          top = top + 0.5;
          if (doodle.getBoundingClientRect().y <= pointY - 250) {
            goBottom();
            clearInterval(downInterwal);
          }
        }
      }
      if(doodle.getBoundingClientRect().y < 300) {
        let doodleY = doodle.getBoundingClientRect().y
        // goTile(doodleY)
      }
      doodle.style.top = top + "px";
      top = top - 1.5;
    }, 1);
  };



  let testCouter = 0

  let coordTileCopy = tile.concat()

  

  const goBottom = () => {

    
    
    topInterval = setInterval(() => {

      let pointY = doodle.getBoundingClientRect().bottom
      let pointX = doodle.getBoundingClientRect().x

      if (pointY > tile[testCouter].h) {

      
        let pointTileX = 300 - tile[testCouter].w
        let pointDoodleX = 300 - pointX

        let pointMax = Math.max(pointTileX, pointDoodleX)
        let pointMin = Math.min(pointTileX, pointDoodleX)

        let difference = pointMax - pointMin

        if(difference < 42) {
          testCouter--
          top = top - 30;
          clearInterval(topInterval);
          goTop(pointY);
        }
        testCouter++
      } else if(pointY < tile[testCouter].h) {
        if(testCouter != 0) {
          testCouter--
        }
      } 

      // if (doodle.getBoundingClientRect().y < topPointer + 50) {
      //   top = top - 0.6;
      // }
      // if (doodle.getBoundingClientRect().bottom > downPoint) {
      //   top = top - 30;
      //   clearInterval(topInterval);
      //   goTop();
      // }
      doodle.style.top = top + "px";
      top = top + 1.2;
    }, 1);
  };

  goBottom();

  //Jump ===============
});




