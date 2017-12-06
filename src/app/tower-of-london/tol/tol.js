export var tol = (function () {
  return {
    initGame: initGame
  };

  function initGame(gameSettings, testConfig) {
    function mapTestConfigFile(serverTestConfig){
      var clientTestConfig = [];
      var counter = 0;
      serverTestConfig.forEach(function(serverTestConfigItem){
        var clientTestConfigItem = {};
        var serverTestConfigItemStart = JSON.parse(serverTestConfigItem.arrStart);
        var serverTestConfigItemEnd = JSON.parse(serverTestConfigItem.arrFinish);

        clientTestConfigItem.RoundStart = {};
        serverTestConfigItemStart.forEach(function(item){
          if(item.color=='blue')
          {
            clientTestConfigItem.RoundStart.blue = item.color=='blue'?item.id.substring(0,2):null;
          }
          if(item.color=='red')
          {
            clientTestConfigItem.RoundStart.red = item.color=='red'?item.id.substring(0,2):null;
          }
          if(item.color=='green')
          {
            clientTestConfigItem.RoundStart.green = item.id.substring(0,2);
          }
        });

        clientTestConfigItem.RoundFinish = {};
        serverTestConfigItemEnd.forEach(function(item){
          if(item.color=='blue')
          {
            clientTestConfigItem.RoundFinish.blue = item.color=='blue'?item.id.substring(0,2):null;
          }
          if(item.color=='red')
          {
            clientTestConfigItem.RoundFinish.red = item.color=='red'?item.id.substring(0,2):null;
          }
          if(item.color=='green')
          {
            clientTestConfigItem.RoundFinish.green = item.id.substring(0,2);
          }
        });

        clientTestConfigItem.NumberOfMoves = serverTestConfigItem.numMoves;
        clientTestConfigItem.GameRound = ++counter;
        clientTestConfig.push(clientTestConfigItem);
      })
      return clientTestConfig;
    }
    var game = 0;
    var canMove = false;
    var nm = 0;
    var nmWr = 0;
    var time;
    var totalTime;
    var initTTime;
    var gameTimer;
    var speed = 200;
    var gameData = mapTestConfigFile(testConfig);
    // gameData[0] = {
    //   GameRound: 1,
    //   RoundStart: {
    //     blue: 'p3',
    //     green: 'p2',
    //     red: 'p1'
    //   },
    //   RoundFinish: {
    //     blue: 'p3',
    //     green: 'p5',
    //     red: 'p6'
    //   },
    //   NumberOfMoves: 5
    // }
    // gameData[1] = {
    //   GameRound: 2,
    //   RoundStart: {
    //     blue: 'p3',
    //     green: 'p2',
    //     red: 'p1'
    //   },
    //   RoundFinish: {
    //     blue: 'p3',
    //     green: 'p5',
    //     red: 'p4'
    //   },
    //   NumberOfMoves: 5
    // }
    // gameData[2] = {
    //   GameRound: 2,
    //   RoundStart: {
    //     blue: 'p3',
    //     green: 'p5',
    //     red: 'p6'
    //   },
    //   RoundFinish: {
    //     blue: 'p3',
    //     green: 'p2',
    //     red: 'p1'
    //   },
    //   NumberOfMoves: 5
    // }
    // gameData[3] = {
    //   GameRound: 2,
    //   RoundStart: {
    //     blue: 'p3',
    //     green: 'p2',
    //     red: 'p5'
    //   },
    //   RoundFinish: {
    //     blue: 'p5',
    //     green: 'p6',
    //     red: 'p4'
    //   },
    //   NumberOfMoves: 5
    //}

    var gameSettings = gameSettings;

    //globals:
    var p1 = null;
    var p2 = null;
    var p3 = null;
    var p4 = null;
    var p5 = null;
    var p6 = null;
    var up = null;
    var up1 = null;
    var up2 = null;
    var up3 = null;
    //=================================================================
    var paperWidth = 330;
    var paperHeight = 500;

    var baseColor = '#7A5230';
    var pegColor = '#7A5230';
    var background = '#C1CDC1';
    var pegThick = 11;
    var r = 30;


    var red = null;
    var green = null;
    var blue = null;

    var rect = null;
    var peg1 = null;
    var peg2 = null;
    var peg3 = null;
    //draw dase with 3 pegs
    var gameTimer = null;

    function initField(gameNum, gameData) {

      p1 = null;
      p2 = null;
      p3 = null;
      p4 = null;
      p5 = null;
      p6 = null;

      up1 = null;
      up2 = null;
      up3 = null;
      $('#canvas_small').empty();
      var paper = new Raphael(document.getElementById('canvas_small'), paperWidth, paperHeight);

      var p1x = 50;
      var p1y = 350;
      var p2x = 150;
      var p2y = 350;
      var p3x = 250;
      var p3y = 350;

      var p1l1 = 50;
      var p1l2 = 170;
      var p2l1 = 150;
      var p2l2 = 220;
      var p3l1 = 250;
      var p3l2 = 280;

      var clickArea1 = makeLine("a1", paper, p1x, p1y, p1l1, p1l2, background, 50);
      var clickArea2 = makeLine("a2", paper, p2x, p2y, p2l1, p2l2, background, 50);
      var clickArea3 = makeLine("a3", paper, p3x, p3y, p3l1, p3l2, background, 50);

      rect = makeBase(paper, 20, 350, 260, 260, 5, baseColor, 40);
      peg1 = makeLine("peg1", paper, p1x, p1y, p1l1, p1l2, pegColor, pegThick);
      peg2 = makeLine("peg2", paper, p2x, p2y, p2l1, p2l2, pegColor, pegThick);
      peg3 = makeLine("peg3", paper, p3x, p3y, p3l1, p3l2, pegColor, pegThick);

      var clickArea1b = makeLine("b1", paper, p1x, p1y + 40, p1l1, p1l2 + 180, baseColor, 50);
      var clickArea2b = makeLine("b2", paper, p2x, p2y, p2l1, p2l2 + 170, baseColor, 50);
      var clickArea3b = makeLine("b3", paper, p3x, p3y + 40, p3l1, p3l2 + 70, baseColor, 50);

      var p;

      var round = gameData[gameNum - 1].RoundStart;

      red = makeRed(paper, p1x, p1y - r, r, "red", true);
      getPosition(round.red, red);
      blue = makeBlue(paper, p1x, p1y - r, r, "blue", true);
      getPosition(round.blue, blue);
      green = makeGreen(paper, p1x, p1y - r, r, "green", true);
      getPosition(round.green, green);

      setStartPosition(round.red, red);
      setStartPosition(round.blue, blue);
      setStartPosition(round.green, green);

      function getPosition(pos, obj) {
        switch (pos) {
          case "p1":
            obj.animate(Raphael.animation({
              transform: 't0 ' + (-270)
            }, 0));
            obj.animate(Raphael.animation({
              transform: 't0 ' + (0 - 4 * r)
            }, 0));
            break;
          case "p2":

            obj.animate(Raphael.animation({
              transform: 't0 ' + (-270)
            }, 0));
            obj.animate(Raphael.animation({
              transform: 't0 ' + (0 - 2 * r)
            }, 0));
            break;

          case "p3":

            obj.animate(Raphael.animation({
              transform: 't0 ' + (-270)
            }, 0));
            obj.animate(Raphael.animation({
              transform: 't0 ' + (0)
            }, 0));
            break;

          case "p4":

            obj.animate(Raphael.animation({
              transform: 't0 ' + (-270)
            }, 0));
            obj.animate(Raphael.animation({
              cx: 150, //150
              y: 0
            }, 0));
            obj.animate(Raphael.animation({
              transform: 't0 ' + (0 - 2 * r)
            }, 0));
            break;

          case "p5":

            obj.animate(Raphael.animation({
              transform: 't0 ' + (-270)
            }, 0));
            obj.animate(Raphael.animation({
              cx: 150, //150
              y: 0
            }, 0));
            obj.animate(Raphael.animation({
              transform: 't0 ' + (0)
            }, 0));
            break;



          case "p6":
            obj.animate(Raphael.animation({
              transform: 't0 ' + (-270)
            }, 0));
            obj.animate(Raphael.animation({
              cx: 250,
              y: 0
            }, 0));
            obj.animate(Raphael.animation({
              transform: 't0 ' + (0)
            }, 0));
        }
      }
    }


    //=================================================================================================
    function makeBase(paper, m1, m2, l1, l2, round, color, size) {
      var obj = paper.rect(m1, m2, l1, l2, round);
      obj.attr({
        fill: color,
        height: size
      });
    }

    function makeLine(num, paper, m1, m2, l1, l2, color, width) {
      var myPath = "M " + m1 + ", " + m2 + " L " + l1 + ", " + l2;
      var objName = paper.path(myPath);
      objName.attr({
        stroke: color,
        "stroke-width": width
      });
      objName.id = num;

      objName.node.onclick = function () {
        onclickPeg(objName)
      }
      return objName;

    }

    function makeRed(paper, p1, p2, r, color, move) {
      var red = paper.circle(p1, p2, r);
      red.id = color;
      red.attr({
        fill: color,
        "stroke-width": "2",
        stroke: 'black'
      });
      if (move) {
        red.node.onclick = function () {

          onclickRed(red);
        }
      }
      return red;
    }

    function makeGreen(paper, p1, p2, r, color, move) {
      var green = paper.circle(p1, p2, r);
      green.id = color;
      green.attr({
        fill: color,
        "stroke-width": "2",
        stroke: 'black'
      });
      if (move) {
        green.node.onclick = function () {
          onclickGreen(green);
        }
      }
      return green;
    }

    function makeBlue(paper, p1, p2, r, color, move) {
      var blue = paper.circle(p1, p2, r);
      blue.id = color;
      blue.attr({
        fill: color,
        "stroke-width": "2",
        stroke: 'black'
      });
      if (move) {
        blue.node.onclick = function () {
          onclickBlue(blue)

        }
      }
      return blue;
    }

    function setStartPosition(pos, obj) {
      if (pos == "p1")
        p1 = obj;
      else if (pos == "p2") {
        p2 = obj;
      } else if (pos == "p3") {
        p3 = obj;
      } else if (pos == "p4") {
        p4 = obj;
      } else if (pos == "p5") {
        p5 = obj;
      } else if (pos == "p6") {
        p6 = obj;
      }
    }

    var speed = 200;
    //from bottom to top
    var moveFromP6 = Raphael.animation({
      transform: 't0 ' + (-270)
    }, speed)

    var moveFromP5 = Raphael.animation({
      transform: 't0 ' + (-270)
    }, speed)

    var moveFromP4 = Raphael.animation({
      transform: 't0 ' + (-270)
    }, speed)

    var moveFromP3 = Raphael.animation({
      transform: 't0 ' + (-270)
    }, speed)

    var moveFromP2 = Raphael.animation({
      transform: 't0 ' + (-270)
    }, speed)

    var moveFromP1 = Raphael.animation({
      transform: 't0 ' + (-270)

    }, speed)



    //from top to bottom
    //     : peg 1
    var moveToP1 = Raphael.animation({
      transform: 't0 ' + (0 - 4 * r)
    }, speed)
    var moveToP2 = Raphael.animation({
      transform: 't0 ' + (0 - 2 * r)
    }, speed)
    var moveToP3 = Raphael.animation({
      transform: 't0 ' + (0)
    }, speed)

    //    : peg 2
    var moveToP5 = Raphael.animation({
      transform: 't0 ' + (0)
    }, speed)
    var moveToP4 = Raphael.animation({
      transform: 't0 ' + (0 - 2 * r)
    }, speed)
    //      : peg 1
    var moveToP6 = Raphael.animation({
      transform: 't0 ' + (0)
    }, speed)


    //from up1 to up3 (all)
    var moveU1U2 = Raphael.animation({
      cx: 150, //150
      y: 0
    }, speed);

    var moveU1U3 = Raphael.animation({
      cx: 250,
      y: 0
    }, speed);

    var moveU2U1 = Raphael.animation({
      cx: 50,
      y: 0
    }, speed);

    var moveU2U3 = Raphael.animation({
      cx: 250,
      y: 0
    }, speed);

    var moveU3U1 = Raphael.animation({
      cx: 50,
      y: 0
    }, speed);

    var moveU3U2 = Raphael.animation({
      cx: 150,
      y: 0
    }, speed)


    function onclickBlue(objName) {
      if (canMove) {

        if (up1 == null && up2 == null && up3 == null) {
          if (p6 == blue) {
            objName.animate(moveFromP6);
            up3 = blue;
            p6 = null;
            checkPos(true);
          } else if (p5 == blue && p4 == null) {
            objName.animate(moveFromP5)
            up2 = blue;
            p5 = null;
            checkPos(true);
          } else if (p4 == blue) {
            objName.animate(moveFromP4)
            up2 = blue;
            p4 = null;
            checkPos(true);
          } else if (p3 == blue && p2 == null && p1 == null) {
            objName.animate(moveFromP3)
            up1 = blue;
            p3 = null;
            checkPos();
          } else if (p2 == blue && p1 == null) {
            objName.animate(moveFromP2)
            up1 = blue;
            p2 = null;
            checkPos()
          } else if (p1 == blue) {
            objName.animate(moveFromP1)
            up1 = blue;
            p1 = null;
            checkPos(true);
          } else {
            checkPos();
          }

        } else if (up1 != null && up1 != blue) {
          if (p2 == blue && p1 == null) {
            up1.animate(moveToP1)
            p1 = up1;
            up1 = null;
            nm++;
            checkPos();

          } else if (p3 == blue && p2 == !null && p1 == null) {
            up1.animate(moveToP1);
            p1 = up1;
            up1 = null;
            nm++;
            checkPos();

          } else if (p3 == blue && p2 == null && p1 == null) {
            up1.animate(moveToP2);
            p2 = up1;
            up1 = null;
            nm++;
            checkPos();

          } else if (p5 == blue && p4 == null) {

            up1.animate(moveU1U2);
            up1.animate(moveToP4.delay(speed));
            p4 = up1;
            up1 = null;
            nm++;
            checkPos();
          } else if (p4 != null && p5 != null) {
            up1.animate(moveU1U2);
            up2 = up1;
            up1 = null;
            nmWr++;
            nm++;

          } else if (p6 != null) {
            up1.animate(moveU1U3);
            up3 = up1;
            up1 = null;
            nmWr++;
            nm++;

          }

        } else if (up2 != null && up2 != blue) {
          if (p2 == blue && p1 == null) {
            up2.animate(moveU2U1);
            up2.animate(moveToP1.delay(speed));
            p1 = up2;
            up2 = null;
            nm++;
            checkPos();


          } else if (p3 == blue && p2 == !null && p1 == null) {
            up2.animate(moveU1U2);
            up2.animate(moveToP1.delay(speed));
            p1 = up2;
            up2 = null;
            checkPos();


          } else if (p3 == blue && p2 == null && p1 == null) {
            up2.animate(moveU2U1);
            up2.animate(moveToP2.delay(speed));
            p2 = up2;
            up2 = null;
            nm++;
            checkPos();


          } else if (p5 == blue && p4 == null) {
            up2.animate(moveToP4);
            p4 = up2
            up2 = null;
            nm++;
            checkPos();
          } else if (p6 != null) {
            up2.animate(moveU2U3);
            up3 = up2;
            up2 = null;
            nmWr++;
            nm++;

          }
        } else {
          checkPos();
        }
        if (up3 != null && up3 != blue) {
          if (p2 == blue && p1 == null) {
            up3.animate(moveU3U1);
            up3.animate(moveToP1.delay(speed))
            p1 = up3;
            up3 = null;
            nm++;
            checkPos();
          } else if (p3 == blue && p2 == !null && p1 == null) {
            up3.animate(moveU3U2);
            up3.animate(moveToP1.delay(speed));
            p1 = up3;
            up3 = null;
            nm++;
            checkPos();
          } else if (p3 == blue && p2 == null && p1 == null) {
            up3.animate(moveU2U1);
            up3.animate(moveToP2.delay(speed));
            p2 = up3;
            up3 = null;
            nm++;
            checkPos();
          } else if (p5 == blue && p4 == null) {
            up3.animate(moveU3U2)
            up3.animate(moveToP4.delay(speed));
            p4 = up3;
            up3 = null;
            nm++;
            checkPos();
          } else if (p4 != null && p5 != null) {
            up3.animate(moveU3U2);
            up2 = up3;
            up3 = null;
            nmWr++;
            nm++;

          } else {
            checkPos();
          }

        } else {
          checkPos();
        }
      }
    }

    function onclickGreen(objName) {
      if (canMove) {
        if (up1 == null && up2 == null && up3 == null) {
          if (p6 == green) {
            objName.animate(moveFromP6);
            up3 = green;
            p6 = null;
            checkPos(true);

          } else if (p5 == green && p4 == null) {
            objName.animate(moveFromP5)
            up = green;
            p5 = null;
            up2 = green;
            checkPos();
          } else if (p4 == green) {
            objName.animate(moveFromP4);
            p4 = null;
            up2 = green;
            checkPos(true);
          } else if (p3 == green && p2 == null && p1 == null) {
            objName.animate(moveFromP3)
            up1 = green;
            p3 = null;
            checkPos();
          } else if (p2 == green && p1 == null) {
            objName.animate(moveFromP2)
            up1 = green;
            p2 = null;
            checkPos();

          } else if (p1 == green) {
            objName.animate(moveFromP1)
            up1 = green;
            p1 = null;
            checkPos(true);

          } else {
            checkPos();
          }

        } else if (up1 != null && up1 != green) {
          if (green == p5 && p4 == null) {
            up1.animate(moveU1U2);
            up1.animate(moveToP4.delay(speed));
            p4 = up1;
            up1 = null;
            nm++;
            checkPos();

          } else if (green == p2 && p1 == null) {
            up1.animate(moveToP1);
            p1 = up1;
            up1 = null;
            nm++;
            checkPos();

          } else if (green == p3 && p2 == null && p1 == null) {
            up1.animate(moveToP2);
            p2 = up1;
            up1 = null;
            nm++;
            checkPos();
          } else if (p4 != null && p5 != null) {
            up1.animate(moveU1U2);
            up2 = up1;
            up1 = null;
            nmWr++;
            nm++;

          } else if (p6 != null) {
            up1.animate(moveU1U3);
            up3 = up1;
            up1 = null;
            nmWr++;
            nm++;

          } else {
            checkPos();
          }

        } else if (up2 != null && up2 != green) {
          if (green == p2 && p1 == null) {
            up2.animate(moveU2U1);
            up2.animate(moveToP1.delay(speed));
            p1 = up2;
            up2 = null;
            nm++;
            checkPos();
          } else if (green == p3 && p1 == null && p2 != null) {
            up2.animate(moveU2U1);
            up2.animate(moveToP1.delay(speed));
            p1 = up2;
            up2 = null;
            nm++;
            checkPos();

          } else if (green == p3 && p1 == null && p2 == null) {
            up2.animate(moveU2U1);
            up2.animate(moveToP2.delay(speed));
            p2 = up2;
            up2 = null;
            nm++;
            checkPos();

          } else if (green == p5 && p4 == null) {
            up2.animate(moveToP4.delay(speed));
            p4 = up2;
            up2 = null;
            nm++;
            checkPos();
          } else if (p6 != null) {
            up2.animate(moveU2U3);
            up3 = up2;
            up2 = null;
            nmWr++;
            nm++;

          } else {
            checkPos();
          }


        } else if (up3 != null && up3 != green) {
          if (green == p2 && p1 == null) {
            up3.animate(moveU3U1);
            up3.animate(moveToP1.delay(speed));
            p1 = up3;
            up3 = null;
            nm++;
            checkPos();
          } else if (green == p3 && p1 == null && p2 != null) {
            up3.animate(moveU3U1);
            up3.animate(moveToP1.delay(speed));
            p1 = up3;
            up3 = null;
            nm++;
            checkPos();

          } else if (green == p3 && p1 == null && p1 == null) {
            up3.animate(moveU3U1);
            up3.animate(moveToP2.delay(speed));
            p2 = up3;
            up3 = null;
            nm++;
            checkPos();

          } else if (green == p5 && p4 == null) {
            up3.animate(moveU3U2);
            up3.animate(moveToP4.delay(speed));
            p4 = up3;
            up3 = null;
            nm++;
            checkPos();
          } else if (p4 != null && p5 != null) {
            up3.animate(moveU3U2);
            up2 = up3;
            up3 = null;
            nmWr++;
            nm++;

          } else {
            checkPos();
          }
        }
      }
    }
    var prevPos;

    function onclickRed(objName) {
      if (canMove) {
        if (up1 == null && up2 == null && up3 == null) {
          if (p6 == red) {
            objName.animate(moveFromP6);
            up3 = red
            p6 = null;
            checkPos(true);
          } else if (p5 == red && p4 == null) {
            objName.animate(moveFromP5)
            up2 = red;
            p5 = null;
            checkPos();
          } else if (p4 == red) {
            objName.animate(moveFromP4)
            up2 = red;
            p4 = null;
            checkPos(true);
          } else if (p3 == red && p2 == null && p1 == null) {
            objName.animate(moveFromP3)
            up1 = red;
            p3 = null;
            checkPos();
          } else if (p2 == red && p1 == null) {
            objName.animate(moveFromP2)
            up1 = red;
            p2 = null;
            checkPos(true);
          } else if (p1 == red) {
            objName.animate(moveFromP1)
            up1 = red;
            p1 = null;
            checkPos(true);
          } else {
            checkPos();
          }

        } else if (up1 != null && up1 !== red) {
          if (p2 == red && p1 == null) {
            up1.animate(moveToP1)
            p1 = up1;
            up1 = null;
            nm++;
            checkPos();


          } else if (p3 == red && p2 == !null && p1 == null) {
            up1.animate(moveToP1);
            p1 = up1;
            up1 = null;
            nm++;
            checkPos();

          } else if (p3 == red && p2 == null && p1 == null) {
            up1.animate(moveToP2);
            p2 = up1;
            up1 = null;
            nm++;
            checkPos();

          } else if (p5 == red && p4 == null) {
            up1.animate(moveU1U2);
            up1.animate(moveToP4.delay(speed));
            p4 = up1;
            up1 = null;
            nm++;
            checkPos();

          } else if (p4 !== null && p5 !== null) {
            nmWr++;
            nm++;

            up1.animate(moveU1U2);
            up2 = up1;
            up1 = null;
          } else if (p6 != null) {
            up1.animate(moveU1U3);
            up3 = up1;
            up1 = null;
            nmWr++;
            nm++;

          } else {

            checkPos();
          }
        } else if (up2 != null && up2 !== red) {
          if (p2 == red && p1 == null) {
            up2.animate(moveU2U1);
            up2.animate(moveToP1.delay(speed))
            p1 = up2;
            up2 = null;
            nm++;
            checkPos();
          } else if (p3 == red && p2 == !null && p1 == null) {
            up2.animate(moveU1U2);
            up2.animate(moveToP1.delay(speed));
            p1 = up2;
            up2 = null;
            nm++;
            checkPos();
          } else if (p3 == red && p2 == null && p1 == null) {
            up2.animate(moveU2U1);
            up2.animate(moveToP2.delay(speed));
            p2 = up2;
            up2 = null;
            nm++;
            checkPos();



          } else if (p5 == red && p4 == null) {
            up2.animate(moveToP4.delay(speed));
            p4 = up2;
            up2 = null;
            nm++;
            checkPos();


          } else if (p6 != null) {
            up2.animate(moveU2U3);
            up3 = up2;
            up2 = null;
          } else {
            checkPos();
          }

        }
        if (up3 != null && up3 !== red) {
          if (p2 == red && p1 == null) {
            up3.animate(moveU3U1);
            up3.animate(moveToP1.delay(speed))
            p1 = up3;
            up3 = null;
            nm++;
            checkPos();

          } else if (p3 == red && p2 == !null && p1 == null) {
            up3.animate(moveU3U2);
            up3.animate(moveToP1.delay(speed));
            p1 = up3;
            up3 = null;
            up = null;
            nm++;
            checkPos();

          } else if (p3 == red && p2 == null && p1 == null) {
            up3.animate(moveU3U1);
            up3.animate(moveToP2.delay(speed));
            p2 = up3;
            up3 = null;
            up = null;
            nm++;
            checkPos();

          } else if (p5 == red && p4 == null) {
            up3.animate(moveU3U2)
            up3.animate(moveToP4.delay(speed));
            p4 = up3;
            up3 = null;
            nm++;
            checkPos();
          } else if (p4 !== null && p5 !== null) {
            up3.animate(moveU3U2);
            up2 = up3;
            up3 = null;
            nmWr++;
            nm++;

          } else {
            checkPos();
          }
        } else {
          checkPos();
        }
      }
    }

    function onclickPeg(objName) {
      if (canMove) {
        if (objName.id == "peg1" || objName.id == "a1" || objName.id == "b1") {

          if (up1 != null) {
            if (p3 == null && p2 == null && p1 == null) {
              up1.animate(moveToP3);
              p3 = up1;
              up1 = null;
              nm++;
              checkPos();

            } else if (p3 != null && p2 == null && p1 == null) {
              up1.animate(moveToP2)
              p2 = up1;
              up1 = null;
              nm++;
              checkPos();
            } else if (p3 != null && p2 != null && p1 == null) {
              up1.animate(moveToP1);
              p1 = up1;
              up1 = null;
              nm++;
              checkPos();
            } else {
              checkPos();
            }
          } else if (up2 != null) {
            if (p3 == null && p2 == null && p1 == null) {
              up2.animate(moveU2U1);
              up2.animate(moveToP3.delay(speed));
              p3 = up2;
              up2 = null;
              nm++;
              checkPos();

            } else if (p3 != null && p2 == null && p1 == null) {
              up2.animate(moveU2U1);
              up2.animate(moveToP2.delay(speed));
              p2 = up2;
              up2 = null;
              nm++;
              checkPos();
            } else if (p3 != null && p2 != null && p1 == null) {
              up2.animate(moveU2U1);
              up2.animate(moveToP1.delay(speed));
              p1 = up2;
              up2 = null;
              nm++;
              checkPos();
            } else {
              checkPos();
            }

          } else if (up3 != null) {

            if (p3 == null && p2 == null && p1 == null) {
              up3.animate(moveU3U1);
              up3.animate(moveToP3.delay(speed));
              p3 = up3;
              up3 = null;
              nm++;
              checkPos();

            } else if (p3 != null && p2 == null && p1 == null) {
              up3.animate(moveU3U1);
              up3.animate(moveToP2.delay(speed));
              p2 = up3;
              up3 = null;
              nm++;
              checkPos();
            } else if (p3 != null && p2 != null && p1 == null) {
              up3.animate(moveU3U1);
              up3.animate(moveToP1.delay(speed));
              p1 = up3;
              up3 = null;
              nm++;
              checkPos();
            } else {
              checkPos();
            }

          }

        } else if (objName.id == "peg2" || objName.id == "a2" || objName.id == "b2") {

          if (up1 !== null) {
            if (p4 == null && p5 !== null) {
              up1.animate(moveU1U2);
              up1.animate(moveToP4.delay(speed))
              p4 = up1;
              up1 = null;
              nm++;
              checkPos();
            } else if (p4 == null && p5 == null) {
              up1.animate(moveU1U2);
              up1.animate(moveToP5.delay(speed));
              p5 = up1;
              up1 = null;
              nm++;
              checkPos();
            } else {
              checkPos();
            }

          }
          if (up2 != null) {
            if (p4 == null && p5 !== null) {

              up2.animate(moveToP4.delay(speed))
              p4 = up2;
              up2 = null;
              nm++;
              checkPos();
            } else if (p4 == null && p5 == null) {

              up2.animate(moveToP5.delay(speed));
              p5 = up2;
              up2 = null;
              nm++;
              checkPos();
            } else {
              checkPos();
            }

          }
          if (up3 != null) {
            if (p4 == null && p5 !== null) {
              up3.animate(moveU3U2);
              up3.animate(moveToP4.delay(speed))
              p4 = up3;
              up3 = null;
              nm++;
              checkPos();
            } else if (p4 == null && p5 == null) {
              up3.animate(moveU3U2);
              up3.animate(moveToP5.delay(speed));
              p5 = up3;
              up3 = null;
              nm++;
              checkPos();
            } else {
              checkPos();
            }

          }

        } else if (objName.id == "peg3" || objName.id == "a3" || objName.id == "b3") {
          if (p6 == null) {
            if (up1 != null) {
              up1.animate(moveU1U3);
              up1.animate(moveToP6.delay(speed));
              p6 = up1;
              up1 = null;
              nm++;
              checkPos();
            } else if (up2 != null) {
              up2.animate(moveU2U3);
              up2.animate(moveToP6.delay(speed));
              p6 = up2;
              up2 = null;
              nm++;
              checkPos();
            } else if (up3 != null) {
              up3.animate(moveToP6);
              p6 = up3;
              up3 = null;
              nm++;
              checkPos();
            } else {
              checkPos();
            }
          }
        } else {
          checkPos();
        }
      }

    }
    var gameDataGlobal;

    function showImage(currentGame, gameData) {
      gameDataGlobal = gameData;
      //game 1==========================================================


      //=================================================================

      var imageplace = new Raphael(document.getElementById('image_holder'), paperWidth, paperHeight);
      var pos1x = 50;
      var pos1y = 350;
      var pos2x = 150;
      var pos2y = 350;
      var pos3x = 250;
      var pos3y = 350;
      var pos1l1 = 50;

      var pos1l2 = 170;
      var pos2l1 = 150;
      var pos2l2 = 220;
      var pos3l1 = 250;
      var pos3l2 = 280;
      var rect = makeBase(imageplace, 20, 350, 260, 260, 5, baseColor, 40);
      var poseg1 = makeLine("peg11", imageplace, pos1x, pos1y, pos1l1, pos1l2, pegColor, pegThick);
      var poseg2 = makeLine("peg21", imageplace, pos2x, pos2y, pos2l1, pos2l2, pegColor, pegThick);
      var poseg3 = makeLine("peg31", imageplace, pos3x, pos3y, pos3l1, pos3l2, pegColor, pegThick);
      var p;


      //var round = JSON.parse(gameData[currentGame - 1].RoundFinish);     //=======TODO=====
      var round = gameData[currentGame - 1].RoundFinish;



      p = getPosition(round.red);
      var redL = makeRed(imageplace, p.x, p.y, r, "red");
      p = getPosition(round.blue);
      var blueL = makeBlue(imageplace, p.x, p.y, r, "blue");
      p = getPosition(round.green);
      var greenL = makeGreen(imageplace, p.x, p.y, r, "green");
      //==========================================================================

      game = currentGame;
      return 0;

      function getPosition(pos) {
        switch (pos) {
          case "p1":
            return pos = {
              x: pos1x,
              y: pos1y - 5 * r
            };
          case "p2":
            {
              return pos = {
                x: pos1x,
                y: pos1y - 3 * r
              }
            }
          case "p3":
            {
              return pos = {
                x: pos1x,
                y: pos1y - r


              }
            }
          case "p4":
            {
              return pos = {
                x: pos2x,
                y: pos2y - 3 * r
              }
            }
          case "p5":
            {
              return pos = {
                x: pos2x,
                y: pos2y - r


              }
            }
          case "p6":
            {
              return pos = {
                x: pos3x,
                y: pos3y - r
              }
            }
        }
      }
    }
    var state = false;

    function startGame(gameNum) {
      if (state == "true") {
        goToPage();
      }

      canMove = true;
      var text = gameSettings.Instructions;

      hideFinalMessage();
      nm = 0;
      nmWr = 0;
      initTTime = 0;
      totalTime;

      if (gameNum == 1) {
        displayInstructions(text);
        var field = document.getElementById("countdown");
        field.style.display = 'none';
      } else {
        countdown()
        time = getTime();
      }

      initField(gameNum, gameData);
      showImage(gameNum, gameData);

      game = gameNum;
    }

    function countdown() {
      window.clearTimeout(gameTimer);
      var timeMlsec = gameSettings.TimeOut * 1000
      var numMoves = JSON.parse(gameData[game - 1].NumberOfMoves);
      gameTimer = null;
      gameTimer = setTimeout(function () {
        displayFinalMessageOnTimeout(numMoves, lastMove, timeMlsec)
      }, timeMlsec);

    }

    function hideFinalMessage() {
      var finalMessage = document.getElementById("finalMessage");
      if (finalMessage != null)
        finalMessage.style.display = 'none';
    }

    function displayTestFinishedMessage() {

      $('#testArea').empty();
      var str = gameSettings.InstructionsFinish;
      var btn = gameSettings.TxtButton;
      $("#testArea").append("<div id = 'finishesTest' class='center finishesTest '><p>" + str + " <br/></p><input type='button' id='finishIt'class='signup-btn' value='" + btn + "'></div>");

    }

    function displayFinalMessageOnTimeout(numMoves, lastMove, timeMlsec) {

      canMove = false;
      var text = gameSettings.TextOverTime;
      var finalMessage = document.getElementById("finalMessage");
      finalMessage.style.display = '';
      finalMessage.innerHTML = text;

      setTimeout(hideFinalMessage, 2000);
      if (game == lastMove) {
        updateTestFinished();
        displayTestFinishedMessage();
      }

      //passResultsForGame(game, timeMlsec, timeMlsec, gameSettings.MaxMoves, nmWr, true, false, numMoves);
      passResultsForGame(game, timeMlsec, timeMlsec, numMoves, nmWr, true, false, numMoves);
      setTimeout(function () {
        startCountDownTimer(game + 1);
      }, 2000);
    }

    function displayFinalMessage20move(game) {
      canMove = false;
      var text = gameSettings.TextOverMoves; //TODO
      var lastMove = parseInt(gameSettings.PrctRounds) + parseInt(gameSettings.TestRounds)
      var over = new Date() - time;
      var finalMessage = document.getElementById("finalMessage");
      finalMessage.style.display = '';
      finalMessage.innerHTML = text; //"You made more that 20 moves in trial " + game + ". The new trial will start soon.";
      setTimeout(hideFinalMessage, 2000);
      if (game == lastMove) {
        updateTestFinished();
        displayTestFinishedMessage();
      }
      //var minMoves = mapGameMoves(game)
      passResultsForGame(game, initTTime, over, gameSettings.MaxMoves, nmWr, false, true, numMoves);
      setTimeout(function () {
        startCountDownTimer(game + 1);
      }, 2000);

    }

    function displayFinalMessage(needMoves, madeMoves) {
      canMove = false;
      var text = gameSettings.Feedback;

      if (text.indexOf("[nm]") != -1) {
        var res = text.split("[nm]");
        text = res[0] + madeMoves + res[1];
      }
      if (text.indexOf("[mm]") != -1) {
        var res = text.split("[mm]");
        text = res[0] + needMoves + res[1];
      }

      var finalMessage = document.getElementById("finalMessage");
      finalMessage.style.display = '';
      finalMessage.innerHTML = text;
      setTimeout(hideFinalMessage, 2000);
    }

    function displayInstructions(text) {
      canMove = false;
      if (gameSettings.TxtToSpeech)
        $("#play").show();
      else
        $("#play").hide();
      var field = document.getElementById("displayMessageL");
      field.textContent = text;
      field.onclick = function run() {
        canMove = true;
        field.style.display = 'none';
        $("#play").hide();
        totalTime = getTime();
        time = getTime();
      }
    }

    function startCountDownTimer(game) {
      canMove = false;
      var timeleft = parseInt(gameSettings.CountDownFrom);
      if (gameSettings.ShowFeedback == "True")
        timeleft += 1;
      var text = gameSettings.CountDownText;

      if (text.indexOf("[cd]") != -1) {
        var res = text.split("[cd]");
        text = res[0] + "<span id='countdowntimer'>" + (timeleft) + "</span>" + res[1];
      }

      canMove = false;
      var field = document.getElementById("countdown");
      field.style.display = '';
      field.innerHTML = text; //"Please wait <span id='countdowntimer'>" + (timeleft+ 2) + " </span> seconds";
      var div = document.getElementById("countdowntimer");
      var downloadTimer = setInterval(function () {
        timeleft--;
        if (timeleft <= 0) {

          clearInterval(downloadTimer);
          cleanDivs();
          field.style.display = 'none';
          startGame(game)
        }

      }, 1000);
    }

    function finishGame(needMoves) {
      canMove = false;
      var lastMove = parseInt(gameSettings.PrctRounds) + parseInt(gameSettings.TestRounds)
      window.clearTimeout(gameTimer);
      var over = new Date() - time;

      if (gameSettings.ShowFeedback == "True")
        setTimeout(function () {
          displayFinalMessage(needMoves, nm);
        }, 1200)

      if (game == lastMove) {
        setTimeout(function () {
          displayTestFinishedMessage();
        }, 3200);

      } else {
        game++;
        setTimeout(function () {
          startCountDownTimer(game);
        }, 2000);
      }
    }

    function getMatchPos(pos, color) {
      if (pos == "p1") {
        if (p1 != null && p1.id == color)
          return true;
        else
          return false;
      }
      if (pos == "p2") {
        if (p2 != null && p2.id == color)
          return true;
        else
          return false;
      }
      if (pos == "p3") {
        if (p3 != null && p3.id == color)
          return true;
        else
          return false;
      }
      if (pos == "p4") {
        if (p4 != null && p4.id == color)
          return true;
        else
          return false;
      }
      if (pos == "p5") {
        if (p5 != null && p5.id == color)
          return true;
        else
          return false;
      }
      if (pos == "p6") {
        if (p6 != null && p6.id == color)
          return true;
        else
          return false;
      }
    }

    function checkPos(out) {
      var canMove = false;
      var finishPos = gameData[game - 1].RoundFinish;
      var numMoves = gameData[game - 1].NumberOfMoves;

      if (nm == gameSettings.MaxMoves) {
        displayFinalMessage20move(game)
      }
      canMove = false;
      setTimeout(function () {
        canMove = true
      }, 300);
      //
      if (1 == 1) {
        if (nm == 0) {
          initTTime = new Date() - time;
        }
      }

      var red = finishPos.red;
      var blue = finishPos.blue;
      var green = finishPos.green;

      if (getMatchPos(finishPos.red, "red") &&
        getMatchPos(finishPos.blue, "blue") &&
        getMatchPos(finishPos.green, "green")) {
        finishGame(numMoves);
      } else {
        setTimeout(function () {
          canMove = true
        }, 300);
      }
    };

    function getTime() {

      return new Date();
    }

    function cleanDivs() {
      $("#canvas_small").remove();
      $("#canvas_small_wrapper").append("<div id = 'canvas_small' class='left'></div>");
      $("#image_holder").remove();
      $("#image_holder_wrapper").append("<div id = 'image_holder' class='display'></div>");

    }
    var arrData = [];
    var save = false;

    function passResultsForGame(game, initThinkTime, totalTime, nm, nmWrong, overTime, overMoves, minMoves) {

      var data = {
        'game': game,
        'initThinkTime': initThinkTime / 1000,
        'timeTotal': totalTime / 1000,
        'numberOfMoves': nm,
        'numberOfWrongMoves': nmWrong,
        'overTime': overTime,
        'overMoves': overMoves,
        'minMoves': numMoves
      }
      arrData.push(data);
    }


    function updateTestFinished() {
      if (save == true) {
        saveTextAsFile();
      }
      localStorage.setItem("tId", document.getElementById("tId").value);
      localStorage.setItem("finished", true);
      state = true;
    }

    function goToPage() {
      if (gameSettings.DisplayResults) {
        var user = document.getElementById("userId").value;
        var tId = document.getElementById("tId").value;
        window.location.href = "ResultsPage.aspx?userId=" + user + "&tid=" + tId + "&test=2";
      } else
        window.location.href = "UserProfile.aspx";
    }

    function saveTextAsFile() {
      var user = document.getElementById("userId").value;
      var tId = document.getElementById("tId").value;
      var text = "UserId: " + user + ".\r\n" +
        "TestId: " + tId + ".\r\n"
      arrData.forEach(function (element) {
        text += JSON.stringify(element) + ".\r\n";
      });
      var textToSave = text;
      var textToSaveAsBlob = new Blob([textToSave], {
        type: "text/plain"
      });
      var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
      var fileNameToSaveAs = 'Tower' + tId + (new Date()).toISOString().substring(0, 10); //document.getElementById("inputFileNameToSaveAs").value;

      var downloadLink = document.createElement("a");
      downloadLink.download = fileNameToSaveAs;
      downloadLink.innerHTML = "Download File";
      downloadLink.href = textToSaveAsURL;
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      alert("There was a connection problem. Your results were saved in a file " + fileNameToSaveAs + " in Downloads folder.")
    }

    function destroyClickedElement(event) {
      document.body.removeChild(event.target);
    }

    function onClickPlay() {

      speechSynthesis.cancel();

      // var text = "Видишь эти две доски? Они оба одинаковы.";
      var text = gameSettings.Instructions;


      var sentences = text.split(".")
      for (var i = 0; i < sentences.length; i++) {
        var sentence = sentences[i];

        var synth = speechSynthesis;
        var language = gameSettings.Language;
        var utterance = new SpeechSynthesisUtterance();
        utterance.volume = 1;
        utterance.text = sentence;
        synth.speak(utterance);
      }
      if (language != "") {}
    }
    var playEle = document.querySelector('#play');
    playEle.addEventListener('click', onClickPlay);
    $('#play').hide();
    $('#workArea').val(gameSettings.WorkTag);
    $('#goalArea').val(gameSettings.EndTag);
    startGame(1);
  };
})();
