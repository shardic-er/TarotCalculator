import {Affinity} from "./common/enum";

export const defaultDisplayAffinities: Record<Affinity, boolean> = {
    [Affinity.ANTI]: true,
    [Affinity.NONE]: false,
    [Affinity.SLIGHT]: false,
    [Affinity.MODERATE]: false,
    [Affinity.STRONG]: true
};

export const affinityColors: Record<Affinity, string> = {
    [Affinity.ANTI]: 'red',
    [Affinity.NONE]: 'grey',
    [Affinity.SLIGHT]: 'lightblue',
    [Affinity.MODERATE]: 'blue',
    [Affinity.STRONG]: 'darkblue'
};
