class Gimmick {
    constructor(id) {
        const gimmickManager = GimmickManager.getInstance();
        this.id = id;
        this.dirty = true;
        gimmickManager.addGimmick(this);
    }

    updateRemote() {
        if (!this.dirty) {
            return;
        }
        const gameClient = GameClient.getInstance();

        this.dirty = false;
        gameClient.sendMessage('ingame-sync-gimmick', {
            id: this.id,
            data: this.getSyncData()
        });
    }
    getSyncData() {
        // return data to be synced
        throw new Error('getSyncData should be overrided');
    }
    syncRemote(params) {
        // apply sync data
        throw new Error('syncRemote should be overrided');
    }
    markDirty() {
        this.dirty = true;
    }
}

class GimmickManager {
    static getInstance() {
        if (!this.instance) {
            this.instance = new GimmickManager();
        }
        return this.instance;
    }

    constructor() {
        const gameClient = GameClient.getInstance();
        const gimmickManager = this;
        this.gimmicks = [];

        gameClient.addRPC('ingame-sync-gimmick', (args) => {
            gimmickManager.routeSyncData(JSON.parse(args));
        })
    }
    addGimmick(target) {
        this.gimmicks.push(target);
    }
    removeGimmick(id) {
        for (let i = 0; i < this.gimmicks.length; i++) {
            if (this.gimmicks[i].id == id) {
                this.gimmicks.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    findGimmick(id) {
        for (let i = 0; i < this.gimmicks.length; i++) {
            if (this.gimmicks[i].id == id) {
                return this.gimmicks[i];
            }
        }
        return null;
    }
    routeSyncData(params) {
        const id = params.id;
        if (id) {
            const target = this.findGimmick(id);
            if (target == null) {
                throw new Error('Gimmick with id: ' + String(id) + ' not found');
            }
            target.syncRemote(params.data);
        } else {
            throw new Error('Expected: id, received: ' + String(id));
        }
    }
    update() {
        for (let i = 0; i < this.gimmicks.length; i++) {
            const gimmick = this.gimmicks[i];
            gimmick.updateRemote();
        }
    }
}