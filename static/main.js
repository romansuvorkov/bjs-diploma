class Profile {
    constructor({
                    username,
                    name: { firstName, lastName },
                    password,
                }) {
        this.userName = username;
        this.name = { firstName, lastName };
        console.log(this.name);
        this.password = password;
    }

    createUser(callback) {
        console.log(`Creating user ${this.userName}`);
        let output = {};
        output.username = this.userName;
        output.name = this.name;
        output.password = this.password;
        return ApiConnector.createUser(output, (err, data) => {
                console.log(`User ${this.username} is created`);
                // console.log(data); выводятся данные из коснструктора плюс кошелек, id и т.д. Похоже данные формируюбтся в строке 180-190
                // console.log(err); выводит ошибку или null
                callback(err, data);
        }); 

    }

    authorizationUser(callback) {
        console.log(`Authorizating user ${this.userName}`);
        let output = {};
        output.username = this.userName;
        output.password = this.password;
        return ApiConnector.performLogin(output, (err, data) => {
                console.log(`User ${this.username} is authorized`);
                callback(err, data);
        }); 

    }

    addMoney({ currency, amount }, callback) {
        console.log(`Adding ${amount} of ${currency} to ${this.username}`);
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Added ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    covertMoney({inputCurrency, outputCurrency, currencySum}, callback) {
        console.log(`Converting ${inputCurrency} of ${currencySum} to ${outputCurrency}`);
        return ApiConnector.convertMoney({ inputCurrency, outputCurrency, currencySum }, (err, data) => {
            console.log(`Converted to ${outputCurrency} of ${currencySum} to ${this.username}`);
            callback(err, data);
        });
    }

    transfer({targetUser, sum}, callback) {
        console.log(`Transfering ${sum} of Netcoins to ${targetUser}`);
        return ApiConnector.transferMoney({ targetUser, sum }, (err, data) => {
            console.log(`${targetUser} has got ${sum} of Netcoins`);
            callback(err, data);
        });
    }




}

function getCurriencies(callback) {
        return ApiConnector.getStocks((err, data) => {
                console.log(`Getting stocks info`);
                callback(err, data);
        });
}


let currienciesRate = getCurriencies((err, data) => {
        if (err) {
            console.log(`Error during getting curriencies rate`);
        } else {
            console.log(data);
            return data;
        } 
});

console.log(currienciesRate);

function main() {
    const Oleg = new Profile({
                    username: 'Oleg',
                    name: { firstName: 'Oleg', lastName: 'Olegov' },
                    password: 'olegspass',
                });
    console.log(Oleg);
//     // сначала создаем и авторизуем пользователя

//     // после того, как мы авторизовали пользователя, добавляем ему денег в кошелек
    Oleg.createUser((err, data) => {
        if (err) {
          console.log(`Error during creating ${Oleg.username}`);
        } else {
          console.log(`User ${Oleg.username} successfully created`);
        }
    })
}

main();
