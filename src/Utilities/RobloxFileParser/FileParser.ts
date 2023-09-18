import ByteReader from "./ByteReader"
import BinaryParser from "./BinaryParser"

function index(buffer: any, params: any) {
    const reader = new ByteReader(buffer)
    if (reader.String(7) !== "<roblox") {
        throw new Error("Not a valid RBXM file");
    }

    if(reader.Byte() === 0x21) {
        return BinaryParser.parse(buffer, params);
    }

    throw new Error("XML not supported.");
}

export default index;