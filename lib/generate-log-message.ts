import { ACTION, AuditLog, ENTITY_TYPE } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
    const { action, entityTitle, entityType } = log;

    let entityTypeFr = "";
    switch (entityType) {
        case ENTITY_TYPE.BOARD:
            entityTypeFr = "le tableau";
            break;
        case ENTITY_TYPE.LIST:
            entityTypeFr = "la liste";
            break;
        case ENTITY_TYPE.CARD:
            entityTypeFr = "la carte";
            break;
        default:
            entityTypeFr = "l'entité";
            break;
    }

    switch (action) {
        case ACTION.CREATE:
            return `a créé ${entityTypeFr} "${entityTitle}"`;
        case ACTION.UPDATE:
            return `a mise à jour ${entityTypeFr} "${entityTitle}"`;
        case ACTION.DELETE:
            return `a supprimé ${entityTypeFr} "${entityTitle}"`;
        default:
            return `uaction inconnu : ${entityTypeFr} "${entityTitle}"`;
    }
}