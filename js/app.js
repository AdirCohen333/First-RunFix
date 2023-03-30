'use strict'

const FLOOR = 'FLOOR'
const MINE = 'MINE'
const FLAG = 'FLAG'
var gLives
var HEART_IMG = '<img src="heart3.jpg">'
var gScoreCount
var gTotalBalls
const MINE_IMG = '<img src="MINE.png">'
const FLAG_IMG = '<img src="flag.png">'
var gBoard
var gGamerPos
var gIsFirstClick
var gCheckSquersLeft
var gMineCount
var gIsGameOn



function onInitGame(lvl) {
    gIsGameOn = true
    gIsFirstClick = true
    gBoard = onlvl(lvl)
    renderBoard(gBoard)
    gLives = 3
    // if(lvl = 1) gLives--
    gCheckSquersLeft = gBoard[0].length ** 2 - gMineCount - 1
    var elLives = document.querySelector('.lives')
    elLives.innerHTML = 'Lives Left: ' + gLives
    // -1 for first click
    // var elRestartGame = document.querySelector('.restartGame')
    // elRestartGame.classList.remove('hide')
    // var elHeartImg = document.querySelectorAll('.heart')
    // elHeartImg.style.display('')
    // elHeartImg.classList.add('hide')
    // elHeartImg.style.opacity=0;

}




function buildBoard(cells) {
    const board = []
    for (var i = 0; i < cells; i++) {
        board[i] = []
        for (var j = 0; j < cells; j++) {
            board[i][j] = { gameElement: FLOOR, mineCountAround: null }
            // gCheckSquersLeft = gBoard[0].length ** 2 - gMineCount - 1
        }
    }

    // for (var i = 0; i < 2; i++) {
    //     var mineLocation = board[getRandomInt(0, board.length)][getRandomInt(0, board.length)]
    //     if (mineLocation.gameElement !== MINE) {
    //         mineLocation.gameElement = MINE
    //     }
    //     else i--
    // }
    // setMinesNegsCount(board)
    return board
}
function onlvl(lvl) {
    if (lvl === 1) {
        var board = buildBoard(4)
        gMineCount = 2
    } else if (lvl === 2) {
        var board = buildBoard(8)
        gMineCount = 14
    } else if (lvl === 3) {
        var board = buildBoard(12)
        gMineCount = 32
    }
    // gCheckSquersLeft = gBoard[0].length ** gMineCount - 1 
    var elRestartGame = document.querySelector('.restartGame')
    elRestartGame.classList.add('hide')

    return board
}



function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            // const currCell = board[i][j]

            var cellClass = getClassName({ i, j })

            // if (currCell.gameElement === FLOOR || currCell.gameElement === MINE ) {
            cellClass += ' floor'
            // }
            strHTML += `\t<td class="cell ${cellClass}" 
                onclick="cellClicked(${i},${j},this)"
                oncontextmenu="onCellRightClick(${i},${j},this)">`
            // ononcontextmenu="cellRightClick(${i},${j},this)

            // ondblclick="cellDblClick(${i},${j},this) 
            //oncontextmenu


            // ondblclick
            // var elRestartGame = document.querySelector('.restartGame')
            // elRestartGame.classList.add('hide')

            // var elCell = document.querySelector(`.cell${i},${j}`)
            // elCell.classList.add('hide')
            // strHTML.classList.add('hide')
            //    var elCurrClass = document.querySelectorAll('.class')
            //    elCurrClass.classList.add('hide')
            // gBoard[i][j].mineCountAround.classList.add(hide)
            // gBoard[i][j].gameElement.classList.add(hide)
            // if(cellClicked(i,j)) {
            // if (currCell.gameElement === FLOOR) {
            // strHTML += gBoard[i][j].mineCountAround
            // strHTML += ''
            // } else if (currCell.gameElement === MINE) {
            // strHTML += MINE_IMG
            // strHTML += ''
            // } else
            //  if (currCell.gameElement === FLAG) {
            //     strHTML += FLAG_IMG
            // }
            // }
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    // strHTML += `\t<td title="${title}" class="cell ${className}" 
    //                         onclick="cellClicked(this, ${i}, ${j})" >
    //                      </td>\n`
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}


function onCellRightClick(i, j, elBtn) {
    elBtn.innerHTML = FLAG_IMG
    if (gBoard[i][j].gameElement === MINE) {
        gMineCount--
        checkIfWin()
    }

}
// function revealSquer(i,j){
//     strHTML += `\t<td class="cell ${cellClass}" 
//     onclick="cellClicked(${i},${j},this)">`
//     // cellClass += ' floor'
//     strHTML += `\t<td class="cell ${cellClass}" 
//                 onclick="cellClicked(${i},${j},this)">`
//                 strHTML += '</td>'
//                 strHTML += '</tr>'
// }


function cellClicked(i, j, elBtn) {   // need to be oncellclicked lol
    // var strHTML = '<tr>\n'
    console.log(elBtn)
    if (gIsGameOn) {
        if (gIsFirstClick) {
            for (var y = 0; y < gMineCount; y++) {
                var mineLocation = gBoard[getRandomInt(0, gBoard.length)][getRandomInt(0, gBoard.length)]
                if (mineLocation.gameElement !== MINE && mineLocation.gameElement !== gBoard[i][j]) {
                    mineLocation.gameElement = MINE
                } else y--
            }
            console.log('minecount', gMineCount)
            setMinesNegsCount(gBoard)
            elBtn.innerText = gBoard[i][j].mineCountAround
            gIsFirstClick = false

        } else {

            if (gBoard[i][j].gameElement !== MINE) {
                elBtn.innerText = gBoard[i][j].mineCountAround
                gCheckSquersLeft--
                checkIfWin()
                // if (gCheckWin === 0) {
                //     playsound()
                //     alert('you won')
                //     gameOver()
                // }
            } else {
                elBtn.innerHTML = MINE_IMG
                var elLives = document.querySelector('.lives')
                gMineCount--
                console.log('kaboom!!!')
                gLives--
                elLives.innerHTML = 'Lives Left: ' + gLives
                console.log('lives left', gLives)
                if (gLives <= 0) {
                    playsoundBoom()
                    alert('kaboommmm!!')
                    gameOver()
                }
            }
        }
    }
}

// var cellClass = getClassName({ i, j })
// strHTML += `\t<td class="cell ${cellClass}" 
// onclick="cellClicked(${i},${j})">`
// if (gBoard[i][j].gameElement !== MINE) {
// strHTML += MINE_IMG
// }
// strHTML += '</td>'
// strHTML += '</tr>'

// renderCell(gBoard[i][j], MINE)

// renderCell(gBoard[i][j], gBoard[i][j].mineCountAround)



function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location)
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}


function setMinesAroundCell(board, rowIdx, colIdx) {
    var minesNegsCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.gameElement === MINE) minesNegsCount++
        }

    }
    board[rowIdx][colIdx].mineCountAround = minesNegsCount
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            setMinesAroundCell(board, i, j)
        }
    }
}


function onHandleKey(event) {

    switch (event.key) {
        case 'Enter':
            restartGame(
            )
            break
            case 'ArrowRight':
                playsoundSecret()    // TOP SECRET SHIT
            break 
        // case '':
        // console.log('rightClick')
        // break
    }

}
//                 onMoveTo(i, j - 1)
//             break
//         case 'ArrowRight':
//             if (i === 5 && j === 11) onMoveTo(i, 0)
//             else
//                 onMoveTo(i, j + 1)
//             break
//         case 'ArrowUp':
//             if (i === 0 && j === 5) onMoveTo(9, j)
//             else onMoveTo(i - 1, j)
//             break
//         case 'ArrowDown':
//             if (i === 9 && j === 5) onMoveTo(0, j)
//             else
//                 onMoveTo(i + 1, j)
//             break

//     }
// }

// board[0][5] = { type: FLOOR, gameElement: null }
//             board[5][0] = { type: FLOOR, gameElement: null }
//             board[5][11] = { type: FLOOR, gameElement: null }
//             board[9][5] = { type: FLOOR, gameElement: null }
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}
function checkIfWin() {
    if (gCheckSquersLeft <= 0 && gMineCount <= 0) {
        playsound()
        alert('you won')
        gameOver()
    }
    console.log('squersleft', gCheckSquersLeft, 'minecount', gMineCount)



}
function gameOver() {
    gIsGameOn = false
    const elRestartGame = document.querySelector('.restartGame')
    elRestartGame.classList.remove('hide')
}

function restartGame() {
    if (gBoard.length === 4) onInitGame(1)
    else if (gBoard.length === 8) onInitGame(2)
    else if (gBoard.length === 12) onInitGame(3)
    var elRestartGame = document.querySelector('.restartGame')
    elRestartGame.classList.add('hide')
}



