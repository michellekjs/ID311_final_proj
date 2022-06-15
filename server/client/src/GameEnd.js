class GameEnd {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.end = null;
        // this.player = player;
    }

    create() {
        this.end = createSprite(this.x, this.y, 500, 300);
        this.end.addImage(preloadedImages.map.igloo);

        const gameClient = GameClient.getInstance();
        gameClient.addRPC('ingame-game-end', (params) => {
            window.location.href = "../gameover?score=" + String(params.score);
        });
    }

    activate(player, partner) {
        if (player.overlap(this.end) && partner.overlap(this.end)) {
            const gameClient = GameClient.getInstance();
            gameClient.sendMessage('ingame-game-end', {
                score: elapsedTime
            });
            window.location.href = "../gameover?score=" + String(elapsedTime);
        }
    }

}