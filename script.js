const squares = document.querySelectorAll(".square");

const playerOnePieces = []
const playerTwoPieces = []

class PlayerPiece {
  constructor(currentSquare) {
    this.currentSquare = currentSquare
    this.isInPlay = true
    this.isNowKing = false
    this.captures = []
    this.availableMoves = []
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
  s13: [[null, 8], [null, 17]],
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
  }
  for(let i = 21; i <= 32; i++) {
    const piece = new PlayerPiece(`s${i}`)
    playerOnePieces.push(piece)
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
    }
  }
  for(let piece of playerTwoPieces) {
    if(piece.isInPlay) {
      const playerPiece = document.createElement("div")
      const square = document.querySelector(`#${piece.currentSquare}`)
      square.appendChild(playerPiece)
      playerPiece.classList.add("player-two-piece", "piece")
    }
  }
}

const initialize = () => {
  createUserPieces()
  renderBoard()
}

initialize()