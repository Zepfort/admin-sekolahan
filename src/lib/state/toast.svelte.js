export const toast = $state({
    show: false,
    message: '',
    type: 'success',
    send(msg) {
        this.message = msg;
        this.show = true;
        setTimeout(() => this.show = false, 3000);
    }
});