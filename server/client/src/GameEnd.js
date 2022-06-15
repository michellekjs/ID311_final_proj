class GameEnd {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.end = null;
        // this.player = player;
    }

    create() {
        this.end = createSprite(this.x, this.y, 500, 300);

        const gameClient = GameClient.getInstance();
        gameClient.addRpc('ingame-game-end', (args) => {
            window.location.href = "../gameover.html";
        });
    }

    activate(player, partner) {
        if (player.overlap(this.end) && partner.overlap(this.end)) {
            const gameClient = GameClient.getInstance();
            gameClient.sendMessage('ingame-game-end', {
                score: elapsedTime
            });
            window.location.href = "../gameover.html"
        }
    }

}