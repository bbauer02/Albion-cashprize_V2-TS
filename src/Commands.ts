import {Command} from "./Command";
import {Hello} from "./commands/Hello";
import {Create} from "./commands/Create";
import {Config} from "./commands/Config";
import {Show} from "./commands/Show";
import {Paid} from "./commands/Paid";

export const Commands: Command[] = [
    Hello,
    Create,
    Config,
    Show,
    Paid
];

