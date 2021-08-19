import { IArchdocSchema, ComponentTypes } from "../../services/archdoc/ArchdocSchema";

export function generateGraphFromArchdoc(archdocSchema: IArchdocSchema): any {
    const componentNames = Object.keys(archdocSchema.components);

    const components = componentNames.map((name) => {
        const component = archdocSchema.components[name];
        const type = (component.type === ComponentTypes.USER) ? ComponentTypes.USER : ComponentTypes.SERVICE;

        return {
            name,
            type,
            uses: (component.uses !== undefined) ? component.uses : []
        }
    });

    const nodes = components.map(x => ({
        id: x.name,
        color: "lightblue",
        r: 20,
        user: (x.type === ComponentTypes.USER),
        selected: false
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
