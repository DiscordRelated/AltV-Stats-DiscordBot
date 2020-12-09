// AltV Server Daten
var ip = '1.1.1.1';
var port = '80';

// request
var request = require('request');
var url = 'https://api.altv.mp/server/+serverID';

// uptime checks
var tcpp = require('tcp-ping');

// Discord.js
const Discord = require('discord.js');
const { info } = require('console');
const client = new Discord.Client();

// client login
client.login('YOUR BOT TOKEN');

// if client is ready print to console
client.on('ready', ()=>{
    console.log('Bot ist online!');
});

client.on('message', info =>{
    if (info.channel.id === '703237646947713075'){
        if (info.content.startsWith('/info')){
            tcpp.probe(ip, port, function(err, available){
                if (available){
                    request({
                        url: url,
                        json: true
                    }, function(error, response, body){
                        if (!error && response.statusCode === 200){
                            console.log(body.info.maxPlayers);
                                info.channel.send({embed:{
                                    color: 3066993,
                                    title: 'Server Informations',
                                    fields: [{
                                        name: 'Server Name',
                                        value: body.info.name
                                    },
                                    {
                                        name: 'Players online',
                                        value: body.info.players + ' / ' + body.info.maxPlayers
                                    },
                                    {
                                        name: 'Server locked?',
                                        value: body.info.locked
                                    },
                                    {
                                        name: 'Host:',
                                        value: body.info.host
                                    },
                                    {
                                        name: 'Port:',
                                        value: body.info.port
                                    },
                                    {
                                        name: 'GameMode',
                                        value: body.info.gameMode
                                    },
                                    {
                                        name: 'Website:',
                                        value: body.info.website
                                    },
                                    {
                                        name: 'Language',
                                        value: body.info.language
                                    },
                                    {
                                        name: 'Server verified?',
                                        value: body.info.verified
                                    },
                                    {
                                        name: 'Server promoted?',
                                        value: body.info.promoted
                                    },
                                    {
                                        name: 'UseEarlyAuth?',
                                        value: body.info.useEarlyAuth
                                    },
                                    {
                                        name: 'useCdn?',
                                        value: body.info.useCdn
                                    },
                                    {
                                        name: 'UseVoiceChat?',
                                        value: body.info.useVoiceChat
                                    },
                                    {
                                        name: 'Server Tags:',
                                        value: body.info.tags
                                    },
                                    {
                                        name: 'Server build:',
                                        value: body.info.build
                                    },
                                    {
                                        name: 'Last update:',
                                        value: body.info.lastUpdates
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