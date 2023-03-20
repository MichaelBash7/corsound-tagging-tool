module.exports = class UserDto {
    email;
    id;
    isEmailActivated;
    isUserActive;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isEmailActivated = model.isEmailActivated;
        this.isUserActive = model.isUserActive;
    }
}