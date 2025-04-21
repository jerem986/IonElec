import { CommandInterface } from './command.interface';

export class CommandBase implements CommandInterface {
    public type?: string;

    public constructor() {
        this.type = (this.constructor as any).name;
    }
}
