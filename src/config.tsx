import {Affinity} from "./common/enum";

export const defaultDisplayAffinities: Record<Affinity, boolean> = {
    [Affinity.ANTI]: false,
    [Affinity.NONE]: false,
    [Affinity.SLIGHT]: false,
    [Affinity.MODERATE]: false,
    [Affinity.STRONG]: true
};

export const affinityColors: Record<Affinity, string> = {
    [Affinity.ANTI]: 'red',
    [Affinity.NONE]: 'grey',
    [Affinity.SLIGHT]: 'lightgreen',
    [Affinity.MODERATE]: 'green',
    [Affinity.STRONG]: 'darkgreen'
};

export const defaultShowImpactPointsOnTooltip: boolean = false
export const defaultHideImpressionIconsUntilSelected = true
export const defaultConfigsLocked = true
