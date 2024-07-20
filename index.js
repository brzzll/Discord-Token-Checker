const fetch = require(`node-fetch`);
const chalk = require(`chalk`);
const fs = require('node:fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { opendir } = require('node:fs/promises');
const rl = readline.createInterface({ input, output });
if(!fs.existsSync('tokens_usuarios_activos.txt')){
    fs.writeFileSync('tokens_usuarios_activos.txt','');
};
if(!fs.existsSync('tokens_bots_activos.txt')){
    fs.writeFileSync('tokens_bots_activos.txt','');
};
if(!fs.existsSync(`verificar_tokens.txt`)){
    fs.writeFileSync('verificar_tokens.txt','');
};
if(!fs.existsSync('./tokens')){
    fs.mkdirSync('./tokens');
};
async function token_checker(token) {
    const res = await fetch(`https://discord.com/api/v9/users/@me`, {
        method:'get',
        headers:{
            "Authorization":`${token}`
        }
    });
    const resStatus = res.status;
    const resJson = await res.json();
    if(resStatus === 200){
        let nitro = "";
        if(resStatus['premium_type'] === 0){
            nitro = "No";
        } else if(resStatus['premium_type'] === 1){
            nitro = "Nitro Classic";
        } else if(resStatus['premium_type'] === 2){
            nitro = "Nitro";
        } else if(resStatus['premium_type'] === 3){
            nitro = "Nitro Basic";
        };
        fs.writeFileSync(`./tokens/${resJson['username']}.txt`, token);
        console.log(`${chalk.green(`[$] Token ${chalk.white(token)} válido. [ USUARIO ]\n[$] Nombre global: ${chalk.white(resJson['global_name'])}\n[$] Usuario: ${chalk.white(resJson['username'])}\n[$] Discriminador: ${chalk.white(resJson['discriminator'])}\n[$] ID: ${chalk.white(resJson['id'])}\n[$] Descripción: ${chalk.white(resJson['bio'])}\n[$] Nitro: ${chalk.white(nitro)}\n[$] Email: ${chalk.white(resJson['email'])}\n[$] Número telefónico: ${chalk.white(resJson['phone'])}\n[$] MFA: ${chalk.white(resJson['mfa_enabled'])}\n[$] Lenguaje: ${chalk.white(resJson['locale'])}\n[$] Avatar: ${chalk.white(`https://cdn.discordapp.com/avatars/${resJson['id']}/${resJson['avatar']}.webp`)}`)}`);
        rl.question(``, ()=>{
            main();
        });
    } else {
        token_checkerBot(token);
    }
};
async function token_checkerBot(token) {
    const res = await fetch(`https://discord.com/api/v9/users/@me`, {
        method:'get',
        headers:{
            "Authorization":`Bot ${token}`
        }
    });
    const resStatus = res.status;
    const resJson = await res.json();
    if(resStatus === 200){
        fs.writeFileSync(`./tokens/${resJson['username']}.txt`, token);
        console.log(`${chalk.green(`[$] Token ${chalk.white(token)} válido. [ BOT ]\n[$] Usuario: ${chalk.white(resJson['username'])}`)}`);
        rl.question(``, ()=>{
            main();
        });
    } else {
        rl.question(`${chalk.red(`[x] Token ${chalk.white(token)} inválido.`)}`, ()=>{
            main();
        });
    }
};
async function tokens_checker(filetxtname) {
    const tokens_d = fs.readFileSync(`./${filetxtname}`, 'utf-8');
    const linnnessss = tokens_d.toString().split('\n');
    linnnessss.forEach(async (line) => {
        await token_checker2(line.trim())
    });
    async function token_checker2(token) {
        const res = await fetch(`https://discord.com/api/v9/users/@me`, {method:'get',headers:{"Authorization":`${token}`}});const resStatus = res.status;const resJson = await res.json();
        if(resStatus === 200){
            console.log(`${chalk.green(`[$] Token ${chalk.white(token)} válido. [ USUARIO ] [ Nombre: ${chalk.white(resJson['username'])} ]`)}`);
            const archivo = fs.readFileSync(`tokens_usuarios_activos.txt`,'utf-8');
            fs.writeFileSync('tokens_usuarios_activos.txt', archivo+`\n`+token);
        } else {
            await token_checkerBot2(token);
        };
    };
    async function token_checkerBot2(token) {
        const res = await fetch(`https://discord.com/api/v9/users/@me`, {method:'get',headers:{"Authorization":`Bot ${token}`}});const resStatus = res.status;const resJson = await res.json();
        if(resStatus === 200){
            console.log(`${chalk.green(`[$] Token ${chalk.white(token)} válido. [ BOT ] [ Nombre: ${chalk.white(resJson['username'])} ]`)}`);
            const archivo = fs.readFileSync(`tokens_bots_activos.txt`,'utf-8');
            fs.writeFileSync('tokens_bots_activos.txt', archivo+`\n`+token);
        } else {
            console.log(`${chalk.red(`[x] Token ${chalk.white(token)} inválido.`)}`);
        };
    };
};
function banner() {
    console.log(`${chalk.magentaBright(`

    ▄▄▄█████▓ ▒█████   ██ ▄█▀▓█████  ███▄    █     ▄████▄   ██░ ██ ▓█████  ▄████▄   ██ ▄█▀▓█████  ██▀███  
    ▓  ██▒ ▓▒▒██▒  ██▒ ██▄█▒ ▓█   ▀  ██ ▀█   █    ▒██▀ ▀█  ▓██░ ██▒▓█   ▀ ▒██▀ ▀█   ██▄█▒ ▓█   ▀ ▓██ ▒ ██▒
    ▒ ▓██░ ▒░▒██░  ██▒▓███▄░ ▒███   ▓██  ▀█ ██▒   ▒▓█    ▄ ▒██▀▀██░▒███   ▒▓█    ▄ ▓███▄░ ▒███   ▓██ ░▄█ ▒
    ░ ▓██▓ ░ ▒██   ██░▓██ █▄ ▒▓█  ▄ ▓██▒  ▐▌██▒   ▒▓▓▄ ▄██▒░▓█ ░██ ▒▓█  ▄ ▒▓▓▄ ▄██▒▓██ █▄ ▒▓█  ▄ ▒██▀▀█▄  
      ▒██▒ ░ ░ ████▓▒░▒██▒ █▄░▒████▒▒██░   ▓██░   ▒ ▓███▀ ░░▓█▒░██▓░▒████▒▒ ▓███▀ ░▒██▒ █▄░▒████▒░██▓ ▒██▒
      ▒ ░░   ░ ▒░▒░▒░ ▒ ▒▒ ▓▒░░ ▒░ ░░ ▒░   ▒ ▒    ░ ░▒ ▒  ░ ▒ ░░▒░▒░░ ▒░ ░░ ░▒ ▒  ░▒ ▒▒ ▓▒░░ ▒░ ░░ ▒▓ ░▒▓░
        ░      ░ ▒ ▒░ ░ ░▒ ▒░ ░ ░  ░░ ░░   ░ ▒░     ░  ▒    ▒ ░▒░ ░ ░ ░  ░  ░  ▒   ░ ░▒ ▒░ ░ ░  ░  ░▒ ░ ▒░
      ░      ░ ░ ░ ▒  ░ ░░ ░    ░      ░   ░ ░    ░         ░  ░░ ░   ░   ░        ░ ░░ ░    ░     ░░   ░ 
                 ░ ░  ░  ░      ░  ░         ░    ░ ░       ░  ░  ░   ░  ░░ ░      ░  ░      ░  ░   ░     
    ░                       ░     
    ~ by ZenX | ${chalk.white(`gg./kEB3PCPkzc`)}

    [1] ${chalk.white(`Verificar un token`)}
    [2] ${chalk.white(`Verificar varios tokens`)}
    `)}`);
};
function main() {
    console.clear();
    banner();
    rl.question(`${chalk.magentaBright(`> Selecciona una opción: `)}`, async (opt)=>{
        if(opt === "1"){
            rl.question(`${chalk.magentaBright(`> Token: `)}`, (tokenn)=>{
                token_checker(tokenn);
            });
        } else if(opt === "2"){
            async function op2() {
                let penes = [];
                const dir = await opendir('./');
                for await (const pene of dir){
                    if(pene.isFile() && pene.name !== "start.bat" && pene.name !== "setup.bat" && pene.name !== "tokens_usuarios_activos.txt" && pene.name !== "tokens_bots_activos.txt" && pene.name !== "package.json"){
                        penes.push(pene.name);
                        console.log(`${chalk.magenta(`~`)} ${chalk.white(pene.name)}`);
                    };
                };
                rl.question(`${chalk.magentaBright(`> En qué archivo están los tokens a verificar?: `)}`,(filetxtname)=>{
                    if(!penes.includes(filetxtname)){
                        rl.question(`${chalk.red(`[x] No has seleccionado un archivo válido.`)}`, ()=>{
                            op2();
                        });
                        return;
                    };
                    tokens_checker(filetxtname);
                });
            };
            op2();
        } else {
            rl.question(`${chalk.red(`[x] No has seleccionado ninguna opción.`)}`, ()=>{
                main();
            });
        }
    });
};
main();