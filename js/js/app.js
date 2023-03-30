'use strict'
//wensdey

const FLOOR = 'FLOOR'
const MINE = 'MINE'
const FLAG = 'FLAG'
var gLives = 3
var HEART_IMG
var gScoreCount
var gTotalBalls
const MINE_IMG = '<img src="MINE.png">'
const FLAG_IMG = '<img src="flag.png">'
var gBoard
var gGamerPos
var gIsFirstClick
var gCheckWin
var gIsGameOn = true

function onInitGame() {
    gIsGameOn = true
    gIsFirstClick = true
    gBoard = buildBoard()
    renderBoard(gBoard)
    gLives = 3
    gCheckWin = gBoard[0].length ** 2 - 2   //gBoard[0].length ** 2 - mineCount
    // const elHeartImg = document.querySelector(`heart1.jpg`)
    // elHeartImg.classList.add('hide1')
    // HEART_IMG.classlist.add('hide')
}




function buildBoard() {
    const board = []
    for (var i = 0; i < 4; i++) {
        board[i] = []
        for (var j = 0; j < 4; j++) {
            board[i][j] = { gameElement: FLOOR, mineCountAround: null}
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



function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]

            var cellClass = getClassName({ i, j })

            // if (currCell.gameElement === FLOOR || currCell.gameElement === MINE ) {
            cellClass += ' floor'
            // }
            strHTML += `\t<td class="cell ${cellClass}" 
                onclick="cellClicked(${i},${j},this)">`
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
// function revealSquer(i,j){
//     strHTML += `\t<td class="cell ${cellClass}" 
//     onclick="cellClicked(${i},${j},this)">`
//     // cellClass += ' floor'
//     strHTML += `\t<td class="cell ${cellClass}" 
//                 onclick="cellClicked(${i},${j},this)">`
//                 strHTML += '</td>'
//                 strHTML += '</tr>'
// }


function cellClicked(i, j, elBtn) {
    // var strHTML = '<tr>\n'
    console.log(elBtn)
    if (gIsGameOn) {
        if (gIsFirstClick) {
            for (var i = 0; i < 2; i++) {
                var mineLocation = gBoard[getRandomInt(0, gBoard.length)][getRandomInt(0, gBoard.length)]
                if (mineLocation.gameElement !== MINE || mineLocation.gameElement !== gBoard[i][j] ) {
                    mineLocation.gameElement = MINE
                } else i--
            }
            setMinesNegsCount(gBoard)
            elBtn.innerText = gBoard[i][j].mineCountAround
            gIsFirstClick = false
            renderBoard(gBoard)
            
        }else{
           
        if (gBoard[i][j].gameElement !== MINE) {
            elBtn.innerText = gBoard[i][j].mineCountAround
            // revealSquer(i,j)
            // strHTML += gBoard[i][j].mineCountAround                  ///////////////////////////////////////
            
                gCheckWin--
                console.log('squers left', gCheckWin)
                if (gCheckWin === 0) {
                    playsound()
                    alert('you won')
                    gameOver()
                }
            
            console.log('mines around: ', gBoard[i][j].mineCountAround)
            // const elBoard = document.querySelector('')
        } else {
            elBtn.innerHTML = MINE_IMG
            // revealSquer(i,j)
            // elBtn += MINE_IMG
            console.log('kaboom!!!')
            gLives--
            console.log('lives left', gLives)
            if (gLives <= 0) {
                playsoundBoom()
                alert('kaboommmm!!')
                gameOver()
            }
            // var elLive = document.querySelector('.Lives')
            // elLive.innerText = 'Lives left:' + gLives
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



// function addRandomBall() {
//     // console.log('hi')
//     var i = getRandomInt(1, 9)
//     var j = getRandomInt(1, 11)
//     if (gBoard[i][j].type === FLOOR && gBoard[i][j].gameElement === null) {
//         gBoard[i][j].gameElement = MINE
//         renderCell({ i, j }, BALL_IMG)
//         gTotalBalls++
//     }


// function onCellClicked(i,j){
//     var elOncellclick = document.querySelector('.onCellClicked')

//     const targetCell = gBoard[i][j]
//     console.log('click', targetCell)
// }





// if(targetCell.gameElement === FLOOR){
//     gBoard[i][j] = targetCell.mineCountAround

//     var elRestartGame = document.querySelector('.restartGame')
// elRestartGame.classList.add('hide')

// }else if (targetCell.gameElement === MINE) {
// console.log('kaboom')
// }

// }
// Move the player to a specific location
// function onMoveTo(i, j) {
//     const targetCell = gBoard[i][j]
//     if (targetCell.type === WALL) return

//     // Calculate distance to make sure we are moving to a neighbor cell
//     const iAbsDiff = Math.abs(i - gGamerPos.i)
//     const jAbsDiff = Math.abs(j - gGamerPos.j)
//     // If the clicked Cell is one of the four allowed
//     if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0 || iAbsDiff === 9 && jAbsDiff === 0) || (jAbsDiff === 11 && iAbsDiff === 0)) {

//         if (targetCell.gameElement === MINE) {
//             gScoreCount++
//             playSound()
//             var elScore = document.querySelector('.score')
//             elScore.innerText = 'Score: ' + gScoreCount
//             if (gTotalBalls === gScoreCount) gameOver()
//         } else if (targetCell.gameElement === GLUE) {       
//         }


// REMOVE FROM
// update MODEL
// gBoard[gGamerPos.i][gGamerPos.j].gameElement = null
// update DOM
// renderCell(gGamerPos, '')

// ADD TO
// update MODEL
// targetCell.gameElement = GAMER
// gGamerPos = { i, j }
// update DOM


// } else {
// console.log('TOO FAR', iAbsDiff, jAbsDiff)
// }

// }

// Convert a location object {i, j} to a selector and render a value in that element


// Move the player by keyboard arrows
function onHandleKey(event) {





    
}




//     const i = gGamerPos.i
//     const j = gGamerPos.j

//     switch (event.key) {
//         case 'ArrowLeft':
//             if (i === 5 && j === 0) onMoveTo(i, 11)
//             else
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


// Returns the class name for a specific cell
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}
function gameOver() {
    gIsGameOn = false
    const elRestartGame = document.querySelector('.restartGame')
    elRestartGame.classList.remove('hide')
}

function restartGame() {
    onInitGame()
    var elRestartGame = document.querySelector('.restartGame')
    elRestartGame.classList.add('hide')
    
}


// function playSound() {
//     var sound = new Audio('mu_chaos_gem.mp3')
//     sound.play()
// }

