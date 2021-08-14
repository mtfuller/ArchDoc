import { ArchdocModel, ComponentTypes } from "../../services/archdoc/Archdoc.model";

export function generateGraphFromArchdoc(archdocModel: ArchdocModel): any {
    console.log("generateGraphFromArchdoc");
    console.log(archdocModel);

    const componentNames = Object.keys(archdocModel.components);

    const nodes = archdocModel.components.map(x => ({
        id: x.name,
        color: "lightblue",
        r: 20,
        user: (x.type === ComponentTypes.USER),
        selected: false
    }));
    console.log(nodes);

    const edges = archdocModel.components.flatMap(sourceService => {
        return sourceService.uses.map(targetServiceName => ({
            source: sourceService.name,
            target: targetServiceName,
            value: 2,
            type: "end"
        }));
    });

    console.log(edges);

    return {
        nodes,
        edges
    }
}