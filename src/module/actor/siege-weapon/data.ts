import { SaveData } from "@actor/creature/data";
import {
    ActorSystemData,
    ActorSystemSource,
    BaseActorAttributes,
    BaseActorDataPF2e,
    BaseActorSourcePF2e,
    BaseHitPointsData,
    BaseTraitsData,
    GangUpCircumstance,
} from "@actor/data/base";
import { SaveType } from "@actor/types";
import { ActorSizePF2e } from "@actor/data/size";
import { SiegeWeaponPF2e } from ".";
import { SiegeWeaponPropulsionMethod, SiegeWeaponTrait } from "./types";

/** The stored source data of a siege weapon actor */
type SiegeWeaponSource = BaseActorSourcePF2e<"siegeWeapon", SiegeWeaponSystemData>;

interface SiegeWeaponData
    extends Omit<SiegeWeaponSource, "data" | "system" | "effects" | "flags" | "items" | "prototypeToken" | "type">,
        BaseActorDataPF2e<SiegeWeaponPF2e, "siegeWeapon", SiegeWeaponSystemData, SiegeWeaponSource> {}

/** The system-level data of siege weapon actors. */
interface SiegeWeaponSystemSource extends ActorSystemSource {
    attributes: SiegeWeaponAttributesSource;
    details: SiegeWeaponDetailsSource;
    saves: SiegeWeaponSavesSource;
    traits: SiegeWeaponTraitsSource;
}

interface SiegeWeaponSystemData extends SiegeWeaponSystemSource, Omit<ActorSystemData, "traits"> {
    attributes: SiegeWeaponAttributesData;
    details: SiegeWeaponDetailsData;
}

interface SiegeWeaponHitPointsData extends Required<BaseHitPointsData> {
    brokenThreshold: number;
    negativeHealing: false;
}

interface SiegeWeaponAttributesSource extends BaseActorAttributes {
    ac: {
        value: number;
        check: number;
        details: string;
    };
    hardness: number;
    hp: SiegeWeaponHitPointsData;
}

interface SiegeWeaponAttributesData extends SiegeWeaponAttributesSource {
    flanking: {
        canFlank: false;
        canGangUp: GangUpCircumstance[];
        flankable: false;
        flatFootable: false;
    };
}

interface SiegeWeaponDetailsSource {
    description: string;
    level: {
        value: number;
    };
    alliance: null;
    price: number;
    usage: string;
    bulk: number;
    space: {
        long: number;
        wide: number;
        high: number;
    };
    crew: {
        min: number;
        max: number;
    };
    proficiency: string;
    speed: number;
    propulsion: SiegeWeaponPropulsionMethod;
}

type SiegeWeaponDetailsData = SiegeWeaponDetailsSource;

type SiegeWeaponSavesSource = Record<SaveType, SaveData>;

interface SiegeWeaponTraitsSource extends BaseTraitsData<SiegeWeaponTrait> {
    size: ActorSizePF2e;
}

interface TokenDimensions {
    width: number;
    height: number;
}

export { SiegeWeaponData, SiegeWeaponSource, SiegeWeaponTrait, TokenDimensions };
