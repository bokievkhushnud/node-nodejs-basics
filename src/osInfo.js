import os from 'os';

export function printEOL() {
    console.log(`Default system EOL: ${JSON.stringify(os.EOL)}`);
}

export function printCPUsInfo() {
    const cpus = os.cpus();
    console.log(`Total CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: ${cpu.model}, Speed: ${cpu.speed / 1000} GHz`);
    });
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
