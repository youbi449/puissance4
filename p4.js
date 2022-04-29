
    class p4 {
        constructor(col = 3, row = 5) {
            this.player = 1;
            this.col = col;
            this.row = row;
            this.dom = $('#connect4');
            this.player1 = prompt('Nom du joueur Rouge');
            this.player2 = prompt('Nom du joueur Jaune');
            this.redScore = 0;
            this.yellowScore = 0;
            this.sound = new Audio('https://www.myinstants.com/media/sounds/1-victory-royale-sound-effect-fortnite-battle-royale.mp3')
            this.boards();
    
        }
    
        boards() {
            for (var $row = 0; $row < this.row; $row++) {
                var rowContent = $('<div>').addClass('l');
                for (var $col = 0; $col < this.col; $col++) {
                    var colContent = $('<div>').addClass('case vide').attr('x', $col).attr('y', $row).attr("onClick", "game.action(" + $col + ")");
                    rowContent.append(colContent);
                }
                this.dom.append(rowContent);
                $('#player').html('Piece rouge: ' + this.player1 + ' || Piece Jaune: ' + this.player2);
                $('#player1').html(`${this.player1}: ${this.redScore}`);
                $('#player2').html(`${this.player2}: ${this.yellowScore}`);
            }
        }
    
        changementJoueur() {
            if (this.player === 1) {
                this.player = 2;
                $('#statut').html("C'est au tour des Jaune de jouer");
            } else if (this.player === 2) {
                this.player = 1;
                $('#statut').html("C'est au tour des Rouge de jouer");
            }
        }
    
        action(x) {
            for (let i = this.col; i >= 0; i--) {
                if ($('.case[y=' + i + '][x=' + x + ']').hasClass('vide')) {
                    if (this.player === 1) {
                        $('.case[y=' + i + '][x=' + x + ']').removeClass('vide').addClass('rouge').attr('id', 1);
                        this.checkFull();
                        this.checkFullCol(x);
                        this.checkVerticalRed(x, i);
                        this.checkHorizontalRed(x, i);
                        this.checkDiagonalRedRight(x, i);
                        this.checkDiagonalRedLeft(x, i);
                        break;
                    } else if (this.player === 2) {
                        $('.case[y=' + i + '][x=' + x + ']').removeClass('vide').addClass('jaune').attr('id', 2);
                        this.checkFull();
                        this.checkFullCol(x);
                        this.checkVerticalYellow(x, i);
                        this.checkHorizontalYellow(x, i);
                        this.checkDiagonalYellowRight(x, i);
                        this.checkDiagonalYellowLeft(x, i);
                        break;
                    }
                }
            }
            this.changementJoueur();
        }
    
        matchFini(winner) {
            if (winner === 1) {
                this.sound.play();
                if (confirm(`${this.player1} à gagner voulez vous relancer une partie ?`) === true) {
                    this.redScore++;
                    this.dom.empty();
                    this.boards();
                } else {
                    for (let row = 0; row < this.row; row++) {
                        for (let col = 0; col < this.col; col++) {
                            $(`.case[x=${col}][y=${row}]`).removeAttr('onclick');
                        }
                    }
                    $('#player').html(`Félicitation ${this.player1}. F5 pour rejouer`);
                }
            } else if (winner === 2) {
                this.sound.play();
                if (confirm(`${this.player2} à gagner voulez vous relancer une partie ?`) === true) {
                    this.yellowScore++;
                    this.dom.empty();
                    this.boards();
                } else {
                    for (let row = 0; row < this.row; row++) {
                        for (let col = 0; col < this.col; col++) {
                            $(`.case[x=${col}][y=${row}]`).removeAttr('onclick');
                        }
                    }
                    $('#player').html(`Félicitation ${this.player2}. F5 pour rejouer`);
                }
            } else if (winner === 0) {
                if (confirm(`Match nul. Voulez vous relancer une partie ?`) === true) {
                    this.dom.empty();
                    this.boards();
                } else {
                    for (let row = 0; row < this.row; row++) {
                        for (let col = 0; col < this.col; col++) {
                            $(`.case[x=${col}][y=${row}]`).removeAttr('onclick');
                        }
                    }
                    $('#player').html(`Match Nul`);
    
                }
            }
        }
    
        checkFull() {
            if ($('.case.vide').length === 0) {
                this.matchFini(0);
            }
        }
    
        checkFullCol(x){
            if($(`.case.vide[x=${x}]`).length === 0){
                for (let y = 0; y < this.row; y++) {
                    $(`.case[x=${x}][y=${y}]`).removeAttr('onclick');
                }
            }
        }
    
        checkVerticalRed(col, row) {
            if ($(`.case[x=${col}][y=${row + 1}]`).hasClass('rouge') &&
                $(`.case[x=${col}][y=${row + 2}]`).hasClass('rouge') &&
                $(`.case[x=${col}][y=${row + 3}]`).hasClass('rouge')) {
                this.matchFini(1);
            }
        }
        checkVerticalYellow(col, row) {
            if ($(`.case[x=${col}][y=${row + 1}]`).hasClass('jaune') &&
                $(`.case[x=${col}][y=${row + 2}]`).hasClass('jaune') &&
                $(`.case[x=${col}][y=${row + 3}]`).hasClass('jaune')) {
                this.matchFini(2);
            }
        }
    
        checkHorizontalRed(col, row) {
            if ($(`.case[x=${col + 1}][y=${row}]`).hasClass('rouge') &&
                $(`.case[x=${col + 2}][y=${row}]`).hasClass('rouge') &&
                $(`.case[x=${col + 3}][y=${row}]`).hasClass('rouge')) {
    
                this.matchFini(1);
    
            } else if ($(`.case[x=${col - 1}][y=${row}]`).hasClass('rouge') &&
                $(`.case[x=${col + 1}][y=${row}]`).hasClass('rouge') &&
                $(`.case[x=${col + 2}][y=${row}]`).hasClass('rouge')) {
                this.matchFini(1);
            } else if ($(`.case[x=${col - 2}][y=${row}]`).hasClass('rouge') &&
                $(`.case[x=${col - 1}][y=${row}]`).hasClass('rouge') &&
                $(`.case[x=${col + 1}][y=${row}]`).hasClass('rouge')) {
    
                this.matchFini(1);
    
            } else if ($(`.case[x=${col - 3}][y=${row}]`).hasClass('rouge') &&
                $(`.case[x=${col - 2}][y=${row}]`).hasClass('rouge') &&
                $(`.case[x=${col - 1}][y=${row}]`).hasClass('rouge')) {
    
                this.matchFini(1);
    
            }
        }
        checkHorizontalYellow(col, row) {
            if ($(`.case[x=${col + 1}][y=${row}]`).hasClass('jaune') &&
                $(`.case[x=${col + 2}][y=${row}]`).hasClass('jaune') &&
                $(`.case[x=${col + 3}][y=${row}]`).hasClass('jaune')) {
    
                this.matchFini(2);
    
            } else if ($(`.case[x=${col - 1}][y=${row}]`).hasClass('jaune') &&
                $(`.case[x=${col + 1}][y=${row}]`).hasClass('jaune') &&
                $(`.case[x=${col + 2}][y=${row}]`).hasClass('jaune')) {
    
                this.matchFini(2);
    
            } else if ($(`.case[x=${col - 2}][y=${row}]`).hasClass('jaune') &&
                $(`.case[x=${col - 1}][y=${row}]`).hasClass('jaune') &&
                $(`.case[x=${col + 1}][y=${row}]`).hasClass('jaune')) {
    
                this.matchFini(2);
    
            } else if ($(`.case[x=${col - 3}][y=${row}]`).hasClass('jaune') &&
                $(`.case[x=${col - 2}][y=${row}]`).hasClass('jaune') &&
                $(`.case[x=${col - 1}][y=${row}]`).hasClass('jaune')) {
    
                this.matchFini(2);
    
            }
        }
    
    
        checkDiagonalRedRight(col, row) {
            if ($(`.case[x=${col + 1}][y=${row - 1}]`).hasClass('rouge') &&
                $(`.case[x=${col + 2}][y=${row - 2}]`).hasClass('rouge') &&
                $(`.case[x=${col + 3}][y=${row - 3}]`).hasClass('rouge')) {
    
                this.matchFini(1);
            }
    
            else if ($(`.case[x=${col - 1}][y=${row + 1}]`).hasClass('rouge') &&
                $(`.case[x=${col + 1}][y=${row - 1}]`).hasClass('rouge') &&
                $(`.case[x=${col + 2}][y=${row - 2}]`).hasClass('rouge')) {
    
                this.matchFini(1);
    
            }
            else if ($(`.case[x=${col - 2}][y=${row + 2}]`).hasClass('rouge') &&
                $(`.case[x=${col - 1}][y=${row + 1}]`).hasClass('rouge') &&
                $(`.case[x=${col + 1}][y=${row - 1}]`).hasClass('rouge')) {
    
                this.matchFini(1);
    
            }
            else if ($(`.case[x=${col - 3}][y=${row + 3}]`).hasClass('rouge') &&
                $(`.case[x=${col - 2}][y=${row + 2}]`).hasClass('rouge') &&
                $(`.case[x=${col - 1}][y=${row + 1}]`).hasClass('rouge')) {
    
                this.matchFini(1);
            }
        }
    
    
        checkDiagonalYellowRight(col, row) {
            if ($(`.case[x=${col + 1}][y=${row - 1}]`).hasClass('jaune') &&
                $(`.case[x=${col + 2}][y=${row - 2}]`).hasClass('jaune') &&
                $(`.case[x=${col + 3}][y=${row - 3}]`).hasClass('jaune')) {
                this.matchFini(2);
            }
            else if ($(`.case[x=${col - 1}][y=${row + 1}]`).hasClass('jaune') &&
                $(`.case[x=${col + 1}][y=${row - 1}]`).hasClass('jaune') &&
                $(`.case[x=${col + 2}][y=${row - 2}]`).hasClass('jaune')) {
                this.matchFini(2);
            }
            else if ($(`.case[x=${col - 2}][y=${row + 2}]`).hasClass('jaune') &&
                $(`.case[x=${col - 1}][y=${row + 1}]`).hasClass('jaune') &&
                $(`.case[x=${col + 1}][y=${row - 1}]`).hasClass('jaune')) {
                this.matchFini(2);
            }
    
            else if ($(`.case[x=${col - 3}][y=${row + 3}]`).hasClass('jaune') &&
                $(`.case[x=${col - 2}][y=${row + 2}]`).hasClass('jaune') &&
                $(`.case[x=${col - 1}][y=${row + 1}]`).hasClass('jaune')) {
                this.matchFini(2);
            }
        }
    
        checkDiagonalYellowLeft(col, row) {
            if ($(`.case[x=${col - 1}][y=${row - 1}]`).hasClass('jaune') &&
                $(`.case[x=${col - 2}][y=${row - 2}]`).hasClass('jaune') &&
                $(`.case[x=${col - 3}][y=${row - 3}]`).hasClass('jaune')) {
                this.matchFini(2);
            }
    
            else if ($(`.case[x=${col + 1}][y=${row + 1}]`).hasClass('jaune') &&
                $(`.case[x=${col - 1}][y=${row - 1}]`).hasClass('jaune') &&
                $(`.case[x=${col - 2}][y=${row - 2}]`).hasClass('jaune')) {
    
                this.matchFini(2);
    
            }
            else if ($(`.case[x=${col + 2}][y=${row + 2}]`).hasClass('jaune') &&
                $(`.case[x=${col + 1}][y=${row + 1}]`).hasClass('jaune') &&
                $(`.case[x=${col - 1}][y=${row - 1}]`).hasClass('jaune')) {
    
                this.matchFini(2);
    
            }
            else if ($(`.case[x=${col + 3}][y=${row + 3}]`).hasClass('jaune') &&
                $(`.case[x=${col + 2}][y=${row + 2}]`).hasClass('jaune') &&
                $(`.case[x=${col + 1}][y=${row + 1}]`).hasClass('jaune')) {
    
                this.matchFini(2);
    
            }
        }
        checkDiagonalRedLeft(col, row) {
            if ($(`.case[x=${col - 1}][y=${row - 1}]`).hasClass('rouge') &&
                $(`.case[x=${col - 2}][y=${row - 2}]`).hasClass('rouge') &&
                $(`.case[x=${col - 3}][y=${row - 3}]`).hasClass('rouge')) {
    
                this.matchFini(1);
            }
    
            else if ($(`.case[x=${col + 1}][y=${row + 1}]`).hasClass('rouge') &&
                $(`.case[x=${col - 1}][y=${row - 1}]`).hasClass('rouge') &&
                $(`.case[x=${col - 2}][y=${row - 2}]`).hasClass('rouge')) {
    
                this.matchFini(1);
    
            }
            else if ($(`.case[x=${col + 2}][y=${row + 2}]`).hasClass('rouge') &&
                $(`.case[x=${col + 1}][y=${row + 1}]`).hasClass('rouge') &&
                $(`.case[x=${col - 1}][y=${row - 1}]`).hasClass('rouge')) {
    
                this.matchFini(1);
    
            }
            else if ($(`.case[x=${col + 3}][y=${row + 3}]`).hasClass('rouge') &&
                $(`.case[x=${col + 2}][y=${row + 2}]`).hasClass('rouge') &&
                $(`.case[x=${col + 1}][y=${row + 1}]`).hasClass('rouge')) {
    
                this.matchFini(1);
    
            }
        }
    }
    
    var game = new p4(9, 7);
