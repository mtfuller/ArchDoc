import { ComponentTypes } from "../../services/archdoc/schema/ComponentTypes";
import { IArchdocSchema } from "../../services/archdoc/schema/IArchdocSchema";

const getColorFromComponentType = (type: ComponentTypes): string => {
    switch (type) {
        case ComponentTypes.USER:
            return "#05C7F2"
        case ComponentTypes.SERVICE:
            return "#056CF2"
    }
}

export function generateGraphFromArchdoc(archdocSchema: IArchdocSchema): any {
    const componentNames = Object.keys(archdocSchema.components);

    const components = componentNames.map((name) => {
        const component = archdocSchema.components[name];
        const type = (component.type === ComponentTypes.USER) ? ComponentTypes.USER : ComponentTypes.SERVICE;

        return {
            name,
            type,
            description: component.description,
            uses: (component.uses !== undefined) ? component.uses : []
        }
    });

    const nodes = components.map(x => ({
        id: x.name,
        color: getColorFromComponentType(x.type),
        r: 20,
        user: (x.type === ComponentTypes.USER),
        selected: false,
        description: x.description
    }));
    console.log(nodes);

    const edges = components.flatMap(sourceService => {
        return sourceService.uses.map(targetServiceName => ({
            source: sourceService.name,
            target: targetServiceName,
            value: 2,
            type: "end"
        }));
    });

    return {
        nodes,
        edges
    }
}
