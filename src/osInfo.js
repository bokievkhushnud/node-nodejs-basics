import os from 'os';

export function printEOL() {
    console.log(`Default system EOL: ${JSON.stringify(os.EOL)}`);
}

export function printCPUsInfo() {
    const cpus = os.cpus().map(({model, speed}) => ({ model, speed: `${speed/1000} GHz`}));
    console.table(cpus);
 
}

export function printHomeDir() {
    console.log(`Home Directory: ${os.homedir()}`);
}

export function printUserName() {
    console.log(`System User Name: ${os.userInfo().username}`);
}

export function printArchitecture() {
    console.log(`CPU Architecture: ${os.arch()}`);
}
