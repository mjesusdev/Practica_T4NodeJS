var http = require('http');
var moduleurl = require('url');
var fs = require('fs');

var mongo = require('mongodb')
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";

http.createServer(function(peticion, respuesta) 
{
    var cadena = moduleurl.parse(peticion.url, true);
    var direccion = cadena.pathname;
    respuesta.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    
    fs.readFile("./index.html", function(error, contenido) 
    {
        if (error) 
        {
            respuesta.writeHead(404);
            return respuesta.end("404 Not Found");
        }
        switch (direccion){
            case "/1":
                MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("harrypotter");
                    var query = {"species" : "human"};
                    dbo.collection("characters").find(query).toArray(function (err, result) {
                        if (err) throw err;
                        respuesta.write(contenido);
                        respuesta.write("<tbody> \n");
                        for (let i=0;i<result.length;i++){
                            respuesta.write("<tr> \n");
                            respuesta.write("<td>"+result[i].name+"</td> \n");
                            respuesta.write("<td>"+result[i].species+"</td> \n");
                            respuesta.write("</tr> \n");
                        }
                        respuesta.end("</tbody> \n </table> \n </div> \n </div> \n </div> \n </body> \n </html>");
                        db.close();
                    });
                });
                break;

            case "/2":
                MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("harrypotter");
                    var query = { "yearOfBirth" : {$lt:1979} };
                    dbo.collection("characters").find(query).toArray(function (err, result) {
                        if (err) throw err;
                        respuesta.write(contenido);
                        respuesta.write("<tbody> \n");
                        for (let i=0;i<result.length;i++){
                            respuesta.write("<tr> \n");
                            respuesta.write("<td>"+result[i].name+"</td> \n");
                            respuesta.write("<td>"+result[i].species+"</td> \n");
                            respuesta.write("</tr> \n");
                        }
                        respuesta.end("</tbody> \n </table> \n </div> \n </div> \n </div> \n </body> \n </html>");
                        db.close();
                    });
                });
                break;

            case "/3":
                MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("harrypotter");
                    var query = {"wand.wood":"holly"};
                    dbo.collection("characters").find(query).toArray(function (err, result) {
                        if (err) throw err;
                        respuesta.write(contenido);
                        respuesta.write("<tbody> \n");
                        for (let i=0;i<result.length;i++){
                            respuesta.write("<tr> \n");
                            respuesta.write("<td>"+result[i].name+"</td> \n");
                            respuesta.write("<td>"+result[i].species+"</td> \n");
                            respuesta.write("</tr> \n");
                        }
                        respuesta.end("</tbody> \n </table> \n </div> \n </div> \n </div> \n </body> \n </html>");
                        db.close();
                    });
                });
                break;

            case "/4":
                MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("harrypotter");
                    var query = {"alive":true, "hogwartsStudent":true};
                    dbo.collection("characters").find(query).toArray(function (err, result) {
                        if (err) throw err;
                        respuesta.write(contenido);
                        respuesta.write("<tbody> \n");
                        for (let i=0;i<result.length;i++){
                            respuesta.write("<tr> \n");
                            respuesta.write("<td>"+result[i].name+"</td> \n");
                            respuesta.write("<td>"+result[i].species+"</td> \n");
                            respuesta.write("</tr> \n");
                        }
                        respuesta.end("</tbody> \n </table> \n </div> \n </div> \n </div> \n </body> \n </html>");
                        db.close();
                    });
                });
                break;

            default:
                respuesta.write("<p>No has escrito bien la dirección, intente de nuevo😉</p>");
                respuesta.end();
                break;
        }
    });
}).listen(8083, '127.0.0.3');
console.log('Servidor ejecutándose en http://127.0.0.3:8083/');