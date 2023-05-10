const squares = document.querySelectorAll(".square")
const playerOne = document.querySelector("#player-one")
const playerTwo = document.querySelector("#player-two")

let playerOnePieces = []
let playerTwoPieces = []
let totalPieces = []

let player = 0
let chosenPiece = null

class PlayerPiece {
  constructor(currentSquare) {
    this.currentSquare = currentSquare
    this.isInPlay = true
    this.isNowKing = false
    this.captures = null
    this.availableMoves = []
    this.justCaptured = false
  }
}

const availableMovesForSquares = {
  s1: [[null, null], [5, 6]],
  s2: [[null, null], [6, 7]],
  s3: [[null, null], [7, 8]],
  s4: [[null, null], [8, null]],
  s5: [[null, 1], [null, 9]],
  s6: [[1, 2], [9, 10]],
  s7: [[2, 3], [10, 11]],
  s8: [[3, 4], [11, 12]],
  s9: [[5, 6], [13, 14]],
  s10: [[6, 7], [14, 15]],
  s11: [[7, 8], [15, 16]],
  s12: [[8, null], [16, null]],
  s13: [[null, 9], [null, 17]],
  s14: [[9, 10], [17, 18]],
  s15: [[10, 11], [18, 19]],
  s16: [[11, 12], [19, 20]],
  s17: [[13, 14], [21, 22]],
  s18: [[14, 15], [22, 23]],
  s19: [[15, 16], [23, 24]],
  s20: [[16, null], [24, null]],
  s21: [[null, 17], [null, 25]],
  s22: [[17, 18], [25, 26]],
  s23: [[18, 19], [26, 27]],
  s24: [[19, 20], [27, 28]],
  s25: [[21, 22], [29, 30]],
  s26: [[22, 23], [30, 31]],
  s27: [[23, 24], [31, 32]],
  s28: [[24, null], [32, null]],
  s29: [[null, 25], [null, null]],
  s30: [[25, 26], [null, null]],
  s31: [[26, 27], [null, null]],
  s32: [[27, 28], [null, null]],
}

const createUserPieces = () => {
  for(let i = 1; i <= 12; i++) {
    const piece = new PlayerPiece(`s${i}`)
    playerTwoPieces.push(piece)
    totalPieces.push(piece)
  }
  for(let i = 21; i <= 32; i++) {
    const piece = new PlayerPiece(`s${i}`)
    playerOnePieces.push(piece)
    totalPieces.push(piece)
  }
}

const renderBoard = () => {
  squares.forEach(square => {
    square.innerHTML = ""
  })
  for(let piece of playerOnePieces) {
    if(piece.isInPlay) {
      const playerPiece = document.createElement("div")
      const square = document.querySelector(`#${piece.currentSquare}`)
      square.appendChild(playerPiece)
      playerPiece.classList.add("player-one-piece", "piece")
      if(piece.isNowKing) {
        playerPiece.classList.add("king")
        playerPiece.innerHTML = '<i class="fa-solid fa-crown"></i>'
      }
    }
  }
  for(let piece of playerTwoPieces) {
    if(piece.isInPlay) {
      const playerPiece = document.createElement("div")
      const square = document.querySelector(`#${piece.currentSquare}`)
      square.appendChild(playerPiece)
      playerPiece.classList.add("player-two-piece", "piece")
      if(piece.isNowKing) {
        playerPiece.classList.add("king")
        playerPiece.innerHTML = '<i class="fa-solid fa-crown"></i>'
      }
    }
  }
}

const generateAvailableMoves = (currentPlayerPieces, opponentPieces) => {
  for(piece of totalPieces) {
    piece.availableMoves = []
    piece.captures = {}
  }
  for(let piece of currentPlayerPieces) {
    if(piece.currentSquare) {
      getCaptureMoves(piece, opponentPieces, player)
      if(piece.isNowKing) {
        getCaptureMoves(piece, opponentPieces, player - 1)
      }
    }
  }
  if(currentPlayerPieces.every(piece => Object.keys(piece.captures).length === 0)) {
    for(let piece of currentPlayerPieces) {
      if(piece.currentSquare) {
        getNormalMoves(piece, player)
        if(piece.isNowKing) {
          getNormalMoves(piece, player -1)
        }
      }
    }
  }
}

const getCaptureMoves = (piece, opponentPieces, index) => {
  for(let square of availableMovesForSquares[piece.currentSquare].at(index)) {
    if(square) {
      if(opponentPieces.some(piece => piece.currentSquare === `s${square}`)) {
        if(availableMovesForSquares[piece.currentSquare].at(index).indexOf(square) === 0) {
          if(index === 0) {
            const edgePieces = ["s9", "s17", "s25", "s6", "s7", "s8"]
            const adjacentPiece = `s${parseInt(piece.currentSquare.slice(1)) - 9}`
            if(totalPieces.every(piece => piece.currentSquare !== adjacentPiece)) {
              if(!edgePieces.includes(piece.currentSquare)) {
                piece.captures[parseInt(piece.currentSquare.slice(1)) - 9] = availableMovesForSquares[piece.currentSquare].at(index)[0]
              }
            }
          } else {
            const adjacentPiece = `s${parseInt(piece.currentSquare.slice(1)) + 7}`
            const edgePieces = ["s1", "s9", "s17", "s25", "s26", "s27", "s28"]
            if(totalPieces.every(piece => piece.currentSquare !== adjacentPiece)) {
              if(!edgePieces.includes(piece.currentSquare)){
                piece.captures[parseInt(piece.currentSquare.slice(1)) + 7] = availableMovesForSquares[piece.currentSquare].at(index)[0]
              }
            }
          }
        } else { 
          if(index === 0) {
            const adjacentPiece = `s${parseInt(piece.currentSquare.slice(1)) - 7}`
            const edgePieces = ["s8", "s16", "s24", "s32", "s7", "s6", "s5"]
            if(totalPieces.every(piece => piece.currentSquare !== adjacentPiece)) {
              if(!edgePieces.includes(piece.currentSquare)) {
                piece.captures[parseInt(piece.currentSquare.slice(1)) - 7] = availableMovesForSquares[piece.currentSquare].at(index)[1]
              }
            }
          } else {
            const adjacentPiece = `s${parseInt(piece.currentSquare.slice(1)) + 9}`
            const edgePieces = ["s8", "s16", "s24", "s27", "s26", "s25"]
            if(totalPieces.every(piece => piece.currentSquare !== adjacentPiece)) {
              if(!edgePieces.includes(piece.currentSquare)) {
                piece.captures[parseInt(piece.currentSquare.slice(1)) + 9] = availableMovesForSquares[piece.currentSquare].at(index)[1]
              }
            }
          }
        }
      }
    }
  }
}

const getNormalMoves = (piece, index) => {
  for(let square of availableMovesForSquares[piece.currentSquare].at(index)) {
    if(square) {
      if(totalPieces.every(piece => piece.currentSquare !== `s${square}`)) {
        piece.availableMoves.push(square)
      }
    }
  }
}

const createPieceEventListeners = () => {
  const pieces = document.querySelectorAll(".piece")
  for(let piece of pieces) {
    piece.addEventListener("click", (event) => {
      event.stopPropagation()
      selection = piece.parentElement.id
      for(let piece of totalPieces) {
        if(piece.currentSquare === selection){
          chosenPiece = piece
        }
      }
    })
  }
}

const createSquareEventListeners = () => {
  for(let square of squares) {
    square.addEventListener("click", () => {
      if(chosenPiece) {
        if(isLegalMove(chosenPiece, square)) {
          makeTurn(square)
          if(totalPieces.every(piece => piece.justCaptured === false)) {
            chosenPiece = null
            switchTurn()
          } else {
            for(piece of totalPieces) {
              piece.availableMoves = []
              piece.captures = {}
              if(!chosenPiece.isNowKing) {
                player === 0 ? getCaptureMoves(chosenPiece, playerTwoPieces, player)
                : getCaptureMoves(chosenPiece, playerOnePieces, player)
              } else {
                player === 0 ? getCaptureMoves(chosenPiece, playerTwoPieces, player - 1)
                : getCaptureMoves(chosenPiece, playerOnePieces, player - 1)
              }
            }
            for(let piece of totalPieces) {
              piece.justCaptured = false
            }
            if(totalPieces.every(piece => Object.keys(piece.captures).length === 0)) {
              chosenPiece = null
              switchTurn()
            }
          }
        }
      }
    })
  }
}

const makeTurn = (square) => {
  chosenPiece.currentSquare = square.id
  checkForKing()
  renderBoard()
  createPieceEventListeners()
}

const isLegalMove = (chosenPiece, square) => {
  if(Object.keys(chosenPiece.captures).length !== 0) {
    if((parseInt(square.id.slice(1))) in chosenPiece.captures) {
      for(let piece of totalPieces) {
        if(piece.currentSquare === `s${chosenPiece.captures[square.id.slice(1)]}`) {
          piece.isInPlay = false
          piece.currentSquare = null
        }
      }
      chosenPiece.justCaptured = true
      return true
    }
  } else {
    if(chosenPiece.availableMoves.includes(parseInt(square.id.slice(1)))) {
      return true
    }
  }
}

const checkForKing = () => {
  const playerOneKingSquares = ["s1", "s2", "s3", "s4"]
  const playerTwoKingSquares = ["s29", "s30", "s31", "s32"]
  for(let piece of playerOnePieces) {
    if(playerOneKingSquares.includes(piece.currentSquare)) {
      piece.isNowKing = true
    }
  }
  for(let piece of playerTwoPieces) {
    if(playerTwoKingSquares.includes(piece.currentSquare)) {
      piece.isNowKing = true
    }
  }
}

const switchTurn = () => {
  if(player === 0){
    player = 1
    playerTwo.style.color = "green"
    playerOne.style.color = "black"
    generateAvailableMoves(playerTwoPieces, playerOnePieces)
  } else {
    player = 0
    playerTwo.style.color = "black"
    playerOne.style.color = "green"
    generateAvailableMoves(playerOnePieces, playerTwoPieces)
  }
}

const initialize = () => {
  createUserPieces()
  renderBoard()
  createPieceEventListeners()
  createSquareEventListeners()
  generateAvailableMoves(playerOnePieces, playerTwoPieces)
}

initialize()