/**
 * Created by krlme on 03/10/2017.
 */
import {
    AsyncStorage,
    Platform,
    PushNotificationIOS,
    Networking
} from 'react-native';

import Config from '../config/Config.js';
import Stockage from '../scripts/Stockage';

var dateFormat = require('dateformat');

function WebService() {
    this.serveur = Config.serveur;
    this.identifierStorage = '@NxStorage';
    this.email = 'm.petrini@hecone.fr';

    this.token = '';
    this.navigator = null;
    this.Besoins = {};
    this.protocoles = [];
    this.reglages = {
        tutoiement: null,
        intitule: null
    };

    this.tokenEnChargement = Platform.OS === 'ios' ;
    AsyncStorage.getItem(this.identifierStorage+":token", (error, value) => {
        this.token = value !== null ? value : '';
        this.tokenEnChargement = false;
    });

    AsyncStorage.getItem(this.identifierStorage+":Besoins").then((value) => {
        if (value != null){
            let temp = value !== null && value != '' ? JSON.parse(value) : {},
                arr = {};
            for(let pa in temp) {
                arr[pa] = new Besoin(temp[pa]);
            }
            this.Besoins = arr;
        }
    }).done();

    AsyncStorage.getItem(this.identifierStorage+":reglages").then((value) => {
        this.reglages = value !== null ? JSON.parse(value) : {};
    }).done();

}

/**
 *
 * METHODS
 *
 **/

WebService.prototype.reset = function() {
    this.setBesoins([]);
    this.setToken('');
}

WebService.prototype._retourDeconnexion = function() {
    this.reset();
    if(this.navigator != null) {
        this.navigator.resetTo({
            id: 'Authentification',
        });
    }
};

/**
 *
 * GETTERS / SETTERS
 *
 **/

WebService.prototype.getReglage = function (index) {
    return this.reglages[index];
};

WebService.prototype.addReglage = function (index, valeur, callback) {
    this.reglages[index] = valeur;
    AsyncStorage.setItem(this.identifierStorage+":reglages", JSON.stringify(this.reglages), () => {
        typeof callback === 'function' ? callback() : null;
    }).done();
    return this;
};

WebService.prototype.setReglages = function (reglages) {
    this.reglages = reglages;
    AsyncStorage.setItem(this.identifierStorage+":reglages", JSON.stringify(reglages)).done();
    return this;
};

WebService.prototype.setToken = function (token, callback) {
    this.token = token;
    AsyncStorage.setItem(this.identifierStorage+":token", token, () => {
        typeof callback == 'function' ? callback() : null;
    }).done();
    return this;
};

WebService.prototype.setBesoins = function (Besoins, callback) {
    this.Besoins = Besoins;
    AsyncStorage.setItem(this.identifierStorage+":Besoins", JSON.stringify(Besoins), () => {
        if(typeof(callback) == 'function') {
            callback();
        }
    }).done();
    return this;
};

/**
 *
 * REQUESTS
 *
 **/

WebService.prototype.request = function(url, method, data, callback, fallback) {
    if(this.tokenEnChargement) {
        let obj = this;
        setTimeout(function () {
            obj.request(url, method, data, callback, fallback);
        }, 300);
    }
    else {
        fetch(url, {
            method: method,
            body:    data,
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-csrf-token': this.token
            }
        })
            .then((response) => {
                if(response.status == 200) {
                    return response.json();
                }
                else {

                    throw new Error('Something went wrong on api server!');
                }
            })
            .then((response) => {
                if(response.status == 1) {
                    return typeof callback === 'function' ? callback(response.data) : null;
                }
                else {
                    if(parseInt(response.status) == 847) {
                        this._retourDeconnexion();
                    }
                    if(typeof fallback === 'function') {
                        fallback(JSON.stringify(response));
                    }

                    throw new Error(response.message);
                }
            })
            .catch((error) => {
                if(typeof fallback === 'function') {
                    fallback(error);
                }
            });
    }
};

WebService.prototype.connexion = function (mdp, callback, fallback) {
    let form = new FormData();
    form.append('email', this.email);
    form.append('password', mdp);
    this.request(this.serveur+'auth', 'POST', form, (data) => {
        this.reglages.employee = {
            'firstname' : data.firstname,
            'id_employee' : data.id_employee,
            'lastname' : data.lastname,
        };
        this.setReglages(this.reglages).setToken(data.token);
        AsyncStorage.removeItem(Stockage.identifierStorage+":messages", () => {
            typeof callback === 'function' ? callback() : null;
        }).done();

    }, (data) => {
        fallback(data);
    });
};

WebService.prototype.isConnecte = function(callback, fallback) {
    this.request(this.serveur+'connecte', 'GET', null, (data) => {
        callback(data);
    }, (data) => {
        fallback(data);
    });
};

WebService.prototype.getListeBesoins = function (callback, force) {
    force = typeof(force) === 'undefined' ? false : force;

    if(Object.keys(this.Besoins).length === 0 || force) {
        this.request(this.serveur+'besoins/liste','GET', null, (data) => {
            let temp = {};
            data.Besoins.map(function(key, index) {
                temp[key.id_Besoin] = new Besoin(key);
            });

            this.setBesoins(temp);
            callback(temp);
        });
    }
    else {
        if(typeof callback === 'function') {
            callback(this.Besoins);
        }
    }

};

/**
 * AUTRE
 */


WebService.prototype.creationBesoin = function(nom, idAgenceAddress, prenom, tel, callback, fallback) {
    let form = new FormData();
    form.append('nom', nom);
    form.append('idAgenceAddress', idAgenceAddress);
    form.append('prenom', prenom);
    form.append('tel', tel);

    this.request(this.serveur+'Besoins/new', 'POST', form, (data) =>
    {
        let temp = this.Besoins;
        temp[data.id_Besoin] = new Besoin({
            'id_Besoin': data.id_Besoin,
            'firstname': prenom,
            'lastname': nom,
            'mobile': tel,
            'id_agence_address': idAgenceAddress,
            'phone': '',
        }, false);

        this.setBesoins(temp);
        callback(data);
    }, function(data) {
        fallback(data);
    });

    //A garder pour quand on implemente le mode hors-ligne
    /*else {
     let temp = obj.patients;
     let i = -1;

     while(typeof(temp[i]) != 'undefined') {
     i--;
     }

     temp[i] = new Patient({
     'id_patient': i,
     'prenom': prenom,
     'nom': nom,
     'mobile': tel,
     'phone': '',
     }, false, false);
     obj.setPatients(temp);
     callback(temp[i]);
     }*/
};

WebService.prototype.getToken = function (callback, boucle){

    boucle = typeof boucle === 'undefined' ? 0 : boucle;

    if(this.tokenEnChargement && boucle < 10) {
        setTimeout(() => {
            boucle++;
            this.getToken(callback, boucle);
        }, 100);
    }
    else {
        callback(this.token);
    }

};




module.exports = WebService;
