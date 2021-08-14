import React, { useRef } from "react";
import { useEffect } from "react"
import * as d3 from "d3";
import './LegacyGraph.css';

interface IProps {
    graph: IState;
    onSelect: (id: string) => void;
}

interface D3Node {
    index: number,
    x: number,
    y: number
}

interface IState {
    nodes: any[],
    edges: any[]
}

export default class LegacyGraph extends React.Component<IProps, IState> {
    //state: IState;
    svgReference: React.RefObject<SVGSVGElement>
    onSelect: (id: string) => void

    constructor(props: IProps) {
        super(props);

        //this.state = props.graph;

        this.svgReference = React.createRef();
        this.onSelect = props.onSelect;
    }

    componentDidUpdate(previousProps, previousState) {
        console.log(`LegacyGraph::useEffect`);
        // console.log(previousProps);
        // console.log(previousState);
        // console.log(this.state);
        // console.log(this.props);

        const onSelect = this.onSelect;

        const svg = d3.select("svg");

        svg.html(null);

        svg.append("defs").selectAll("marker")
            .data(["end"])
            .join("marker")
            .attr("id", d => `arrow-${d}`)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 10)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("fill", "#dadada")
            .attr("d", 'M0,-5L10,0L0,5');

        const width = 600;//+svg.attr("width");
        const height = 800;//+svg.attr("height");
        const radius = 30;

        const simulation = d3.forceSimulation(this.props.graph.nodes)
            .force("link", d3.forceLink(this.props.graph.edges).id(function(d) { return d.id; }).distance(120))
            .force("charge", d3.forceManyBody().strength(-100))
            .force("collide", d3.forceCollide().radius(d => d.r * 1.3))
            .force("center", d3.forceCenter(width / 2, height / 2));

        const node = svg.selectAll("g")
            .data(this.props.graph.nodes)

        const nodeContent = node.enter()
            .append("g")
            .attr("class", "nodes")
            .attr("transform", function(d){return "translate("+d.x+","+d.y+")"});

        const nodeServices = nodeContent
            .filter(function(d) { return !d.user; })
            .append("circle")
            .attr("r", function(d) { return d.r; })
            .attr("fill", function(d) { return d.color; });

        let nodeUsers = nodeContent
            .filter(function(d) { return d.user; })
            .append("g")
        
        nodeUsers.append("circle")
            .attr("r", function(d) { return d.r; })
            .attr("fill", "white");

        nodeUsers.append("path")
            .attr("d", "M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z")
            .attr("transform", "scale(2.5) translate(-8,-8)")
            .attr("fill", function(d) { return d.color; });

        nodeUsers.append("path")
            .attr("d", "M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z")
            .attr("fill-rule", "evenodd")
            .attr("transform", "scale(2.5) translate(-8,-8)")
            .attr("fill", function(d) { return d.color; });

        nodeContent//.filter(function(d) { return !d.user; })
            .append("text")
            .attr("y", "30")
            .append("tspan")
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("font-family", "monospace")
            .attr("fill", "black")
            .text(function(d) { return d.id });

        const touchCircle = nodeContent.append("circle")
            .attr("r", function(d) { return d.r; })
            .attr("class", "touch")
            .attr("opacity", "0.0");

        nodeContent.append("title")
            .text(function(d) { return d.id; });

        const link = svg.insert("g", ":first-child")
            .attr("class", "links")
            .selectAll("line")
            .data(this.props.graph.edges)
            .enter().append("line")
            .attr("stroke-width", function(d) { return d.value; })
            .attr("marker-end", d => `url(#arrow-${d.type})`);

        simulation.on("tick", () => {
            const angle = (x1, y1, x2, y2) => Math.atan2(y2-y1, x2-x1);

            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) {
                  const theta = angle(d.source.x, d.source.y, d.target.x, d.target.y);
                  return d.target.x - (Math.cos(theta) * d.target.r);
                })
                .attr("y2", function(d) {
                  const theta = angle(d.source.x, d.source.y, d.target.x, d.target.y);
                  return d.target.y - (Math.sin(theta) * d.target.r);
                })
                
            nodeContent.attr("transform", function(d){return "translate("+d.x+","+d.y+")"});
        });

        function handleDragStart(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();

            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function handleDrag(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function handleDragEnd(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        function handleClick(event, d) {
            console.log(`Node ${d.id} was clicked!`);
            nodeContent.classed("selected", false);
            d3.select(this).classed("selected", true);

            onSelect(d.id);
        }

        nodeContent.call(d3.drag()
            .on("start", handleDragStart)
            .on("drag", handleDrag)
            .on("end", handleDragEnd))
            .on("click", handleClick);
    }

    render() {
        console.log(`render()`);
        // console.log(this.state);
        return <div className="LegacyGraph">
            <svg viewBox="0 0 600 800" 
                preserveAspectRatio="xMidYMid meet"
                ref={this.svgReference}></svg>
        </div>
    }
}