class Profile {
    constructor({
                    username,
                    name: { firstName, lastName },
                    password,
                }) {
        this.username = username;
        this.name = { firstName, lastName };
        console.log(this.name);
        this.password = password;
    }

    createUser(callback) {
        console.log(`Creating user ${this.username}`);

        return ApiConnector.createUser({username: this.username, name: this.name, password: this.password}, (err, data) => {
            callback(err, data);
            // console.log(data); выводятся данные из коснструктора плюс кошелек, id и т.д. Похоже данные формируюбтся в строке 180-190
            // console.log(err); выводит ошибку или null
        }); 

    }

    authorizationUser(callback) {
        console.log(`Authorizating user ${this.username}`);
        return ApiConnector.performLogin({username: this.username, password: this.password}, (err, data) => {
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

    convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
        console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Converted to coins ${this}`);
            callback(err, data);
        });
    }

    transfer({to, amount}, callback) {
        console.log(`Transfering ${amount} of Netcoins to ${to}`);
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`${to} has got ${amount} of Netcoins`);
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


// const currienciesRate = getCurriencies((err, data) => {
//         if (err) {
//             console.log(`Error during getting curriencies rate`);
//         } else {
//             console.log(data);
//             return data;
//         } 
// });


                        

function main() {
    
    // getCurriencies((err, data) => {
    //     if (err) {
    //         console.log(`Error during getting curriencies rate`);
    //     } else {
    //         console.log(data);
    //         return data;
    //     } 
    // });
    // const currienciesRate = data[99];
    
    // console.log(currienciesRate);
    
    const Oleg2 = new Profile({
                    username: 'Oleg',
                    name: { firstName: 'Oleg', lastName: 'Olegov' },
                    password: 'olegspass',
                });

    const Ivan = new Profile({
        username: 'Ivan',
        name: { firstName: 'Ivan', lastName: 'Ivanov' },
        password: 'ivanspass',
    });

    Oleg2.createUser((err, data) => {
        if (err) {
            console.log(`Error during creating ${Oleg2.username}`);
            } else {
                console.log(`User ${Oleg2.username} successfully created`);
                Oleg2.authorizationUser((err, data) => {
                    if (err) {
                    console.log(`Error during authorizating ${Oleg2.username}`);
                    }else {
                        console.log(`User ${Oleg2.username} is authorized`);
                        Oleg2.addMoney({ currency: 'RUB', amount: 10000 }, (err, data) => {
                            if (err) {
                                console.log(`Error during adding money to ${Oleg2.username}`);
                            } else {
                                console.log(`Added 10000 RUB to Oleg`);
                                getCurriencies((err, data) => {
                                    if (err) {
                                       console.log(`Error during getting curriencies rate`);
                                    } else {
                                        const currienciesRate = data[99];
                                        const targetCurrencySum = currienciesRate.RUB_NETCOIN * 10000;
                                        Oleg2.convertMoney({fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: targetCurrencySum}, (err, data) => {
                                            if (err) {
                                                console.log(`Error during converting money`);                                     
                                            } else {
                                                Ivan.createUser((err, data) => {
                                                    if (err) {
                                                        console.log(`Error during creating ${Ivan.username}`);
                                                    } else {
                                                        Ivan.transfer({to: 'Ivan', amount: targetCurrencySum}, (err, data) => {
                                                            if (err) {
                                                                console.log(`Error transfering Netcoins to ${Ivan.username}`);
                                                            } else {
                                                                console.log(`${Ivan.username} has got ${targetCurrencySum} of NETCOINS`);
                                                            }
                                                        
                                                        
                                                        })
                                                        
                                                        
                                                    }
                                                })
                                            }
                                                                                        
                                        })
                                    } 
                                });
                            }
                        })
                    }
                })
            }
    })
}

main();
