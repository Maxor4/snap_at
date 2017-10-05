/**
 * Created by krlme on 03/10/2017.
 */
import {
    AsyncStorage,
    Platform,
    Networking
} from 'react-native';

import Config from '../config/Config.js';

function WebService() {
    this.serveur = Config.serveur;
    this.identifierStorage = '@SaStorage';
    this.email = 'adam.petit@gfi.fr';

    this.token = '';
    this.id = null;
    this.Username= null;
    this.navigator = null;
    this.Besoins = {};
    this.Clients = {};
    this.Commerciaux = {};

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
    this.setClients([]);
    this.setCommerciaux([]);
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

WebService.prototype.setClients = function (Clients, callback) {
    this.Clients = Clients;
    AsyncStorage.setItem(this.identifierStorage+":Clients", JSON.stringify(Clients), () => {
        if(typeof(callback) == 'function') {
            callback();
        }
    }).done();
    return this;
};

WebService.prototype.setCommerciaux = function (Commerciaux, callback) {
    this.Commerciaux = Commerciaux;
    AsyncStorage.setItem(this.identifierStorage+":Commerciaux", JSON.stringify(Commerciaux), () => {
        if(typeof(callback) == 'function') {
            callback();
        }
    }).done();
    return this;
};
WebService.prototype.setEmploye = function (id, callback) {
    this.id = id;
    AsyncStorage.setItem(this.identifierStorage+":EmployeId", JSON.stringify(id), () => {
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
                'X-Auth-Token': this.token
            }
        })
            .then((response) => {
                if(response.status === 200) {
                    return response.json();
                }
                else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then((response) => {
                    return typeof callback === 'function' ? callback(response) : null;

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
    form.append('login', this.email);
    form.append('password', mdp);
    this.request(this.serveur+'auths/tokens', 'POST', form, (data) => {
        this.setToken(data.value);
        this.setEmploye(data.itc.id);
        typeof callback === 'function' ? callback() : null;
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

WebService.prototype.getListeBesoins = function (callback) {

    this.request(this.serveur+'besoins/all/1','GET', null, (data) => {
        this.setBesoins(data);
        callback(data);
    });
};

WebService.prototype.getListeClients = function (callback) {

    this.request(this.serveur+'client','GET', null, (data) => {
        this.setClients(data);
        callback(data);
    });
};

WebService.prototype.getListeCommerciaux = function (callback) {

    this.request(this.serveur+'itc/mail','GET', null, (data) => {
        this.setCommerciaux(data);
        callback(data);
    })

};

/**
 * AUTRE
 */


WebService.prototype.creationBesoin = function(besoin, callback, fallback) {
    let form = new FormData();

        form.append('createur', this.id);
        form.append('titre:', besoin.titre);
        form.append('contactcli:', besoin.contactcli);
        form.append('client', besoin.client);
        form.append('datecreation', besoin.datecreation);
        form.append('description', besoin.description);
        form.append('succesun', besoin.succesun);
        form.append('succesdeux', besoin.succesdeux);
        form.append('succestrois', besoin.succestrois);
        form.append('dureem', besoin.dureem);
        form.append('dureej', besoin.dureej);
        form.append('datedebuttard', besoin.datedebuttard);
        form.append('nomconsun', besoin.nomconsun);
        form.append('nomconsdeux', besoin.nomconsdeux);
        form.append('nomconstrois', besoin.nomconstrois);
        form.append('nomconsquatre', besoin.nomconsquatre);
        form.append('nomconscinq', besoin.nomconscinq);
        form.append('address', besoin.address);
        form.append('zipCode', besoin.zipCode);
        form.append('tarif', besoin.tarif);

    this.request(this.serveur+'besoin/create', 'POST', form, (data) =>
    {
        typeof callback === 'function' ? callback(data) : null;
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
