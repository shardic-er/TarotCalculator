import TheFoolIcon from '../icons/THE_FOOL.svg';
import TheMagicianIcon from '../icons/THE_MAGICIAN.svg';
import TheHighPriestessIcon from '../icons/THE_HIGH_PRIESTESS.svg';
import TheEmpressIcon from '../icons/THE_EMPRESS.svg';
import TheEmperorIcon from '../icons/THE_EMPEROR.svg';
import TheHierophantIcon from '../icons/THE_HIEROPHANT.svg';
import TheLoversIcon from '../icons/THE_LOVERS.svg';
import TheChariotIcon from '../icons/THE_CHARIOT.svg';
import StrengthIcon from '../icons/STRENGTH.svg';
import TheHermitIcon from '../icons/THE_HERMIT.svg';
import WheelOfFortuneIcon from '../icons/WHEEL_OF_FORTUNE.svg';
import JusticeIcon from '../icons/JUSTICE.svg';
import TheHangedManIcon from '../icons/THE_HANGED_MAN.svg';
import DeathIcon from '../icons/DEATH.svg';
import TemperanceIcon from '../icons/TEMPERANCE.svg';
import TheDevilIcon from '../icons/THE_DEVIL.svg';
import TheTowerIcon from '../icons/THE_TOWER.svg';
import TheStarIcon from '../icons/THE_STAR.svg';
import TheMoonIcon from '../icons/THE_MOON.svg';
import TheSunIcon from '../icons/THE_SUN.svg';
import JudgmentIcon from '../icons/JUDGEMENT.svg';
import TheWorldIcon from '../icons/THE_WORLD.svg';


export enum ArcanaCategory {
    THE_FOOL = 0,
    THE_MAGICIAN = 1,
    THE_HIGH_PRIESTESS = 2,
    THE_EMPRESS = 3,
    THE_EMPEROR = 4,
    THE_HIEROPHANT = 5,
    THE_LOVERS = 6,
    THE_CHARIOT = 7,
    STRENGTH = 8,
    THE_HERMIT = 9,
    WHEEL_OF_FORTUNE = 10,
    JUSTICE = 11,
    THE_HANGED_MAN = 12,
    DEATH = 13,
    TEMPERANCE = 14,
    THE_DEVIL = 15,
    THE_TOWER = 16,
    THE_STAR = 17,
    THE_MOON = 18,
    THE_SUN = 19,
    JUDGMENT = 20,
    THE_WORLD = 21
}

export enum Affinity {
    ANTI = -5,
    NONE = 0,
    SLIGHT = 1,
    MODERATE = 3,
    STRONG = 7
}

export const arcanaIcons: Record<ArcanaCategory, string> = {
    [ArcanaCategory.THE_FOOL]: TheFoolIcon,
    [ArcanaCategory.THE_MAGICIAN]: TheMagicianIcon,
    [ArcanaCategory.THE_HIGH_PRIESTESS]: TheHighPriestessIcon,
    [ArcanaCategory.THE_EMPRESS]: TheEmpressIcon,
    [ArcanaCategory.THE_EMPEROR]: TheEmperorIcon,
    [ArcanaCategory.THE_HIEROPHANT]: TheHierophantIcon,
    [ArcanaCategory.THE_LOVERS]: TheLoversIcon,
    [ArcanaCategory.THE_CHARIOT]: TheChariotIcon,
    [ArcanaCategory.STRENGTH]: StrengthIcon,
    [ArcanaCategory.THE_HERMIT]: TheHermitIcon,
    [ArcanaCategory.WHEEL_OF_FORTUNE]: WheelOfFortuneIcon,
    [ArcanaCategory.JUSTICE]: JusticeIcon,
    [ArcanaCategory.THE_HANGED_MAN]: TheHangedManIcon,
    [ArcanaCategory.DEATH]: DeathIcon,
    [ArcanaCategory.TEMPERANCE]: TemperanceIcon,
    [ArcanaCategory.THE_DEVIL]: TheDevilIcon,
    [ArcanaCategory.THE_TOWER]: TheTowerIcon,
    [ArcanaCategory.THE_STAR]: TheStarIcon,
    [ArcanaCategory.THE_MOON]: TheMoonIcon,
    [ArcanaCategory.THE_SUN]: TheSunIcon,
    [ArcanaCategory.JUDGMENT]: JudgmentIcon,
    [ArcanaCategory.THE_WORLD]: TheWorldIcon
};