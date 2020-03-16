                                              <h4>NODEJS CHATBOT<h/4>

installer npm : 

                          $npm install

Lancer le serveur avec la commande :

                          $npm start ou $node server.js

Le serveur est accessible et a l'ecoute des requêtes 

Actions possible : 

GET "/" :

    Hello Word
    
GET "/hello" : 

    Qui etes vous ? 
    
GET "/hello?nom=Titi"

    Bonjour Titi
    
POST "Chat" : 

  Exemple request : 

    $ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"demain\"}" http://localhost:3000/chat 
    Reponse :      “Je ne connais pas demain…”
    $ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"demain =Mercredi\"}"                               http://localhost:3000/chat  Reponse :  “Merci pour cette information !”
    
    $ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"demain\"}" http://localhost:3000/chat             Reponse :      “demain: Mercredi” (y compris après redémarrage du serveur)

Test Accessible sur : https://cours-nodejs.herokuapp.com/
