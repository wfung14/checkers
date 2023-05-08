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