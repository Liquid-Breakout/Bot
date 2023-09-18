let m_w: number = 123456789;
let m_z: number = 987654321;
const mask: number = 0xffffffff;

function getRandom(): number {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    let result = (((m_z << 16) + m_w) & mask) / 4294967296;
    return result + 0.5;
}

function getRandomLocations(n: number): [{x: number, y: number}] {
    const locs: [{x: number, y: number}] = [{x: 0, y: 0}];
    for (let i = 0; i < n; i++) {
        locs.push({
            x: getRandom() * 100,
            y: getRandom() * 100
        })
    }
    return locs;
}

function operationsBenchmark(timeLimit: number) {
    const locs = getRandomLocations(10);
    const start = new Date().getTime();
    let ops = 0;
    let curTime = new Date().getTime();
    while (curTime < start + timeLimit) {
        const dists: number[] = [];
        locs.forEach(a => locs.forEach(b => {
            const d = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
            dists.push(d);
        }));
        ops++;
        curTime = new Date().getTime();
    }
    return ops;
}

function recursiveFibonacci(i: number): number {
    if (i <= 1) return i;
    return recursiveFibonacci(i - 1) + recursiveFibonacci(i - 2);
}

function recursiveBenchmark(i: number): number {
    const start = new Date().getTime();
    recursiveFibonacci(i);
    const end = new Date().getTime();
    return end - start;
}

export {operationsBenchmark, recursiveBenchmark}