class PlayerClient {
    constructor(id, socket, state) {
        this.id = id;
        this.socket = socket;
        this.state = state;
        this.partner = null;
        this.data = '';
    }
    getPartner() {
        return this.partner;
    }
    setPartner(partner) {
        this.partner = partner;
    }
    setData(data) {
        this.data = data;
    }
}

export { PlayerClient };