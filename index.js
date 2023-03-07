const express = require('express');
const { Client, Location, List, Buttons, LocalAuth } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');
const qrcode = require('qrcode-terminal')
const app = express ();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;
const fs = require('fs');
const SESION_FILE_PATH = './session.json';
let sesioncCfg;
if(fs.existsSync(SESION_FILE_PATH)){
	sesioncCfg = require(SESION_FILE_PATH);
};

const client = new Client({ 
	authStrategy: new LocalAuth()
	});

client.initialize();
client.on('qr', (qr) => {
	qrcode.generate(qr, {small: true});
});

client.on('auth_failure', msg =>{
	console.error('AUTHENTICATION FAILURE', msg)
});
client.on('ready', ()=>{
	console.log('ready');
});

app.get('/', (req,res) =>{
	res.send("HELLO WOLD!")
});
app.get('/api', async (req,res) =>{
	let key = 'SIPALINGNT';
	let keyC = req.query.key;
	let nomer = req.query.nomer;
	let pesan = req.query.pesan;
	// 6281359536415@c.us
	nomer = nomer.substring(1);
	nomer = `62${nomer}@c.us`;
	let cekuser = await client.isRegisteredUser(nomer);
	if(key == keyC){
		if(cekuser == true){
			client.sendMessage(nomer, pesan)
			res.json({ status : true, pesan: pesan, msg: 'pesan sukses terkirim'});
		}else{
			res.json({ status : false, pesan: pesan, msg: 'pesan gagal terkirim'});
		}
	}else{
		res.json({ status : false, pesan: pesan, msg: 'Key Api Salah, Silahkan Menggunakan Key Lain'});
	}
});

app.post('/postapi', async(req,res)=>{
	let key = 'SIPALINGNT';
	let nomer = req.body.nomer;
	let pesan = req.body.pesan;
	let keyC = req.body.key;
	// 6281359536415@c.us
	nomer = nomer.substring(1);
	nomer = `62${nomer}@c.us`;
	let cekuser = await client.isRegisteredUser(nomer);
	if(key == keyC){
		if(cekuser == true){
			client.sendMessage(nomer, pesan)
			res.json({ status : true, pesan: pesan, msg: 'pesan sukses terkirim'});
		}else{
			res.json({ status : false, pesan: pesan, msg: 'pesan gagal terkirim'});
		}
	}else{
		res.json({ status : false, pesan: pesan, msg: 'Key Api Salah, Silahkan Menggunakan Key Lain'});
	}
})

app.listen(port, () => {
	console.log(`Example applistening on port ${port}`)
});