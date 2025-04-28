import React, { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network.min.js';

const GraphViewer = ({ data }) => {
  const networkRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      // تحويل البيانات إلى الشكل المناسب لعرضه في Vis.js
      const nodes = new DataSet(
        data.map((item, index) => ({
          id: index,
          label: item.label,
          title: item.id, // استخدام الـ QID كمعلومة إضافية
        }))
      );

      const edges = new DataSet(
        data.slice(1).map((item, index) => ({
          from: 0,
          to: index + 1,
          arrows: 'to',
        }))
      );

      const graphData = { nodes, edges };

      const options = {
        nodes: {
          shape: 'dot',
          size: 15,
          font: {
            size: 14,
          },
        },
        edges: {
          width: 2,
        },
        physics: {
          enabled: true,
        },
      };

      // Create the Network instance without saving it to state
      new Network(networkRef.current, graphData, options);
    }
  }, [data]);

  return (
    <div
      ref={networkRef}
      style={{
        height: '350px',
        border: '2px solid #ccc', // Add border to the graph container
        borderRadius: '10px', // Optional: adds rounded corners
        padding: '10px', // Optional: adds space inside the border
        backgroundColor: '#f9f9f9', // Optional: adds a background color
      }}
    />
  );
};

export default GraphViewer;
