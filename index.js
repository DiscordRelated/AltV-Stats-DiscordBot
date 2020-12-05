// AltV Server Daten
var ip = '1.1.1.1';
var port = '80';

// request
var request = require('request');
var url = 'https://api.altv.mp/server/Yourserverid';

// uptime checks
var tcpp = require('tcp-ping');

// Discord.js
const Discord = require('discord.js');
const { info } = require('console');
const client = new Discord.Client();

client.login('Your Discord Bot API Key');

client.on('ready', ()=>{
    console.log('Bot ist online!');
});

client.on('message', serverInformations =>{
    if (serverInformations.channel.id === '703237646947713075'){
        if (serverInformations.content.startsWith('/status')){
            tcpp.probe(ip, port, function(err, available){
                if (available){
                    request({
                        url: url,
                        json: true
                    }, function(error, response, body){
                        if (!error && response.statusCode === 200){
                            console.log(body.info.maxPlayers);
                            serverInformations.channel.send({embed:{
                                color: 3066993,
                                title: 'Server is online',
                                fields: [{
                                    name: 'Online Players:',
                                    value: body.info.players + ' / ' + body.info.maxPlayers
                                },
                                {
                                    name: 'Server Tags',
                                    value: body.info.tags
                                }
                                ],
                                footer: {
                                    text: 'example'
                                }
                            }})
                        }
                    })
                }else{
                    console.log('Server is offline!');
                }
            })
        }
    }
})